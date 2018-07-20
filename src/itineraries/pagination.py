from rest_framework.pagination import (
    PageNumberPagination,
)


class RecommendationPageNumberPagination(PageNumberPagination):
    page_size = 10
