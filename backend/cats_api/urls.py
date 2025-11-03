from django.urls import path
from .views import (
    get_user_favorites,
    toggle_favorite,
    FavoriteBreedListCreateAPIView,
    import_breeds,
)

urlpatterns = [
    path("favorites/", FavoriteBreedListCreateAPIView.as_view(), name="favorite-breeds"),
    path("import-breeds/", import_breeds, name="import_breeds"),
    path("user-favorites/", get_user_favorites, name="user_favorites"),
    path("toggle-favorite/", toggle_favorite, name="toggle_favorite"),
]
