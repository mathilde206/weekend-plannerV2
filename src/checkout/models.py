from django.contrib.auth import get_user_model
from django.db import models
from products.models import Product

User = get_user_model()


class Order(models.Model):
    """
    This model is represents an order with the charge_id from stripe, created after a successful
    payment
    """
    buyer = models.ForeignKey(User, null=False, on_delete=models.CASCADE)
    creation_date = models.DateTimeField(auto_now_add=True)
    charge_id = models.CharField(blank=True, max_length=500)
    total = models.DecimalField(max_digits=10, decimal_places=2, blank=True)


class OrderItem(models.Model):
    """
    This model links products to an order.
    """
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
