import React, { createContext, useContext, useState, useEffect } from "react";
import { FavoriteBreed } from "../types";
import { fetchUserFavorites, toggleFavoriteBackend } from "../services/api";

interface FavoritesContextType {
  favorites: FavoriteBreed[];
  toggleFavorite: (breed: FavoriteBreed) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteBreed[]>([]);

  // Cargar favoritos desde backend al iniciar
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favs = await fetchUserFavorites();
        setFavorites(favs);
      } catch (err) {
        console.error(err);
      }
    };
    loadFavorites();
  }, []);

  // Función para agregar/quitar favorito
  const toggleFavorite = async (breed: FavoriteBreed) => {
    try {
      await toggleFavoriteBackend(breed.id);
      setFavorites((prev) => {
        const isFav = prev.find((f) => f.id === breed.id);
        if (isFav) return prev.filter((f) => f.id !== breed.id);
        return [...prev, breed];
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Hook para usar en componentes
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used within a FavoritesProvider");
  return context;
};
