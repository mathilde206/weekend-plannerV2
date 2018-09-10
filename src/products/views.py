from rest_framework.filters import (
    SearchFilter,
)

from rest_framework.generics import (
    RetrieveAPIView,
    ListAPIView,
)

from rest_framework.permissions import (
    AllowAny,
)

from products.serializers import ProductSerializer
from products.models import Product


class ProductList(ListAPIView):
    queryset = Product.objects.all()
    permission_classes = [AllowAny]
    serializer_class = ProductSerializer
    filter_backends = [SearchFilter]
    search_fields = ['name']


class ProductDetailsList(RetrieveAPIView):
    queryset = Product.objects.all()
    permission_classes = [AllowAny]
    serializer_class = ProductSerializer
