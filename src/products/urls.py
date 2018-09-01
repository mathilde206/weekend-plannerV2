from django.urls import path
from .views import (
    ProductList,
    ProductDetailsList,
)

urlpatterns = [
    path('', ProductList.as_view()),
    path('<pk>/', ProductDetailsList.as_view())
]
