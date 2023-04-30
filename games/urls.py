from django.urls import path
from . import views


urlpatterns = [
     path('snake/', views.snake, name='snake'),
     path('breakout/', views.breakout, name='breakout'),
     path('spacewar/', views.spacewar, name='spacewar'),
]