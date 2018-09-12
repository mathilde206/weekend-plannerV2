from django.shortcuts import render
from django.http import JsonResponse
from django.conf import settings

from rest_framework.generics import (
    CreateAPIView,
    RetrieveUpdateAPIView,
    ListAPIView,
)
from rest_framework.permissions import IsAuthenticated

from checkout.models import (Order, OrderItem)
from checkout.serializers import (
    OrderSerializer,
    OrderItemSerializer,
    OrderDetailSerializer,
)


def stripe_token_view(request):
    if request.method == 'GET':
        if request.user:
            response = {
                "token": settings.STRIPE_PUBLISHABLE
            }
            return JsonResponse(response)


class OrderCreateView(CreateAPIView):
    """
    This view allows an authenticated user to create a new order
    """
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        """
        With this function, we attach the buyer's name and the products to the order
        """
        serializer.save(buyer=self.request.user)


class OrderItemCreateView(CreateAPIView):
    """
    This view allows an authenticated user to create a new order
    """
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
    permission_classes = [IsAuthenticated]


class UserOrderView(ListAPIView):
    """
    This view returns all the orders for the currently authenticated user.
    """
    def get_queryset(self):
        buyer = self.request.user
        return Order.objects.filter(buyer=buyer)

    serializer_class = OrderSerializer


class OrderDetailView(RetrieveUpdateAPIView):
    """
    This view returns the order items for one order
    """
    queryset = Order.objects.all()
    lookup_field = 'pk'
    serializer_class = OrderDetailSerializer
