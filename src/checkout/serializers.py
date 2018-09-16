from rest_framework.serializers import (
    ModelSerializer,
    SerializerMethodField,
)

from checkout.models import (Order, OrderItem)
from accounts.serializers import UserDetailSerializer
from products.serializers import ProductSerializer


class OrderSerializer(ModelSerializer):
    class Meta:
        model = Order
        fields = [
            'pk',
            'buyer',
            'creation_date',
            'charge_id',
            'total',
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


class OrderDetailSerializer(ModelSerializer):
    order_items = SerializerMethodField()
    buyer = UserDetailSerializer(read_only=True)

    def get_order_items(self, obj):
        order_number = obj.pk
        items = OrderItem.objects.filter(order=order_number)
        order = []
        for item in items:
            order.append({
                "name": item.product.name,
                "type": item.product.type,
                "price": item.product.price
            })
        return order

    class Meta:
        model = Order
        fields = [
            'pk',
            'buyer',
            'creation_date',
            'order_items',
        ]
