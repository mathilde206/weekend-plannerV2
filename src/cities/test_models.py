from django.test import TestCase
from cities.models import City


class TestCitySerializer(TestCase):
    def setUp(self):
        city = City.objects.create(name='Munich', country='Germany', language='German',
            currency='EUR')

    def test_str(self):
        created_city = City.objects.filter(name='Munich')[0]
        self.assertEqual(str(created_city), 'Munich')
