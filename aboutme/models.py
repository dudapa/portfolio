from django.db import models


class Title(models.Model):
    name = models.CharField(max_length=126)
    order = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Paragraph(models.Model):
    title = models.ForeignKey(Title, on_delete=models.PROTECT, blank=True, null=True)
    text = models.TextField()
    picture = models.ImageField(upload_to='images/aboutme/', blank=True, null=True)
    order = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.id
