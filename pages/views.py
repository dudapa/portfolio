from django.shortcuts import render
from skills.models import Skill

def index(request):
    skills = Skill.objects.all()
    
    return render(request, 'pages/index.html', {'skills': skills})

def about(request):
    return render(request, 'pages/about.html')

def contact(request):
    return render(request, 'pages/contact.html')