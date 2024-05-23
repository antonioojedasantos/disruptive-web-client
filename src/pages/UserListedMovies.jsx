import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { handleGetCategory } from "../controllers/categoryControlles";
import { handleGetThemes } from "../controllers/themeController";
import { handleRegisterContent } from "../controllers/contentController";
import Modal from "react-modal";

Modal.setAppElement('#root'); 

export default function UserListedMovies() {
  const [isScrolled, setIsScrolled] = useState(false);

  const [name, setName] = useState("");
  const [categoryOrTheme, setCategoryOrTheme] = useState("categoria");
  const [categories, setCategories] = useState([]);
  const [themes, setThemes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (categoryOrTheme === "categoria") {
      const getCategories = async () => {
        const categories = await handleGetCategory();
        if (categories.status_code === 200) {
          setCategories(categories.list);
        } else {
          setCategories([]);
        }
      };
      getCategories();
    } else if (categoryOrTheme === "tematica") {
      const getThemes = async () => {
        const themes = await handleGetThemes();
        if (themes.status_code === 200) {
          setThemes(themes.list);
        } else {
          setThemes([]);
        }
      };
      getThemes();
    }
  }, [categoryOrTheme]);

  const handleCategoryOrThemeChange = (e) => {
    setCategoryOrTheme(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await handleRegisterContent(
        name,
        categoryOrTheme,
        selectedCategory,
        selectedTheme,
        imageUrl
      );
      if (response.success) {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.log(error);
    }

    setName("");
    setCategoryOrTheme("categoria");
    setSelectedCategory("");
    setSelectedTheme("");
    setImageUrl("");
  };

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="content flex column">
        <h1>Agregar Contenido</h1>
        <FormContainer>
          <h2>Agregar nuevo contenido</h2>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Nombre del contenido"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <RadioContainer>
              <label>
                <input
                  type="radio"
                  value="categoria"
                  checked={categoryOrTheme === "categoria"}
                  onChange={handleCategoryOrThemeChange}
                />
                Categoría
              </label>
              <label>
                <input
                  type="radio"
                  value="tematica"
                  checked={categoryOrTheme === "tematica"}
                  onChange={handleCategoryOrThemeChange}
                />
                Temática
              </label>
            </RadioContainer>
            {categoryOrTheme === "categoria" && (
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                required
              >
                <option value="">Selecciona una categoría</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            )}
            {categoryOrTheme === "tematica" && (
              <Select
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value)}
                required
              >
                <option value="">Selecciona una temática</option>
                {themes.map((theme) => (
                  <option key={theme._id} value={theme._id}>
                    {theme.name}
                  </option>
                ))}
              </Select>
            )}
            <Input
              type="text"
              placeholder="URL de la imagen"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
            <Button type="submit">Guardar</Button>
          </form>
        </FormContainer>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Success Modal"
          style={customStyles}
        >
          <ModalContent>
            <h2>Contenido agregado exitosamente</h2>
            <Button onClick={closeModal}>Cerrar</Button>
          </ModalContent>
        </Modal>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
  }
`;

const FormContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 0.5rem;
  margin-top: 2rem;
  h2 {
    margin-bottom: 1rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 0.25rem;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  &::placeholder {
    color: #aaa;
  }
`;

const RadioContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  label {
    display: flex;
    align-items: center;
    input {
      margin-right: 0.5rem;
    }
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 0.25rem;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  cursor: pointer;
`;

const Button = styled.button`
  width: 100%;
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

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    margin-bottom: 1rem;
  }
`;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    padding: '2rem',
    textAlign: 'center'
  },
};
