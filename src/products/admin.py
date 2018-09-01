from django.contrib import admin
from .models import Product

# Products will only be added at the admin level.
admin.site.register(Product)
