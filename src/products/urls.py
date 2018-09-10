from django.urls import path
from products.views import (
    ProductList,
    ProductDetailsList,
)

urlpatterns = [
    path('', ProductList.as_view()),
    path('<pk>/', ProductDetailsList.as_view())
]
