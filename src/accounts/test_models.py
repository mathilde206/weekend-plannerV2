from django.test import TestCase
from accounts.models import Account
from django.contrib.auth.models import User


class TestAccountModel(TestCase):
    def setUp(self):
        # Setup run before every test method.
        self.user = User.objects.create_user(username='testuser', password='12345')

    def test_account_is_created_when_user_is_created(self):
        """
        If the user is created, an account is automatically created
        """
        accounts = Account.objects.all()
        self.assertEqual(len(accounts), 1)

        # Test that the user is the correct one.
        created_account = Account.objects.filter(user=1)[0]
        self.assertEqual(str(created_account.user), 'testuser')

    def test_str(self):
        created_account = Account.objects.filter(user=1)[0]
        self.assertEqual(str(created_account), 'testuser')
