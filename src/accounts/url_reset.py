from django.urls import reverse_lazy, path
from django.contrib.auth.views import (
    PasswordResetView,
    PasswordResetDoneView,
    PasswordResetConfirmView,
    PasswordResetCompleteView,
)

urlpatterns = [
    path('', PasswordResetView.as_view(), name='password_reset'),
    path('done/', PasswordResetDoneView.as_view(), name='password_reset_done'),
    path('<uidb64>/<token>/',
        PasswordResetConfirmView.as_view(success_url='/password-reset/completed/'),
        name='password_reset_confirm'),
    path('completed/', PasswordResetCompleteView.as_view(), name='password_reset_complete'),
]
