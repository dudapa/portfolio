from django.db import models
from datetime import datetime


class Contact(models.Model):
    name = models.CharField(max_length=128)
    email = models.CharField(max_length=128)
    message = models.TextField()
    contact_date = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return self.name
