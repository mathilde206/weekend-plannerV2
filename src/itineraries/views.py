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
    serializer_class = ItineraryDetailSerializer
    permission_classes = [IsOwnerOrReadOnly]


class ItineraryDetailAPIView(RetrieveAPIView):
    lookup_field = 'slug'
    permission_classes = [AllowAny]
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
    pagination_class = ItinerariesListPagination


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
            print(account.likes.all())
        else:
            obj.likes.add(account)
            obj.save()
            print(account.likes.all())

        userLikes = []
        for itinerary in account.likes.all():
            userLikes.append(itinerary.id)

        data = {
            "userLikes": userLikes,
        }
        return Response(data)



# TODO: Add a Recommendation list for posts from a user and posts about a city (use filter on
# queryset instead of all)
