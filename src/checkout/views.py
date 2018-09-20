from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.conf import settings
from rest_framework.permissions import AllowAny
import stripe

from rest_framework.response import Response
from rest_framework import status

User = get_user_model()

from rest_framework.generics import (
    CreateAPIView,
    RetrieveAPIView,
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

    def create(self, request, *args, **kwargs):
        stripe.api_key = settings.STRIPE_SECRET
        serializer = OrderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        headers = self.get_success_headers(serializer.validated_data)

        try:
            charge = stripe.Charge.create(
                amount=int(request.data["total"])*100,
                currency="eur",
                source=request.data['charge_id'],
                description='userID'
            )

            if charge.paid:
                serializer.save(buyer=self.request.user)
                return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
            else:
                error = {"error": "We were unable to take a payment with that card!"}
                return Response(error, status=status.HTTP_402_PAYMENT_REQUIRED,
                    headers=headers)

        except stripe.error.CardError as e:
            error = {"error": "Your card was declined!"}
            return Response(error, status=status.HTTP_402_PAYMENT_REQUIRED, headers=headers)


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


class OrderDetailView(RetrieveAPIView):
    """
    This view returns the order items for one order
    """
    queryset = Order.objects.all()
    lookup_field = 'pk'
    serializer_class = OrderDetailSerializer
    permission_classes = [AllowAny]
