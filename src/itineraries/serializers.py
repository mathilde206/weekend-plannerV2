from rest_framework.serializers import (
    HyperlinkedIdentityField,
    ModelSerializer,
    SerializerMethodField,
)

from accounts.serializers import UserDetailSerializer

from itineraries.models import Itinerary


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
    image = SerializerMethodField()
    user = UserDetailSerializer(read_only=True)
    likes = SerializerMethodField()

    def get_image(self, obj):
        """
        If an image was uploaded, we add its url
        """
        try:
            image = obj.image.url
        except:
            image = None
        return image

    def get_city(self, obj):
        return {
            'pk': obj.city.pk,
            'name': obj.city.name,
            'country': obj.city.country,
            'currency': obj.city.currency,
            'language': obj.city.language
        }

    def get_likes(self, obj):
        return obj.likes.count()

    class Meta:
        model = Itinerary
        fields = [
            'pk',
            'title',
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
            'likes',
            'number_of_days',
            'user',
            'views',
            'created_date',
        ]


class ItineraryListSerializer(ModelSerializer):
    user = UserDetailSerializer(read_only=True)
    city = SerializerMethodField()

    def get_city(self, obj):
        return {
            'name': obj.city.name,
        }

    class Meta:
        model = Itinerary
        fields = [
            'title',
            'city',
            'image',
            'likes',
            'number_of_days',
            'slug',
            'user',
            'views'
        ]


class ItineraryUpdateNumberOfViews(ModelSerializer):
    views = SerializerMethodField('increment_views')

    def increment_views(self, obj):
        obj.views += 1
        obj.save()

    class Meta:
        model = Itinerary
        fields = [
            'slug',
            'views'
        ]
        read_only_fields = [
            'slug',
        ]
