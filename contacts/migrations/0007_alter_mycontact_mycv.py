# Generated by Django 4.1 on 2023-06-18 18:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contacts', '0006_mycontact'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mycontact',
            name='mycv',
            field=models.FileField(upload_to='cv'),
        ),
    ]
