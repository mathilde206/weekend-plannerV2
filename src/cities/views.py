from rest_framework.filters import (
    SearchFilter,
)

from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    RetrieveAPIView,
    UpdateAPIView,
)

from rest_framework.permissions import (
    IsAuthenticated,
    AllowAny,
)

from cities.models import City
from cities.serializers import CitySerializer


class CityRetrieveView(RetrieveAPIView):
    lookup_field = 'pk'
    permission_classes = [AllowAny]
    serializer_class = CitySerializer
    filter_backends = [SearchFilter]
    search_fields = ['name']

    def get_queryset(self):
        return City.objects.all()


class CityListView(ListAPIView):
    lookup_field = 'name'
    permission_classes = [AllowAny]
    serializer_class = CitySerializer
    filter_backends = [SearchFilter]
    search_fields = ['name']

    def get_queryset(self):
        return City.objects.all()


class CityCreateView(CreateAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    permission_classes = [IsAuthenticated]


class CityUpdateView(UpdateAPIView):
    lookup_field = 'pk'
    queryset = City.objects.all()
    serializer_class = CitySerializer
    permission_classes = [IsAuthenticated]
