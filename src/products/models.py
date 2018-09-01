from django.db import models


class Product(models.Model):
    BUDGET_CHOICES = (
        ('Basic', 'Basic'),
        ('Premium', 'Premium'),
        ('Deluxe', 'Deluxe')
    )

    name = models.CharField(max_length=254, default='')
    type = models.CharField(
        max_length=15,
        choices=BUDGET_CHOICES,
        default='Basic',
    )
    price = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return "{city}-{type}".format(city=self.name, type=self.type)
