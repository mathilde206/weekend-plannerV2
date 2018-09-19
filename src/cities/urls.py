from django.urls import path
from cities.views import (
    CityRetrieveView,
    CityListView,
    CityCreateView,
    CityUpdateView
)

urlpatterns = [
    path('', CityListView.as_view()),
    path('<pk>', CityRetrieveView.as_view()),
    path('<pk>/update', CityUpdateView.as_view()),
    path('create/', CityCreateView.as_view())
]
