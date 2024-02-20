from django.db import models
from django.core.validators import FileExtensionValidator


class Skill(models.Model):
    name = models.CharField(max_length=128)
    image = models.FileField(upload_to='images/technologies/', validators=[FileExtensionValidator(['svg'])], blank=True, null=True)
    confident = models.BooleanField(default=True)

    def __str__(self):
        return self.name
    
    # @property
    # def calc_skill(self):
    #     return 860 - (860 * self.value) / 100

    # @property
    # def add_class(self):
    #     return f'circle circle{self.id}'

    # @property
    # def duration(self):
    #     return (2*self.value)/100