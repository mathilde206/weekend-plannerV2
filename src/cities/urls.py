from django.urls import path
from cities.views import (
    CityRetrieveView,
    CityListView,
    CityCreateView,
)

urlpatterns = [
    path('', CityListView.as_view()),
    path('<pk>', CityRetrieveView.as_view()),
    path('create/', CityCreateView.as_view())
]

