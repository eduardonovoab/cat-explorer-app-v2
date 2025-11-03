from rest_framework import generics, permissions
from .models import FavoriteBreed
from .serializers import FavoriteBreedSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from .cats_service import fetch_and_save_breeds
from rest_framework import status
from .models import FavoriteBreed, UserFavorite


@api_view(["POST"])
def import_breeds(request):
    user = User.objects.first()  
    fetch_and_save_breeds(user)
    return Response({"message": "Razas importadas correctamente"})



class FavoriteBreedListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = FavoriteBreedSerializer
    permission_classes = [permissions.AllowAny]  

    def get_queryset(self):
        queryset = FavoriteBreed.objects.all()
        search = self.request.query_params.get("search", "")
        available = self.request.query_params.get("available", "")
        sort = self.request.query_params.get("sort", "")

        if search:
            queryset = queryset.filter(breed_name__icontains=search)
        if available == "true":
            queryset = queryset.filter(is_available=True)
        elif available == "false":
            queryset = queryset.filter(is_available=False)
        if sort == "asc":
            queryset = queryset.order_by("created_at")
        elif sort == "desc":
            queryset = queryset.order_by("-created_at")

        return queryset
    
    
@api_view(["GET"])
def get_user_favorites(request):
    user = User.objects.first()  
    favorites = UserFavorite.objects.filter(user=user).select_related("breed")
    data = [f.breed for f in favorites]
    return Response(data)


@api_view(["POST"])
def toggle_favorite(request):
    user = User.objects.first() 
    breed_id = request.data.get("breed_id")
    try:
        breed = FavoriteBreed.objects.get(id=breed_id)
    except FavoriteBreed.DoesNotExist:
        return Response({"error": "Raza no encontrada"}, status=status.HTTP_404_NOT_FOUND)

    fav, created = UserFavorite.objects.get_or_create(user=user, breed=breed)
    if not created:
        fav.delete()
        return Response({"message": "Eliminado de favoritos"})
    return Response({"message": "Agregado a favoritos"})
