from django import forms
from .models import Contact


class ContactForm(forms.ModelForm):
    class Meta:
        model = Contact
        fields = ['name', 'email', 'message']
        labels = {
            'name': 'Your name',
            'email': 'Your email',
            'message': 'Your message'
        }
        widgets = {
           'name': forms.TextInput(attrs={'placeholder': 'Required'}), 
           'email': forms.EmailInput(attrs={'placeholder': 'Required'}),
           'message': forms.Textarea(attrs={'placeholder': 'Type your message', 'id': 'message'}), 
        }
