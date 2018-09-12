from django.test import TestCase
from django.contrib.auth import get_user_model
from accounts.serializers import UserCreateSerializer

User = get_user_model()


class TestAccountSerializer(TestCase):
    def setUp(self):
        #Used to check we cannot create two users with same username
        self.user = User.objects.create_user(username='userfortests', password='12345')

    def test_validate_email2_with_wrong_data(self):
        # Test that an error is thrown if the mails are different
        wrong_user = {
            'username': 'testuser',
            'email':'testuser@gmail.com',
            'email2':'test@gmail.com',
            'password':'1234567',
        }
        user = UserCreateSerializer(data=wrong_user)
        self.assertEqual(user.is_valid(), False)

    def test_validate_email2_with_right_data(self):
        # Test that an error is thrown if the mails are different
        good_user = {
            'username': 'testuser',
            'email': 'testuser@gmail.com',
            'email2': 'testuser@gmail.com',
            'password': '1234567',
        }
        user = UserCreateSerializer(data=good_user)
        self.assertEqual(user.is_valid(), True)

    def test_cannot_create_already_existing_user(self):
        # Test that an error is thrown if the mails are different
        existing_user = {
            'username': 'userfortests',
            'email': 'userfortests@gmail.com',
            'email2': 'userfortests@gmail.com',
            'password': '1234567',
        }
        user = UserCreateSerializer(data=existing_user)
        self.assertEqual(user.is_valid(), False)

    def serializer_can_create_a_new_user(self):
        good_user = {
            'username': 'testuser',
            'email': 'testuser@gmail.com',
            'email2': 'testuser@gmail.com',
            'password': '1234567',
        }
        user = UserCreateSerializer(data=good_user)
        user_qs = User.objects.filter(username='testuser')
        # The user was created
        self.assertEqual(len(user_qs), 1)
        # The right user was created
        self.assertEqual(user_qs[0].username, 'testuser')

    def serializer_create_returns_the_validated_data(self):
        good_user = {
            'username': 'testuser',
            'email': 'testuser@gmail.com',
            'email2': 'testuser@gmail.com',
            'password': '1234567',
        }
        user = UserCreateSerializer.create(validated_data=good_user)
        self.assertEqual(user, good_user)