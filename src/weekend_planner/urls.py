from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from django.conf.urls import url, include
from django.urls import path
from django.views.generic import TemplateView
from rest_framework.schemas import get_schema_view
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from accounts import urls as users_urls
from accounts import url_reset
from itineraries import urls as itineraries_urls
from cities import urls as cities_urls
from products import urls as products_urls
from checkout import urls as checkout_urls

urlpatterns = [
                  path('api/', get_schema_view()),
                  path('api/auth/', include(
                      'rest_framework.urls', namespace='rest_framework'
                  )),
                  path('api/auth/token/obtain/', TokenObtainPairView.as_view()),
                  path('api/auth/token/refresh/', TokenRefreshView.as_view()),
                  path('api/users/', include((users_urls, 'users'), namespace='users-api')),
                  path('api/itineraries/',
                      include((itineraries_urls, 'itineraries'), namespace='itineraries-api')),
                  path('api/cities/',
                      include((cities_urls, 'cities'), namespace='cities-api')),
                  path('api/products/',
                      include((products_urls, 'products'), namespace='products-api')),
                  path('api/checkout/',
                      include((checkout_urls, 'checkout'), namespace='checkout-api')),
                  path('admin/', admin.site.urls),
                  path('password-reset/', include(url_reset))
              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns.append(url(r'', TemplateView.as_view(template_name='react.html')))
