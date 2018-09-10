from django.urls import path

from accounts.views import (
    UserRetrieveAPIView,
    UserCreateApiView,
    UserLikesRetrieve,
    AccountRetrieveAPIView,
    AccountUpdateAPIView,
    AccountRetrieveBillingInfo,
    AccountBillingInfoUpdateAPIView,
)

urlpatterns = [
    path('<int:pk>/', UserRetrieveAPIView.as_view(), name='getUser'),
    path('register/', UserCreateApiView.as_view(), name='register'),
    path('<int:user>/getLikes/', UserLikesRetrieve.as_view(), name='likes'),
    path('<int:user>/profile/', AccountRetrieveAPIView.as_view(), name='profile'),
    path('<int:user>/profile/edit/', AccountUpdateAPIView.as_view(), name='update_profile'),
    path('<int:user>/billing/', AccountRetrieveBillingInfo.as_view(), name='billing'),
    path('<int:user>/billing/edit/', AccountBillingInfoUpdateAPIView.as_view(),
        name='update_billing')
    # path(r'^login/$', UserLoginApiView.as_view(), name='login'),
]
