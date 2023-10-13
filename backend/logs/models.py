from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Log(models.Model):
    user_id = models.ManyToManyField(User)
    created_by = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='creator')
    total = models.DecimalField(max_digits=10, decimal_places=2)
    number_of_users = models.IntegerField()
    settled = models.BooleanField(default=False)
    date_created = models.DateField(auto_now=True)


class Item(models.Model):
    log_id = models.ForeignKey(Log, on_delete=models.CASCADE)
    name = models.CharField(max_length=40)
    amount = models.DecimalField(max_digits=6, decimal_places=2)
