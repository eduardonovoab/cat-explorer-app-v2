import React from "react";
import { FavoriteBreed } from "../types";
import "./Modal.css";

interface ModalProps {
  breed: FavoriteBreed | null;
  onClose: () => void;
  isFavorite: boolean;
  toggleFavorite: (breed: FavoriteBreed) => void;
}

const Modal: React.FC<ModalProps> = ({ breed, onClose, isFavorite, toggleFavorite }) => {
  if (!breed) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close-btn">
          ×
        </button>

        <div className="modal-image-container">
          <img
            src={breed.breed_data.image?.url || "/placeholder.png"}
            alt={breed.breed_name}
            className="modal-image"
          />
        </div>

        <div className="modal-body">
          <div className="modal-header">
            <div className="modal-title-section">
              <h2>{breed.breed_name}</h2>
              <p>ID: {breed.breed_id}</p>
            </div>
            <button
              onClick={() => toggleFavorite(breed)}
              className={`modal-favorite-btn ${isFavorite ? "active" : "inactive"}`}
            >
              ★
            </button>
          </div>

          <div className="modal-info-grid">
            <div className="modal-info-card temperament">
              <h3>🎭 Temperamento</h3>
              <p>{breed.breed_data.temperament || "No disponible"}</p>
            </div>

            <div className="modal-info-card origin">
              <h3>🌍 Origen</h3>
              <p>{breed.breed_data.origin || "No disponible"}</p>
            </div>

            <div className="modal-info-card lifespan">
              <h3>⏰ Esperanza de vida</h3>
              <p>{breed.breed_data.life_span || "No disponible"} años</p>
            </div>

            <div className="modal-info-card availability">
              <h3>✅ Disponibilidad</h3>
              <span className={`modal-status-badge ${breed.is_available ? "available" : "unavailable"}`}>
                {breed.is_available ? "Disponible" : "No disponible"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;