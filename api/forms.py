from django import forms
from .models import Room

class RoomForm(forms.ModelForm):
    class Meta:
        model = Room
        fields = ['host', 'guest_can_pause', 'votes_to_skip']