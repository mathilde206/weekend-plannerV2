from django.contrib import admin
from django.conf.urls import url, include, re_path
from django.views import generic
from rest_framework.schemas import get_schema_view
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# from .pages.views import FrontendRenderView;


urlpatterns = [
    url(r'^api/$', get_schema_view()),
    url(r'^api/auth/', include(
        'rest_framework.urls', namespace='rest_framework'
    )),
    url(r'^api/auth/token/obtain/$', TokenObtainPairView.as_view()),
    url(r'^api/auth/token/refresh/$', TokenRefreshView.as_view()),
    url(r'^admin/$', admin.site.urls),
    # re_path(r'(?P<path>.*)', FrontendRenderView.as_view(), name='home')
]
