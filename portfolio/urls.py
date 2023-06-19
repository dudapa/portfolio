from decouple import config
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .  import views


urlpatterns = [
    path(config('ADMIN_PANEL'), admin.site.urls),
    path('', views.index, name='index'),
    path('proccess_message/', views.proccess_message, name='proccess-message'),
    path('games/', include('games.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
