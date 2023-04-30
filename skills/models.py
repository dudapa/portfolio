from django.db import models


class Skill(models.Model):
    name = models.CharField(max_length=128)
    value = models.IntegerField()

    def __str__(self):
        return self.name
    
    @property
    def calc_skill(self):
        return 860 - (860 * self.value) / 100

    @property
    def add_class(self):
        return f'circle circle{self.id}'

    @property
    def duration(self):
        return (2*self.value)/100