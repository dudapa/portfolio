# Generated by Django 4.1 on 2024-02-19 12:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('skills', '0003_remove_skill_value_skill_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='skill',
            name='confident',
            field=models.BooleanField(default=True),
        ),
    ]
