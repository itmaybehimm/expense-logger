from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .serializers import UserSerializer
from .customfunctions import password_valid, strtodate, generateOTP, customSHA256
import json
from django.conf import settings
from django.core.mail import send_mail
import datetime

# Create your views here.


@api_view(['POST'])
def signup_view(request):
    if (request.method == 'POST'):
        data = request.POST

        userdata = {
            'username': data.get('username'),
            'password': data.get('password'),
            'email': data.get('email'),
            'user_profile': json.loads(data.get('user_profile'))
        }

        if (not password_valid(userdata['password'])):
            return Response({'message': 'password must contain one lower case, one upper case, one digit and one special character'}, status=status.HTTP_400_BAD_REQUEST)

        # convert date string to date obj
        try:
            userdata['user_profile']['dob'] = strtodate(
                userdata['user_profile']['dob'])
        except Exception as e:
            return Response({'message': 'Date format incorrect'}, status=status.HTTP_400_BAD_REQUEST)

        user_serializer = UserSerializer(data=userdata)

        if (user_serializer.is_valid()):
            saved_user = user_serializer.save()
            return Response(UserSerializer(saved_user).data, status=status.HTTP_201_CREATED)

        else:
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OtpViewClass(APIView):
    # Need to modify perfmission classes to authenticated but not verified
    permission_classes = [IsAuthenticated]

    def get(self, request):
        now = datetime.datetime.now(datetime.timezone.utc)
        user = User.objects.get(pk=request.user.id)
        user_profile = user.user_profile
        otp_created_on = user_profile.otp_created_on
        allow_otp = True
        timedelta = 0
        # to check if created on is null or not
        if (not otp_created_on):
            allow_otp = True
        else:
            # convert into minutes
            timedelta = (now-otp_created_on).seconds/60

        # send otp if time is more than 10 minutes
        try:
            if (timedelta > 10 or allow_otp):
                user_profile.otp_created_on = now
                otp = generateOTP()
                user_profile.otp = customSHA256(otp)
                subject = "OTP Verification Code"
                message = "Please verify your account using the code {}.\nThis OTP is only valid for 10 minutes.\nDo not share this with anyone.".format(
                    otp)
                sender = settings.EMAIL_HOST_USER
                reciever = [user.email]
                print(otp)
                send_mail(
                    subject=subject,
                    message=message,
                    from_email=sender,
                    recipient_list=reciever,
                    fail_silently=False,
                )
                user_profile.save()
                return Response({'message': 'OTP sent to email'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message': 'otp has already been sent to email'}, status=status.HTTP_200_OK)

    def post(self, request):
        user = request.user
        user_profile = user.user_profile
        data = request.data

        now = datetime.datetime.now(datetime.timezone.utc)
        timedelta = 0

        if (user_profile.otp_created_on):
            otp = data.get('otp')
            timedelta = (now-user_profile.otp_created_on).seconds/60

            # check if otp is provided or not
            if (not otp):
                return Response({'message': f'otp not provided'}, status=status.HTTP_400_BAD_REQUEST)

            if (len(otp) != 6):
                return Response({'message': f'otp not valid'}, status=status.HTTP_400_BAD_REQUEST)

            otp_sha = customSHA256(otp)
            saved_otp = user_profile.otp

            if (timedelta > 10):
                return Response({'message': f'otp timeout'}, status=status.HTTP_400_BAD_REQUEST)

            if (otp_sha == saved_otp):
                user_profile.verified = True
                user_profile.save()
                return Response({'message': f'Account verified'}, status=status.HTTP_201_CREATED)

            return Response({'message': f'otp incorrect'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'message': f'otp not requested'}, status=status.HTTP_400_BAD_REQUEST)
