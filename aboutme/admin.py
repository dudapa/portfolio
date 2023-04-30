from django.contrib import admin
from .models import Title, Paragraph

class TitleAdmin(admin.ModelAdmin):
    list_display = ('name', 'order')

class ParagraphAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'order')

admin.site.register(Title, TitleAdmin)
admin.site.register(Paragraph, ParagraphAdmin)

