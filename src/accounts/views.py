from django.contrib.auth import get_user_model

from accounts.permissions import IsOwnerOrReadOnly

from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    ListAPIView,
    RetrieveAPIView,
    RetrieveUpdateAPIView,
)

from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
)

#
# from recommendations.pagination import RecommendationPageNumberPagination
# from recommendations.permissions import IsOwnerOrReadOnly

User = get_user_model()
from accounts.models import Account

from accounts.serializers import (
    AccountDetailSerializer,
    UserDetailSerializer,
    UserCreateSerializer,
    UserLikesSerializer,
    BillingInfoSerializer,
)


class UserRetrieveAPIView(RetrieveAPIView):
    serializer_class = UserDetailSerializer
    permission_classes = [AllowAny]
    queryset = User.objects.all()


class AccountRetrieveAPIView(RetrieveAPIView):
    lookup_field = 'user'
    serializer_class = AccountDetailSerializer
    permission_classes = [AllowAny]
    queryset = Account.objects.all()


class UserCreateApiView(CreateAPIView):
    serializer_class = UserCreateSerializer
    permission_classes = [AllowAny]
    queryset = User.objects.all()


class UserLikesRetrieve(RetrieveAPIView):
    lookup_field = 'user'
    serializer_class = UserLikesSerializer
    permission_classes = [AllowAny]
    queryset = Account.objects.all()


class AccountUpdateAPIView(RetrieveUpdateAPIView):
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
    lookup_field = 'user'
    queryset = Account.objects.all()
    serializer_class = BillingInfoSerializer
    permission_classes = [IsOwnerOrReadOnly]

#
# class UserLoginApiView(APIView):
#     permission_classes = [AllowAny]
#     serializer_class = UserLoginSerializer
#
#     def post(self, request, *args, **kwargs):
#         data = request.data
#         serializer = UserLoginSerializer(data=data)
#         if serializer.is_valid(raise_exception=True):
#             new_data = serializer.data
#             return Response(new_data, HTTP_200_OK)
#         return Response(serializer.errors, HTTP_400_BAD_REQUEST)
