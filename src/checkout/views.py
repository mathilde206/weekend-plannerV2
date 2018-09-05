from django.shortcuts import render
from django.http import JsonResponse
from django.conf import settings

from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated

from .models import (Order, OrderItem)
from .serializers import (OrderSerializer, OrderItemSerializer)


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
