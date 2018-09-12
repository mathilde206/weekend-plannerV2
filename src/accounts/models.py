from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class Account(models.Model):
    """
    This model is an extension of the user profile for the profile page and the billing.
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=120, blank=True)
    last_name = models.CharField(max_length=120, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    location = models.CharField(max_length=120, blank=True)
    website = models.CharField(max_length=120, blank=True)
    billing_address_line1 = models.CharField(max_length=120, blank=True)
    billing_address_line2 = models.CharField(max_length=120, blank=True)
    billing_postcode = models.CharField(max_length=120, blank=True)
    billing_state = models.CharField(max_length=120, blank=True)
    billing_city = models.CharField(max_length=120, blank=True)
    billing_country = models.CharField(max_length=120, blank=True)
    billing_phone_number = models.CharField(max_length=120, blank=True)

    def __str__(self):
        return self.user.username


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """
    This function will create a new account attached to a user everytime a user registers.
    """
    if created:
        Account.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    """
    This function will save the new account attached to a user when the registration is complete..
    """
    instance.account.save()
