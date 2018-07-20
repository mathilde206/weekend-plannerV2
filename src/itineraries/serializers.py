from rest_framework.serializers import (
    HyperlinkedIdentityField,
    ModelSerializer,
    SerializerMethodField,
)

from accounts.serializers import UserDetailSerializer

from .models import Itinerary

itinerary_url = HyperlinkedIdentityField(
    view_name='recommendations-api:detail_recommendation',
    lookup_field='slug'
)

itinerary_update_url = HyperlinkedIdentityField(
    view_name='recommendations-api:update_recommendation',
    lookup_field='slug'
)

itinerary_delete_url = HyperlinkedIdentityField(
    view_name='recommendations-api:delete_recommendation',
    lookup_field='slug'
)


class ItineraryCreateUpdateSerializer(ModelSerializer):
    class Meta:
        model = Itinerary
        fields = [
            'title',
            'slug',
            'budget',
            'city',
            'day1_morning',
            'day1_lunch',
            'day1_afternoon',
            'day1_diner',
            'day2_morning',
            'day2_lunch',
            'day2_afternoon',
            'day2_diner',
            'day3_morning',
            'day3_lunch',
            'day3_afternoon',
            'day3_diner',
            'image',
            'number_of_days',
        ]
        read_only_fields = [
            'slug',
        ]


class ItineraryDetailSerializer(ModelSerializer):
    city = SerializerMethodField()
    comments = SerializerMethodField()
    delete_url = itinerary_delete_url
    image = SerializerMethodField()
    url = itinerary_url
    update_url = itinerary_update_url
    user = UserDetailSerializer(read_only=True)

    @staticmethod
    def get_image(self, obj):
        """
        If an image was uploaded, we add its url
        """
        # TODO: the media upload doesn't work !!!!
        try:
            image = obj.image.url
        except:
            image = None
        return image

    @staticmethod
    def get_city(self, obj):
        return {
            'name': obj.city.name,
            'country': obj.city.country,
            'currency': obj.city.currency,
            'language': obj.city.language
        }

    class Meta:
        model = Itinerary
        fields = [
            'title',
            'budget',
            'city',
            'comments',
            'day1_morning',
            'day1_lunch',
            'day1_afternoon',
            'day1_diner',
            'day2_morning',
            'day2_lunch',
            'day2_afternoon',
            'day2_diner',
            'day3_morning',
            'day3_lunch',
            'day3_afternoon',
            'day3_diner',
            'image',
            'likes',
            'number_of_days',
            'user',
            'views',
            'created_date',
            'url',
            'update_url',
            'delete_url',
        ]


class ItineraryListSerializer(ModelSerializer):
    url = itinerary_url
    user = UserDetailSerializer(read_only=True)

    class Meta:
        model = Itinerary
        fields = [
            'title',
            'city',
            'likes',
            'number_of_days',
            'slug',
            'url',
            'user',
            'views'
        ]
