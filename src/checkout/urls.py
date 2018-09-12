from django.urls import path
from checkout.views import (
    stripe_token_view,
    OrderCreateView,
    OrderItemCreateView,
    UserOrderView,
    OrderDetailView,
)

# TODO: research if there's a better way to do that...
urlpatterns = [
    path('token/', stripe_token_view),
    path('order/create/', OrderCreateView.as_view()),
    path('orderitem/create/', OrderItemCreateView.as_view()),
    path('user/orders', UserOrderView.as_view()),
    path('order/<pk>/items', OrderDetailView.as_view())
]
