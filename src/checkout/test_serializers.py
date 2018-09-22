from django.test import TestCase
from checkout.models import (Order, OrderItem)
from checkout.serializers import OrderDetailSerializer
from products.models import Product
from django.contrib.auth.models import User


class TestAccountSerializer(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.order = Order.objects.create(buyer=self.user, charge_id='1234', total='200')
        self.product = Product.objects.create(name='Product1', type='Basic', price='2')
        self.item = OrderItem.objects.create(product=self.product, order=self.order)

    def test_get_order_items(self):
        product = OrderDetailSerializer.get_order_items(self, self.product)
        self.assertEqual(str(product[0]['name']), 'Product1')

