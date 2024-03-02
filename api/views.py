from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse
from rest_framework import generics

from .models import Room
from .forms import RoomForm
from .serializers import RoomSerializer

# Create your views here.
def index(request):
    return render(request, 'api/index.html')

def create_room(request):
    if request.method == 'POST':
        form = RoomForm(request.POST)
        if form.is_valid():
            room = form.save()
            return redirect('room_detail', room_code=room.code)
    else:
        form = RoomForm()

    return render(request, 'api/create_room.html', {'form': form})

def room_detail(request, room_code):
    room = get_object_or_404(Room, code=room_code)
    return render(request, 'api/room_detail.html', {'room': room})

def join_room(request):
    if request.method == 'POST':
        room_code = request.POST["room_code"]
        return redirect("room_detail", room_code=room_code)
    return redirect("index")

class CreateRoomView(generics.CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
