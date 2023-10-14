from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    user_profile = UserProfileSerializer(many=False, read_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'user_profile')
