from django.db.models import Q
from django.contrib.auth import get_user_model

from rest_framework.serializers import (
    CharField,
    EmailField,
    ModelSerializer,
    ValidationError,
    SerializerMethodField,
)

from .models import Account

User = get_user_model()


class UserCreateSerializer(ModelSerializer):
    email = EmailField(label="Email")
    email2 = EmailField(label="Confirm Email")

    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'email2',
            'password',
        ]
        extra_kwargs = {
            "password": {
                "write_only": True
            }
        }

    def validate_email2(self, value):
        data = self.get_initial()
        email1 = data.get("email")
        email2 = value
        if email1 != email2:
            raise ValidationError("Emails must match")

        user_qs = User.objects.filter(email=email2)
        if user_qs.exists():
            raise ValidationError('This user with this username already exists')
        return value

    def create(self, validated_data):
        username = validated_data['username']
        email = validated_data['email']
        password = validated_data['password']
        user_obj = User(
            username=username,
            email=email,
        )
        user_obj.set_password(password)
        user_obj.save()
        return validated_data


class UserDetailSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = [
            'pk',
            'username',
            'email'
        ]


class UserLikesSerializer(ModelSerializer):
    class Meta:
        model = Account
        fields = [
            'likes',
        ]


class AccountDetailSerializer(ModelSerializer):
    user = UserDetailSerializer(read_only=True)

    class Meta:
        model = Account
        fields = [
            'user',
            'birth_date',
            'bio',
            'location',
            'website'
        ]


class BillingInfoSerializer(ModelSerializer):
    user = UserDetailSerializer(read_only=True)

    class Meta:
        model = Account
        fields = [
            'user',
            'first_name',
            'last_name',
            'billing_address_line1',
            'billing_address_line2',
            'billing_postcode',
            'billing_state',
            'billing_city',
            'billing_country',
            'billing_phone_number'
        ]
