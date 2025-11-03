import requests
from django.conf import settings
from .models import FavoriteBreed
from django.contrib.auth.models import User

API_URL = "https://api.thecatapi.com/v1/breeds"

def fetch_and_save_breeds(user: User):
    headers = {"x-api-key": settings.THE_CAT_API_KEY}
    response = requests.get(API_URL, headers=headers)
    data = response.json()

    for breed in data:
        
        breed_data = {
            "temperament": breed.get("temperament", ""),
            "origin": breed.get("origin", ""),
            "life_span": breed.get("life_span", ""),
            "image": {"url": breed.get("image", {}).get("url", "")} if breed.get("image") else {},
        }

        FavoriteBreed.objects.get_or_create(
            user=user,
            breed_id=breed.get("id", ""),
            breed_name=breed.get("name", ""),
            breed_data=breed_data,
            is_available=True
        )
