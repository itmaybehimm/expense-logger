# Generated by Django 4.2.6 on 2023-10-18 09:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('logs', '0003_alter_item_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='log',
            name='created_by',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='log_created', to=settings.AUTH_USER_MODEL),
        ),
    ]
