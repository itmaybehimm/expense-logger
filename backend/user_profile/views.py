from django.shortcuts import render
from django.db import IntegrityError
from django.contrib.auth.models import User
from .models import UserProfile
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .serializers import UserSerializer, UserProfileSerializer
from .customfunctions import password_valid, passwordSHA256, strtodate
import json

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

        # Hashing using sha 256
        # userdata['password'] = passwordSHA256(userdata['password'])

        # convert date string to date obj
        try:
            userdata['user_profile']['dob'] = strtodate(
                userdata['user_profile']['dob'])
        except Exception as e:
            return Response({'message': 'Date format incorrect'}, status=status.HTTP_400_BAD_REQUEST)

        user_serializer = UserSerializer(data=userdata)

        if (user_serializer.is_valid()):
            saved_user = user_serializer.save()
            return Response(UserSerializer(User.objects.get(pk=saved_user.id)).data, status=status.HTTP_200_OK)

        else:
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
