from rest_framework.serializers import (
    ModelSerializer,
    ValidationError,
)

from .models import Product


class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'pk',
            'name',
            'type',
            'price',
        ]
        read_only_fields = [
            'pk'
        ]
