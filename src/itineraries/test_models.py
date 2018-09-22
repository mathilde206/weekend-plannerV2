from django.contrib.auth.models import User
from django.test import TestCase
from cities.models import City
from itineraries.models import (
    upload_location,
    Itinerary,
    create_slug,
)


class TestItinerariesModel(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.city = City.objects.create(name='Munich', country='Germany', language='German',
            currency='EUR')
        self.itinerary = Itinerary.objects.create(
            title='A itinerary',
            user=self.user,
            city=self.city
        )

    def test_str(self):
        created_itinerary = Itinerary.objects.filter(title='A itinerary')[0]
        self.assertEqual(str(created_itinerary), 'A itinerary')

    def test_upload_location(self):
        self.assertEqual(upload_location(self.itinerary, 'hello'), 'Munich/hello')

    def test_create_slug(self):
        """
        The slug already exist, so we should get one with a suffix.
        """
        self.assertEqual(create_slug(self.itinerary, ), 'a-itinerary-1')