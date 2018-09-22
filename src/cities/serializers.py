from rest_framework.serializers import (
    ModelSerializer,
    ValidationError,
)

from cities.models import City


class CitySerializer(ModelSerializer):
    class Meta:
        model = City
        fields = [
            'pk',
            'name',
            'country',
            'currency',
            'language'
        ]
        read_only_fields = [
            'pk'
        ]

    def validate_name(self, value):
        """
        This function makes sure we can only create one city with the same name
        """
        qs = City.objects.filter(name__iexact=value)
        if self.instance:
            qs = qs.exclude(pk=self.instance.pk)
        if qs.exists():
            raise ValidationError('The City Already exists')
        return value
