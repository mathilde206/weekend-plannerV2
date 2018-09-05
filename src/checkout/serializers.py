from rest_framework.serializers import (
    ModelSerializer,
)

from .models import (Order, OrderItem)


class OrderSerializer(ModelSerializer):
    class Meta:
        model = Order
        fields = [
            'pk',
            'buyer',
            'creation_date',
            'stripe_token',
        ]
        read_only_fields = [
            'pk',
            'buyer'
        ]


class OrderItemSerializer(ModelSerializer):
    class Meta:
        model = OrderItem
        fields = [
            'product',
            'order',
        ]