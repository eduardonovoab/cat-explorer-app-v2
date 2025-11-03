from rest_framework import serializers
from .models import FavoriteBreed

class FavoriteBreedSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteBreed
        fields = "__all__"
