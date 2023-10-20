from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Log(models.Model):
    users_involved = models.ManyToManyField(User, related_name='all_logs')
    created_by = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='logs_created')
    total = models.DecimalField(
        max_digits=10, decimal_places=2, null=False, default=0)
    settled = models.BooleanField(default=False)
    date_created = models.DateField(auto_now=True)

    def __str__(self):
        return (self.created_by.username+" log "+str(self.id))


class Item(models.Model):
    log_id = models.ForeignKey(Log, on_delete=models.CASCADE)
    name = models.CharField(max_length=40)
    amount = models.DecimalField(max_digits=6, decimal_places=2)
    splitted_among = models.ManyToManyField(User, related_name='all_items')
