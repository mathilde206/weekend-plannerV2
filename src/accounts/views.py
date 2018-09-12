from django.contrib.auth import get_user_model
from accounts.permissions import IsOwnerOrReadOnly
from rest_framework.generics import (
    CreateAPIView,
    RetrieveAPIView,
    RetrieveUpdateAPIView,
)
from rest_framework.permissions import AllowAny
from accounts.models import Account
from accounts.serializers import (
    AccountDetailSerializer,
    UserDetailSerializer,
    UserCreateSerializer,
    UserLikesSerializer,
    BillingInfoSerializer,
)

User = get_user_model()


class UserRetrieveAPIView(RetrieveAPIView):
    """
    Retrieves one user.
    """
    serializer_class = UserDetailSerializer
    permission_classes = [AllowAny]
    queryset = User.objects.all()


class AccountRetrieveAPIView(RetrieveAPIView):
    """
    Retrieves the public details for a user.
    """
    lookup_field = 'user'
    serializer_class = AccountDetailSerializer
    permission_classes = [AllowAny]
    queryset = Account.objects.all()


class UserCreateApiView(CreateAPIView):
    """
    Creates a new User.
    """
    serializer_class = UserCreateSerializer
    permission_classes = [AllowAny]
    queryset = User.objects.all()


class UserLikesRetrieve(RetrieveAPIView):
    """
    Gets the "likes" of a user.
    """
    lookup_field = 'user'
    serializer_class = UserLikesSerializer
    permission_classes = [AllowAny]
    queryset = Account.objects.all()


class AccountUpdateAPIView(RetrieveUpdateAPIView):
    """
    Allows a user to update his account information.
    """
    lookup_field = 'user'
    queryset = Account.objects.all()
    serializer_class = AccountDetailSerializer
    permission_classes = [IsOwnerOrReadOnly]


class AccountRetrieveBillingInfo(RetrieveAPIView):
    # TODO: allow only user to access his own profile
    lookup_field = 'user'
    queryset = Account.objects.all()
    serializer_class = BillingInfoSerializer
    permission_classes = [AllowAny]


class AccountBillingInfoUpdateAPIView(RetrieveUpdateAPIView):
    """
    Allows a user to update their billing information during the checkout process.
    """
    lookup_field = 'user'
    queryset = Account.objects.all()
    serializer_class = BillingInfoSerializer
    permission_classes = [IsOwnerOrReadOnly]
