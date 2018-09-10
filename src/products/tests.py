from django.test import TestCase
from products.models import Product


class ProductTest(TestCase):
    """
    Tests that will be run against our Product models.
    """

    def test_str(self):
        test_name = Product(name='A product', type='Basic')
        self.assertEqual(str(test_name), 'A product-Basic')
