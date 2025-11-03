from django.contrib import admin
from .models import FavoriteBreed

@admin.register(FavoriteBreed)
class FavoriteBreedAdmin(admin.ModelAdmin):
    list_display = ("id", "breed_name", "user", "is_available", "created_at")
    search_fields = ("breed_name", "breed_id")
    list_filter = ("is_available",)
