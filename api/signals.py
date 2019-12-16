from django.db.models.signals import post_save
from api.models import CustomUser
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

@receiver(post_save, sender=CustomUser)
def init_new_user(sender, instance, signal, created, **kwargs):
    if created:
        Token.objects.create(user=instance)
