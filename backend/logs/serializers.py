from rest_framework import serializers
from .models import Item, Log
from user_profile.serializers import UserSerializer
from user_profile.models import UserProfile
from django.contrib.auth.models import User


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('log_id', 'name', 'amount')
        extra_kwargs = {'log_id': {'write_only': True}}


class UserInvolvedProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('profile_pic',)


class UserInvolvedSerializer(serializers.ModelSerializer):
    user_profile = UserInvolvedProfileSerializer()

    class Meta:
        model = User
        fields = ('username', 'user_profile')


class LogSerialzier(serializers.ModelSerializer):
    items = ItemSerializer(many=True, read_only=True)
    users_involved = UserInvolvedSerializer(many=True, read_only=True)
    users_involved_data = serializers.CharField(write_only=True)
    created_by = UserSerializer(many=False, read_only=True)
    number_of_users = serializers.IntegerField(write_only=True)

    class Meta:
        model = Log
        fields = ('id', 'users_involved', 'created_by', 'total',
                  'settled', 'date_created', 'items', 'number_of_users', 'users_involved_data')
        extra_kwargs = {
            'id': {'read_only': True},
            'settled': {'read_only': True},
            'date_created': {'read_only': True}
        }

    def create(self, validated_data):
        users_invloved_data = validated_data.pop('users_involved_data')
        users_invloved_data = users_invloved_data.split(",")

        number_of_users = validated_data.pop('number_of_users')

        creator = self.context['request'].user

        user_list = []

        for username in users_invloved_data:
            temp_user = User.objects.get(username=username)
            if (not temp_user.user_profile.verified):
                raise Exception("One or more users are not verified")
            user_list.append(temp_user)

        if (number_of_users != len(user_list)):
            raise Exception("Number of users and number of username not equal")
        log = Log.objects.create(**validated_data, created_by=creator)

        for user in user_list:
            log.users_involved.add(user)

        return log

    def update(self, instance, validated_data):
        if ('users_involved_data' in validated_data):
            users_invloved_data = validated_data.pop('users_involved_data')
            users_invloved_data = users_invloved_data.split(",")

            if 'number_of_users' in validated_data:
                number_of_users = validated_data.pop('number_of_users')
            else:
                raise Exception("Number of users not provided")

            user_list = []

            for username in users_invloved_data:
                temp_user = User.objects.get(username=username)
                if (not temp_user.user_profile.verified):
                    raise Exception("One or more users are not verified")
                user_list.append(temp_user)

            if (number_of_users != len(user_list)):
                raise Exception(
                    "Number of users and number of username not equal")

            instance.users_involved.clear()

            for user in user_list:
                instance.users_involved.add(user)

        return instance
