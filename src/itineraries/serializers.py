from rest_framework.serializers import (
    HyperlinkedIdentityField,
    ModelSerializer,
    SerializerMethodField,
)

from accounts.serializers import UserDetailSerializer

from .models import Itinerary

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
    image = SerializerMethodField()
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
        ]


class ItineraryListSerializer(ModelSerializer):
    user = UserDetailSerializer(read_only=True)

    class Meta:
        model = Itinerary
        fields = [
            'title',
            'city',
            'likes',
            'number_of_days',
            'slug',
            'user',
            'views'
        ]
