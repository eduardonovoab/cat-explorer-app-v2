import React, { useEffect, useState } from "react";
import { FavoriteBreed } from "./types";
import { fetchFavoriteBreeds, fetchUserFavorites, toggleFavoriteBackend } from "./services/api";
import CatCard from "./components/CatCard";
import Filters from "./components/Filters";
import Tabs from "./components/Tabs";
import Modal from "./components/Modal";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState<"explorer" | "favorites">("explorer");
  const [breeds, setBreeds] = useState<FavoriteBreed[]>([]);
  const [favorites, setFavorites] = useState<FavoriteBreed[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<FavoriteBreed | null>(null);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [available, setAvailable] = useState("");
  const [sort, setSort] = useState("");

  const getBreeds = async () => {
    setLoading(true);
    try {
      const data = await fetchFavoriteBreeds(search, available, sort);
      setBreeds(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getFavorites = async () => {
    try {
      const favs = await fetchUserFavorites();
      setFavorites(favs);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getBreeds();
    getFavorites();
  }, []);

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

  const filteredBreeds = breeds.filter((b) => {
    const matchesSearch = b.breed_name.toLowerCase().includes(search.toLowerCase());
    const matchesAvailable =
      available === ""
        ? true
        : available === "true"
        ? b.is_available
        : !b.is_available;
    return matchesSearch && matchesAvailable;
  });

  return (
    <div className="app-container">
      <h1 className="app-title">🐱 Explorador de Razas</h1>

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "explorer" && (
        <>
          <Filters
            search={search}
            setSearch={setSearch}
            available={available}
            setAvailable={setAvailable}
            sort={sort}
            setSort={setSort}
          />

          {loading ? (
            <p className="loading-message">Cargando...</p>
          ) : filteredBreeds.length > 0 ? (
            <div className="breeds-grid">
              {filteredBreeds.map((b) => (
                <CatCard
                  key={b.id}
                  breed={b}
                  toggleFavorite={toggleFavorite}
                  onClick={() => setSelectedBreed(b)}
                  isFavorite={favorites.some((f) => f.id === b.id)}
                />
              ))}
            </div>
          ) : (
            <p className="empty-message">No se encontraron resultados.</p>
          )}
        </>
      )}

      {activeTab === "favorites" && (
        <>
          {favorites.length > 0 ? (
            <div className="breeds-grid">
              {favorites.map((b) => (
                <CatCard
                  key={b.id}
                  breed={b}
                  toggleFavorite={toggleFavorite}
                  onClick={() => setSelectedBreed(b)}
                  isFavorite={true}
                />
              ))}
            </div>
          ) : (
            <p className="empty-message">No tienes favoritos aún.</p>
          )}
        </>
      )}

      <Modal
        breed={selectedBreed}
        onClose={() => setSelectedBreed(null)}
        isFavorite={selectedBreed ? favorites.some((f) => f.id === selectedBreed.id) : false}
        toggleFavorite={toggleFavorite}
      />
    </div>
  );
}

export default App;