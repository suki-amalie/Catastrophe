from django.urls import path
from . import views

app_name = 'api'

urlpatterns = [
    path("", views.index, name="index"),
    path('create/', views.create_room, name='create_room'),
    path('join/', views.join_room, name='join_room'),
    path('room/<str:room_code>/', views.room_detail, name='room_detail'),

]