from rest_framework.filters import (
    SearchFilter,
    OrderingFilter,
)

from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    ListAPIView,
    RetrieveAPIView,
    RetrieveUpdateAPIView,
)

from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
)

from .models import Itinerary
from .pagination import RecommendationPageNumberPagination
from .permissions import IsOwnerOrReadOnly
from .serializers import (
    ItineraryCreateUpdateSerializer,
    ItineraryDetailSerializer,
    ItineraryListSerializer,
)


class ItineraryCreateView(CreateAPIView):
    """
    This view allows an authenticated user to create a new recommendation
    """
    queryset = Itinerary.objects.all()
    serializer_class = ItineraryCreateUpdateSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        """
        With this function, we attach the user's name to the new recommendation
        """
        serializer.save(user=self.request.user)


class ItineraryDelete(DestroyAPIView):
    lookup_field = 'slug'
    queryset = Itinerary.objects.all()
    serializer_class = ItineraryDetailSerializer
    permission_classes = [IsOwnerOrReadOnly]


class ItineraryDetailAPIView(RetrieveAPIView):
    lookup_field = 'slug'
    permission_classes = ['AllowAny']
    queryset = Itinerary.objects.all()
    serializer_class = ItineraryDetailSerializer


class ItineraryListAPIView(ListAPIView):
    """
    This api view gets all the non draft recommendations and can be filtered with query
    parameters (?search=)
    """
    # TODO: allow to search only specific fields (ex: just city) or is it useless ?
    queryset = Itinerary.objects.all()
    serializer_class = ItineraryListSerializer
    permission_classes = [AllowAny]
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['title', 'content_day1', 'content_day2', 'content_day3', 'user__first_name',
        'user__last_name', 'user__username']
    pagination_class = RecommendationPageNumberPagination


class ItineraryUpdateAPIView(RetrieveUpdateAPIView):
    lookup_field = 'slug'
    queryset = Itinerary.objects.all()
    serializer_class = ItineraryCreateUpdateSerializer
    permission_classes = [IsOwnerOrReadOnly]

# TODO: Add a Recommendation list for posts from a user and posts about a city (use filter on
# queryset instead of all)
