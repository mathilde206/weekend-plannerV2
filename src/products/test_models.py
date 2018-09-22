from django.test import TestCase
from products.models import Product


class TestProductModel(TestCase):
    def setUp(self):
        self.product = Product.objects.create(
            name='A city',
            type='basic',
            price='200',
        )

    def test_str(self):
        created_product = Product.objects.filter(name='A city')[0]
        self.assertEqual(str(created_product), 'A city-basic')
