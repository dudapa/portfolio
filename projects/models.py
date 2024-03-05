from django.db import models


class Project(models.Model):
    title = models.CharField(max_length=256)
    description = models.TextField()
    technologies = models.TextField()
    view_code = models.CharField(max_length=255)
    live_code = models.CharField(max_length=255, blank=True, null=True)
    project_image = models.ImageField(upload_to='images/projects/')
    published = models.BooleanField(default=True)
    project_weight = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)

    def __str__(self):
        return self.title