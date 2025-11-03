import React from "react";
import { FavoriteBreed } from "../types";
import "./CatCard.css";

interface CatCardProps {
  breed: FavoriteBreed;
  toggleFavorite?: (breed: FavoriteBreed) => void;
  onClick?: () => void;
  isFavorite?: boolean;
}

const CatCard: React.FC<CatCardProps> = ({ breed, toggleFavorite, onClick, isFavorite }) => {
  return (
    <div className="cat-card" onClick={onClick}>
      <div className="cat-card-image-container">
        <img
          src={breed.breed_data.image?.url || "/placeholder.png"}
          alt={breed.breed_name}
          className="cat-card-image"
        />
      </div>

      <div className="cat-card-content">
        <div className="cat-card-header">
          <h3 className="cat-card-title">{breed.breed_name}</h3>
          {toggleFavorite && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(breed);
              }}
              className={`cat-card-favorite-btn ${isFavorite ? "active" : "inactive"}`}
            >
              ★
            </button>
          )}
        </div>
        
        <p className="cat-card-id">ID: {breed.breed_id}</p>
        
        <p className={`cat-card-status ${breed.is_available ? "available" : "unavailable"}`}>
          {breed.is_available ? "✓ Disponible" : "✗ No disponible"}
        </p>
      </div>
    </div>
  );
};

export default CatCard;