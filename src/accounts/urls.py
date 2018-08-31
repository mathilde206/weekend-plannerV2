from django.urls import path

from .views import (
    UserRetrieveAPIView,
    UserCreateApiView,
    UserLikesRetrieve,
    AccountRetrieveAPIView,
)

urlpatterns = [
    path('<int:pk>/', UserRetrieveAPIView.as_view(), name='getUser'),
    path('register/', UserCreateApiView.as_view(), name='register'),
    path('<int:user>/getLikes/', UserLikesRetrieve.as_view(), name='likes'),
    path('<int:user>/profile/', AccountRetrieveAPIView.as_view(), name='profile')
    # path(r'^login/$', UserLoginApiView.as_view(), name='login'),
]
