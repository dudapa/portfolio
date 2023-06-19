from django.contrib import admin
from .models import Contact, MyContact


class MyContactAdmin(admin.ModelAdmin):
    list_display = ('myname', 'phone', 'email')

class ContactAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'message')
    list_display_links = ('id', 'name')
    list_per_page = 25
    

admin.site.register(MyContact, MyContactAdmin)
admin.site.register(Contact, ContactAdmin)