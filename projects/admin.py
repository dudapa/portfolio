from django.contrib import admin
from .models import Project


class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'technologies', 'is_published')
    list_display_links = ('id', 'title')
    list_editable = ('is_published',)
    search_fields = ('title',)
    list_per_page = 10

admin.site.register(Project, ProjectAdmin)