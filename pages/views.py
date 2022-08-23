from django.shortcuts import render, redirect
from django.contrib import messages
from skills.models import Skill
from contacts.models import Contact

def index(request):
    skills = Skill.objects.all()
    return render(request, 'pages/index.html', {'skills': skills})

def about(request):
    return render(request, 'pages/about.html')

def contacts(request):
    return render(request, 'pages/contacts.html')

def contact(request):
    if request.method == 'POST':
        name = request.POST['name']
        email = request.POST['email']
        message = request.POST['message']
        contact = Contact()
        contact.name = name
        contact.email = email
        contact.message = message
        contact.save()
        messages.success(request, 'Your message has been submitted, I will response you ASAP')
        return redirect('/contacts/')
    