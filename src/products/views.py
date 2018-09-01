from rest_framework.filters import (
    SearchFilter,
)

from rest_framework.generics import (
    ListAPIView,
)

from rest_framework.permissions import (
    AllowAny,
)

from .serializers import ProductSerializer
from .models import Product


class ProductList(ListAPIView):
    queryset = Product.objects.all()
    lookup_field = 'name'
    permission_classes = [AllowAny]
    serializer_class = ProductSerializer
    filter_backends = [SearchFilter]
    search_fields = ['name']
