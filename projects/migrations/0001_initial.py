# Generated by Django 4.1 on 2022-08-12 12:40

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=256)),
                ('description', models.TextField(blank=True)),
                ('technologies', models.TextField()),
                ('view_code', models.TextField()),
                ('is_live_code', models.BooleanField(default=True)),
                ('live_code', models.TextField(blank=True)),
                ('project_image', models.ImageField(upload_to='photos/%Y/%m/%d/')),
                ('is_published', models.BooleanField(default=True)),
            ],
        ),
    ]
