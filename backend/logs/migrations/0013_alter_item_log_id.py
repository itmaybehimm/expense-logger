# Generated by Django 4.2.6 on 2023-10-21 03:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('logs', '0012_log_log_hash'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='log_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='items', to='logs.log'),
        ),
    ]
