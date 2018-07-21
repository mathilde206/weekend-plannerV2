from django.urls import path
from django.conf.urls import url
from .views import (
    CityRetrieveView,
    CityListView,
    CityCreateView,
)

urlpatterns = [
    path('', CityListView.as_view()),
    path('<pk>', CityRetrieveView.as_view()),
    path('create/', CityCreateView.as_view())
]

# TODO: how does it work for cities with several words