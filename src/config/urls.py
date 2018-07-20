from django.contrib import admin
from django.conf.urls import url, include
from django.urls import path
from django.views.generic import TemplateView
from rest_framework.schemas import get_schema_view
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from accounts import urls as users_urls
from itineraries import urls as itineraries_urls

urlpatterns = [
    path('api/', get_schema_view()),
    path('api/auth/', include(
        'rest_framework.urls', namespace='rest_framework'
    )),
    path('api/auth/', include(
        'rest_framework.urls', namespace='rest_framework'
    )),
    path('api/auth/token/obtain/', TokenObtainPairView.as_view()),
    path('api/auth/token/refresh/', TokenRefreshView.as_view()),
    path('api/users/', include((users_urls, 'users'), namespace='users-api')),
    path('api/itineraries/', include((itineraries_urls, 'itineraries'), namespace='itineraries-api' )),
    path('admin/', admin.site.urls),
    url(r'', TemplateView.as_view(template_name='react.html')),
]
