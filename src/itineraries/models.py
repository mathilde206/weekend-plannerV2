from django.db import models
from django.db.models.signals import pre_save
from django.conf import settings
from django.utils.text import slugify

from cities.models import City


# TODO: Once I add the city field, need to update the location to --> <city>/filename
def upload_location(instance, filename):
    return "%s/%s" % (instance.city, filename)


class Itinerary(models.Model):
    BUDGET_CHOICES = (
        ('Cheap', '$'),
        ('Affordable', '$$'),
        ('Expensive', '$$$'),
        ('Very_Expensive', '$$$$')
    )

    title = models.CharField(max_length=120)
    created_date = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField(default=0)
    slug = models.SlugField(unique=True)
    updated_date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    views = models.IntegerField(default=0)
    image = models.ImageField(
        upload_to=upload_location,
        blank=True,
        null=True)
    # TODO: Figure out how this works (and if I need it)
    # height_field = models.IntegerField(default=0, editable=False)
    # width_field = models.IntegerField(default=0, editable=False)

    budget = models.CharField(
        max_length=15,
        choices=BUDGET_CHOICES,
        default='Affordable',
    )

    city = models.ForeignKey(City, on_delete=models.CASCADE, null=True)
    number_of_days = models.IntegerField(default=1)

    # Content of the recommendation
    day1_morning = models.TextField(null=True, blank=True)
    day1_lunch = models.TextField(null=True, blank=True)
    day1_afternoon = models.TextField(null=True, blank=True)
    day1_diner = models.TextField(null=True, blank=True)

    day2_morning = models.TextField(null=True, blank=True)
    day2_lunch = models.TextField(null=True, blank=True)
    day2_afternoon = models.TextField(null=True, blank=True)
    day2_diner = models.TextField(null=True, blank=True)

    day3_morning = models.TextField(null=True, blank=True)
    day3_lunch = models.TextField(null=True, blank=True)
    day3_afternoon = models.TextField(null=True, blank=True)
    day3_diner = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.title


def create_slug(instance, new_slug=None):
    """
    This recursive function will ensure that we create a unique slug (in case several
    recommendations have the same title)
    by adding the id of the last one created to this instance (which unfortunately doesn't have
    an idea to append yet).
    """
    slug = slugify(instance.title)
    if new_slug is not None:
        slug = new_slug
    qs = Itinerary.objects.filter(slug=slug).order_by('-id')
    exists = qs.exists()
    if exists:
        new_slug = "{0}-{1}".format(slug, qs.first().id)
        return create_slug(instance, new_slug=new_slug)
    return slug


def pre_save_itinerary_receiver(sender, instance, *args, **kwargs):
    """
    This function will be called before the new instance is saved in the database and will add
    the slug which can't be added by the user.
    """
    if not instance.slug:
        instance.slug = create_slug(instance)


pre_save.connect(pre_save_itinerary_receiver, sender=Itinerary)
