from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics

from .models import Room
from .serializers import RoomSerializer

# Create your views here.
def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')

class RoomView(generics.CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
