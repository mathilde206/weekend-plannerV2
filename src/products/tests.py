from django.test import TestCase
from .models import (Product, ProductCity)


class ProductTest(TestCase):
    """
    Tests that will be run against our Product models.
    """

    def test_str(self):
        test_name = Product(name='A product')
        self.assertEqual(str(test_name), 'A product')


class ProductCityTest(TestCase):
    """
    Tests that will be run against our Product City models.
    """
    def test_str(self):
        test_name = ProductCity(name='A city')
        self.assertEqual(str(test_name), 'A city')
