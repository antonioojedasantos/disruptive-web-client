import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { getUsersLikedMovies } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { handleGetCategory } from "../controllers/categoryControlles";
import { handleGetThemes } from "../controllers/themeController";

export default function UserListedMovies() {
  const movies = useSelector((state) => state.netflix.movies);

  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);
  const [email, setEmail] = useState(undefined);

  const [name, setName] = useState("");
  const [categoryOrTheme, setCategoryOrTheme] = useState("categoria");
  const [categories, setCategories] = useState([]);
  const [themes, setThemes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (email) {
      dispatch(getUsersLikedMovies(email));
    }
  }, [dispatch, email]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      name,
      categoryOrTheme,
      selectedCategory: categoryOrTheme === "categoria" ? selectedCategory : null,
      selectedTheme: categoryOrTheme === "tematica" ? selectedTheme : null,
      imageUrl,
    });

    

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

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="content flex column">
        <h1>My List</h1>
        <div className="grid flex">
          {movies.map((movie, index) => {
            return (
              <Card
                movieData={movie}
                index={index}
                key={movie.id}
                isLiked={true}
              />
            );
          })}
        </div>
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
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
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
