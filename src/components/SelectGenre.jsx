import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchDataByGenre } from "../store";
import { handleRegisterTheme, handleGetThemes } from "../controllers/themeController";
import { handleRegisterCategory, handleGetCategory } from "../controllers/categoryControlles";
import Modal from "react-modal";

Modal.setAppElement('#root');

function SelectGenre({ genres, type, defaultSelectedGenreId, setSelectedGenre }) {
  const dispatch = useDispatch();
  const [textValue, setTextValue] = useState("");
  const [permission, setPermission] = useState("images");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [selectedGenre, setSelectedGenreLocal] = useState(defaultSelectedGenreId);
  const [updatedGenres, setUpdatedGenres] = useState(genres);

  const isTematicasRoute = location.pathname.includes("tematicas");

  useEffect(() => {
    if (isTematicasRoute) {
      handleGetThemes().then((response) => {
        if (response.status_code === 200) {
          setUpdatedGenres(response.list);
        }
      });
    } else {
      handleGetCategory().then((response) => {
        if (response.status_code === 200) {
          setUpdatedGenres(response.list);
        }
      });
    }
  }, [isTematicasRoute]);

  const handleGenreChange = (e) => {
    const selectedGenreId = e.target.value;
    setSelectedGenreLocal(selectedGenreId); 
    setSelectedGenre(selectedGenreId); 
    dispatch(
      fetchDataByGenre({
        genres: updatedGenres,
        genre: selectedGenreId,
        type,
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isTematicasRoute) {
      const response = await handleRegisterTheme(textValue, permission);
      if (response.success) {
        setUpdatedGenres((prevGenres) => [...prevGenres, response.themes]);
        setModalMessage("Temática agregada exitosamente");
        setIsModalOpen(true);
      } else {
        setErrorMessage(response.message);
      }
    } else {
      const response = await handleRegisterCategory(textValue, permission);
      if (response.success) {
        setUpdatedGenres((prevGenres) => [...prevGenres, response.categories]);
        setModalMessage("Categoría agregada exitosamente");
        setIsModalOpen(true);
      } else {
        setErrorMessage(response.message);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate(isTematicasRoute ? "/tematicas" : "/categorias");
  };

  return (
    <Container>
      <Column>
        <h2>{isTematicasRoute ? "Lista de temáticas" : "Listar categorías"}</h2>
        <Select onChange={handleGenreChange} value={selectedGenre}>
          {updatedGenres.map((genre) => (
            <option value={genre._id} key={genre._id}>
              {genre.name}
            </option>
          ))}
        </Select>
      </Column>
      <Column>
        <h2>{isTematicasRoute ? "Agregar nueva temática" : "Agregar nueva categoría"}</h2>
        <Card>
          <form onSubmit={handleSubmit}>
            <TextInput
              type="text"
              placeholder={isTematicasRoute ? "Ingrese temática" : "Ingrese categoría"}
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
            />
            <Select
              onChange={(e) => setPermission(e.target.value)}
              value={permission}
            >
              <option value="images">Imágenes</option>
              <option value="video-url">Videos - URL YouTube</option>
              <option value="text">Documentos TXT</option>
            </Select>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <Button type="submit" disabled={!textValue}>
              Guardar
            </Button>
          </form>
        </Card>
      </Column>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Success Modal"
        style={customStyles}
      >
        <ModalContent>
          <h2>{modalMessage}</h2>
          <Button onClick={closeModal}>Cerrar</Button>
        </ModalContent>
      </Modal>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;
  width: 100%;
  box-sizing: border-box; /* Asegura que el padding no aumente el tamaño total del contenedor */
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  padding: 1rem;
  h2 {
    margin-bottom: 1rem;
  }
`;

const Select = styled.select`
  cursor: pointer;
  font-size: 1.4rem;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  padding: 0.5rem;
  border: none;
  border-radius: 0.25rem;
  width: 100%; /* Asegura que el select ocupe todo el ancho del contenedor */
`;

const TextInput = styled.input`
  font-size: 1.4rem;
  padding: 0.5rem;
  border: none;
  border-radius: 0.25rem;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  margin-bottom: 1rem;
  width: 100%; /* Asegura que el input ocupe todo el ancho del contenedor */
  &::placeholder {
    color: #aaa;
  }
`;

const Button = styled.button`
  font-size: 1.4rem;
  padding: 0.5rem 1rem;
  background-color: #6a37ff;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  &:disabled {
    background-color: rgba(106, 55, 255, 0.5);
    cursor: not-allowed;
  }
`;

const Card = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  padding: 1rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%; /* Asegura que la tarjeta ocupe todo el ancho del contenedor */
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#1f1f1f',
    border: 'none',
    borderRadius: '0.5rem',
    padding: '2rem',
    color: '#fff'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  }
};

export default SelectGenre;
