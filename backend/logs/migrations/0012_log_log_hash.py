# Generated by Django 4.2.6 on 2023-10-20 17:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('logs', '0011_remove_log_log_hash'),
    ]

    operations = [
        migrations.AddField(
            model_name='log',
            name='log_hash',
            field=models.CharField(max_length=64, null=True),
        ),
    ]
