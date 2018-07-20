from django.db import models


class City(models.Model):
    name = models.CharField(max_length=100)
    country = models.CharField(max_length=200)
    currency = models.CharField(max_length=10)
    language = models.CharField(max_length=20)

    def __str__(self):
        return self.name
