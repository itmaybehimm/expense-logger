from django.shortcuts import render
from django.db import IntegrityError
from django.contrib.auth.models import User
from .models import UserProfile
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .serializers import UserSerializer, UserProfileSerializer
from .customfunctions import password_valid
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
        }

        userprofiledata = {
            'dob': data.get('dob')
        }

        if (not password_valid(userdata['password'])):
            return Response({'mesage': 'password must contain one lower case, one upper case, one digit and one special character'}, status=status.HTTP_400_BAD_REQUEST)

        user_serializer = UserSerializer(data=userdata)

        if (user_serializer.is_valid()):
            saved_user = user_serializer.save()
            saved_user_profile = UserProfile.objects.get(pk=saved_user.id)
            try:
                date_obj = datetime.datetime.strptime(
                    userprofiledata['dob'], '%m-%d-%Y').date()
                saved_user_profile.dob = date_obj
                saved_user_profile.save()
                return Response(UserSerializer(saved_user).data, status=status.HTTP_200_OK)

            except Exception as e:
                User.objects.filter(id=saved_user.id).delete()
                return Response({'mesage': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
