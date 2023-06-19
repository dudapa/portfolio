from django.shortcuts import render, redirect
from django.http import JsonResponse
from skills.models import Skill
from projects.models import Project
from contacts.forms import ContactForm
from contacts.models import Contact, MyContact
from django.template.loader import render_to_string
from django.core.mail import EmailMessage
from django.contrib import messages


def index(request):
    skills = Skill.objects.all()
    projects = Project.objects.all()
    myinfo = MyContact.objects.get(myname='Patrik Duda')
    contact_form = ContactForm()

    context = {
        'skills': skills,
        'projects': projects,
        'myinfo': myinfo,
        'contact_form': contact_form
        
    }
    return render(request,  'index.html', context)

def proccess_message(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)

        if form.is_valid():
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            message = form.cleaned_data['message']
            contact = Contact.objects.create(
                name=name,
                email=email,
                message=message
            )
            contact.save()

            email_subject = 'Message from portfolio'
            email_message = render_to_string('message.html', {
                'name': name,
                'email': email,
                'message': message
            })
            send_email = EmailMessage(email_subject, email_message, to=['patrikduda001@gmail.com'])
            send_email.send()
            messages.success(request, 'Thank you for your message. I will response you ASAP.')
            return redirect('/#contacts')
    return redirect('index')
