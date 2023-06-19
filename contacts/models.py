from django.db import models
from datetime import datetime


class MyContact(models.Model):
    myname = models.CharField(max_length=64)
    phone = models.CharField(max_length=64)
    email = models.CharField(max_length=128)
    linkedin = models.CharField(max_length=255)
    mycv = models.FileField(upload_to='cv')

    def __str__(self):
        return self.myname

class Contact(models.Model):
    name = models.CharField(max_length=128)
    email = models.EmailField(max_length=128)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.name
