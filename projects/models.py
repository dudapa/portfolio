from django.db import models


class Project(models.Model):
    title = models.CharField(max_length=256)
    description = models.TextField()
    technologies = models.TextField()
    view_code = models.TextField()
    is_live_code = models.BooleanField(default=True)
    live_code = models.TextField(blank=True)
    project_image = models.ImageField(upload_to='photos/%Y/%m/%d/')
    is_published = models.BooleanField(default=True)