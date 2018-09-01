from django.test import TestCase
from .models import City


class CityTest(TestCase):
    """
    Tests that will be run against our City models.
    """

    def test_str(self):
        test_name = City(name='A city')
        self.assertEqual(str(test_name), 'A city')
