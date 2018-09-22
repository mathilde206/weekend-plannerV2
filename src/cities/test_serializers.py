from django.test import TestCase
from cities.models import City
from cities.serializers import CitySerializer


class TestCitySerializer(TestCase):
    def setUp(self):
        City.objects.create(name='Munich', country='Germany', language='German', currency='EUR')

    def test_cannot_create_already_existing_city(self):
        city = {
            'name': 'Munich',
            'country': 'Germany',
            'language': 'German',
            'currency': 'EUR'
        }
        serialized_city = CitySerializer(data=city)
        self.assertFalse(serialized_city.is_valid())
