from django.contrib.auth import get_user_model
from django.forms.models import model_to_dict
from rest_framework.filters import (
    SearchFilter,
    OrderingFilter,
)

from rest_framework.generics import (
    GenericAPIView,
    CreateAPIView,
    DestroyAPIView,
    ListAPIView,
    RetrieveAPIView,
    RetrieveUpdateAPIView,
)

from django.shortcuts import get_object_or_404
from rest_framework.response import Response

from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
)

from accounts.models import Account

from .models import Itinerary
from .pagination import ItinerariesListPagination
from .permissions import IsOwnerOrReadOnly
from .serializers import (
    ItineraryCreateUpdateSerializer,
    ItineraryDetailSerializer,
    ItineraryListSerializer,
    ItineraryUpdateNumberOfViews,
)

from accounts.serializers import (UserDetailSerializer, UserLikesSerializer)

User = get_user_model()


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
    permission_classes = [IsOwnerOrReadOnly]


class ItineraryDetailAPIView(RetrieveAPIView):
    lookup_field = 'slug'
    permission_classes = [AllowAny]
    queryset = Itinerary.objects.all()
    serializer_class = ItineraryDetailSerializer


class ItineraryListAPIView(ListAPIView):
    """
    This api view gets either all itineraries or filtered by basic search query from django
    """
    queryset = Itinerary.objects.all()
    serializer_class = ItineraryListSerializer
    permission_classes = [AllowAny]
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = [
        "city__name",
        "created_date",
        "day1_afternoon",
        "day1_diner",
        "day1_lunch",
        "day1_morning",
        "day2_afternoon",
        "day2_diner",
        "day2_lunch",
        "day2_morning",
        "day3_afternoon",
        "day3_diner",
        "day3_lunch",
        "day3_morning",
        "image",
        "title"
    ]
    pagination_class = ItinerariesListPagination


class ItineraryListCustomFilterAPIView(ListAPIView):
    """
    This view returns a list of itinerary filtered by city, budget and/or number of days
    """
    serializer_class = ItineraryListSerializer
    pagination_class = ItinerariesListPagination
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Itinerary.objects.all()
        city = self.request.query_params.get('city', None)
        budget = self.request.query_params.get('budget', None)
        numberOfDays = self.request.query_params.get('numberOfDays', None)

        if city is not None:
            queryset = queryset.filter(city__name__contains=city)
        if budget is not None:
            queryset = queryset.filter(budget__contains=budget)
        if numberOfDays is not None:
            queryset = queryset.filter(number_of_days__exact=numberOfDays)
        return queryset


class ItineraryUpdateAPIView(RetrieveUpdateAPIView):
    lookup_field = 'slug'
    queryset = Itinerary.objects.all()
    serializer_class = ItineraryCreateUpdateSerializer
    permission_classes = [IsOwnerOrReadOnly]


class ItineraryUpdateNumberOfViewsView(RetrieveUpdateAPIView):
    lookup_field = 'slug'
    queryset = Itinerary.objects.all()
    serializer_class = ItineraryUpdateNumberOfViews
    permission_classes = [AllowAny]


class ItineraryUpdateLikes(GenericAPIView):
    lookup_field = 'slug'
    queryset = Itinerary.objects.all()
    permission_classes = [IsAuthenticated]

    def get(self, request, slug=None, format=None):
        obj = get_object_or_404(Itinerary, slug=slug)
        user = self.request.user
        userId = User.objects.filter(username=user)[0].id
        account = Account.objects.filter(user=userId)[0]

        if account in obj.likes.all():
            obj.likes.remove(account)
            obj.save()
        else:
            obj.likes.add(account)
            obj.save()

        userLikes = []
        for itinerary in account.likes.all():
            userLikes.append(itinerary.id)

        data = {
            "userLikes": userLikes,
        }
        return Response(data)

# TODO: Add a Recommendation list for posts from a user and posts about a city (use filter on
# queryset instead of all)
