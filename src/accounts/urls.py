from django.urls import path

from .views import (
    UserRetrieveAPIView,
    UserCreateApiView,
)

urlpatterns = [
    path('<int:pk>/', UserRetrieveAPIView.as_view(), name='getUser'),
    path('register/', UserCreateApiView.as_view(), name='register'),
    # path(r'^login/$', UserLoginApiView.as_view(), name='login'),
]