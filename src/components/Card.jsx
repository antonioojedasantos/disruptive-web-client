import React, { useState } from "react";
import styled from "styled-components";

export default React.memo(function Card({ index, movieData, isLiked = false }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={movieData.image_url}
        alt="card"
      />

      {isHovered && (
        <div className="hover">
          <div className="info-container flex column">
            <h3 className="name">{movieData.name}</h3>
            <p><strong>Tipo:</strong> {movieData.type === 'categoria' ? 'Categoría' : 'Tema'}</p>
            <p><strong>Detalle:</strong> {movieData.type_detail}</p>
            <p><strong>Permiso:</strong> {movieData.permission === 'images' ? 'Imágenes' : movieData.permission === 'video-url' ? 'Videos - URL YouTube' : 'Documentos TXT'}</p>
          </div>
          <div className="image-video-container">
            <img
              src={movieData.image_url}
              alt="card"
            />
          </div>
        </div>
      )}
    </Container>
  );
});

const Container = styled.div`
  max-width: 230px;
  width: 230px;
  height: 230px; /* Define un tamaño fijo para mantener los elementos del mismo tamaño */
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    object-fit: cover; /* Ajusta la imagen para que se muestre completamente dentro del contenedor */
  }
  .hover {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column; /* Cambiar la dirección del contenido del hover */
    z-index: 99;
    height: 100%; /* Para cubrir completamente el contenedor padre */
    box-sizing: border-box;
    overflow: hidden; /* Evitar desbordamiento */
  }

  .info-container {
    flex: 1; /* Asegura que esta parte ocupe todo el espacio disponible */
  }

  .image-video-container {
    width: 100%;
    height: 50%;
  }
`;
