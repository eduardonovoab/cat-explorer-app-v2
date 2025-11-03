import { FavoriteBreed } from "../types";

const API_URL = "http://127.0.0.1:8000/api/";

export async function fetchFavoriteBreeds(
  search = "",
  available = "",
  sort = ""
): Promise<FavoriteBreed[]> {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (available) params.append("available", available);
  if (sort) params.append("sort", sort);

  const res = await fetch(`${API_URL}favorites/?${params.toString()}`);
  if (!res.ok) throw new Error("Error al obtener los datos");
  return res.json();
}

export async function fetchUserFavorites(): Promise<FavoriteBreed[]> {
  const res = await fetch(`${API_URL}user-favorites/`);
  if (!res.ok) throw new Error("Error al obtener favoritos");
  return res.json();
}

export async function toggleFavoriteBackend(breed_id: number) {
  const res = await fetch(`${API_URL}toggle-favorite/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ breed_id }),
  });
  if (!res.ok) throw new Error("Error al actualizar favorito");
  return res.json();
}
