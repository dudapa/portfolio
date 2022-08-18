from django.db import models


class Skill(models.Model):
    title = models.CharField(max_length=128)
    skill = models.IntegerField()

    def __str__(self):
        return self.title
    
    @property
    def calc_skill(self):
        return 860 - (860 * self.skill) / 100

    @property
    def add_class(self):
        return f'circle circle{self.id}'

    @property
    def duration(self):
        return (2*self.skill)/100