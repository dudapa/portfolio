# Generated by Django 4.1 on 2023-06-18 18:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contacts', '0005_contact_created_at'),
    ]

    operations = [
        migrations.CreateModel(
            name='MyContact',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('myname', models.CharField(max_length=64)),
                ('phone', models.CharField(max_length=64)),
                ('email', models.CharField(max_length=128)),
                ('likendin', models.CharField(max_length=255)),
                ('mycv', models.FileField(upload_to='')),
            ],
        ),
    ]
