from django.urls import path
from django.conf.urls import url
from .views import (
    ItineraryCreateView,
    ItineraryDelete,
    ItineraryDetailAPIView,
    ItineraryUpdateAPIView,
    ItineraryListAPIView,
    ItineraryUpdateNumberOfViewsView,
    ItineraryUpdateLikes,
)

urlpatterns = [
    path('', ItineraryListAPIView.as_view()),
    path('<slug>', ItineraryDetailAPIView.as_view()),
    path('create/', ItineraryCreateView.as_view()),
    path('<slug>/delete', ItineraryDelete.as_view()),
    path('<slug>/update', ItineraryUpdateAPIView.as_view()),
    path('<slug>/views', ItineraryUpdateNumberOfViewsView.as_view()),
    path('<slug>/like', ItineraryUpdateLikes.as_view()),
]
