from django.db import models
import uuid

def get_random_code(length):
    code = str(uuid.uuid4())[:length].replace('-', '').lower()
    return code

def generate_unique_code():
    while True:
        code = get_random_code(8)
        if Room.objects.filter(code=code).count() == 0:
            break
    return code


# Create your models here.
class Room(models.Model):
    code = models.CharField(max_length=8, default="", unique=True)
    host = models.CharField(max_length=64, unique=True) #name of host
    pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)

