from django.contrib import admin
from .models import Skill


class SkillAdmin(admin.ModelAdmin):
    list_display = ('title', 'skill')

admin.site.register(Skill, SkillAdmin)
