from django.db import models
from django.contrib.auth.models import User

class FavoriteBreed(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    breed_id = models.CharField(max_length=10)
    breed_name = models.CharField(max_length=100)
    breed_data = models.JSONField()
    is_available = models.BooleanField(default=True)
    last_update = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.breed_name

class UserFavorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    breed = models.ForeignKey(FavoriteBreed, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "breed")  
