from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile
from django.contrib.auth.hashers import make_password


class UserProfileSerializer(serializers.ModelSerializer):
    # So that we dont need to input user data during form submission of new user
    # user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = UserProfile
        fields = ('verified', 'dob')
        extra_kwargs = {'verified': {'read_only': True}}


class UserSerializer(serializers.ModelSerializer):
    user_profile = UserProfileSerializer(many=False)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'user_profile', 'password')
        # So that we dont send password during user request
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user_profile_data = validated_data.pop('user_profile')
        # password is in plain text, need to change it to django encrpytion
        password = validated_data.pop('password')
        user = User.objects.create(
            **validated_data, password=make_password(password))
        UserProfile.objects.create(**user_profile_data, user=user)
        return user

    def update(self, instance, validated_data):
        user_profile_data = validated_data.pop('user_profile', {})
        if 'password' in validated_data:
            validated_data['password'] = make_password(
                validated_data['password'])

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()

        # Update user profile
        user_profile = instance.user_profile

        for attr, value in user_profile_data.items():
            setattr(user_profile, attr, value)
        user_profile.save()

        return instance
