from django.urls import path
from .views import (
    stripe_token_view,
    OrderCreateView,
    OrderItemCreateView,
)

# TODO: research if there's a better way to do that...
urlpatterns = [
    path('token/', stripe_token_view),
    path('order/create/', OrderCreateView.as_view()),
    path('orderitem/create/', OrderItemCreateView.as_view())
]
