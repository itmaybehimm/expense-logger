# Generated by Django 4.2.6 on 2023-10-18 09:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_profile', '0008_alter_userprofile_profile_pic'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='otp',
            field=models.CharField(default=None, max_length=64, null=True),
        ),
    ]
