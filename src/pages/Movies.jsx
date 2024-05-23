import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies } from "../store";
import SelectGenre from "../components/SelectGenre";
import Slider from "../components/Slider";
import NotAvailable from "../components/NotAvailable";
import { handleGetCategory } from "../controllers/categoryControlles"; 
import { handleGetContent } from "../controllers/contentController";

function MoviePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [content, setContent] = useState([]);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const [genres, setGenres] = useState([]);
  const [selectedGenreId, setSelectedGenreId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const getCategories = async () => {
      const categories = await handleGetCategory();
      if (categories.status_code === 200) {
        setGenres(categories.list);
        setSelectedGenreId(categories.list.length > 0 ? categories.list[0]._id : null);
      } else {
        setGenres([]);
        setSelectedGenreId(null);
      }
    };

    const getContents = async () => {
      const contents = await handleGetContent({ type: "categoria" });
      if (contents.status_code === 200) {
        setContent(contents.list);
      } else {
        setContent([]);
      }
    };
    getContents();
    getCategories();
  }, []);

  useEffect(() => {
    if (genresLoaded && selectedGenreId) {
      dispatch(fetchMovies({ genres, type: "movie" }));
    }
  }, [dispatch, genres, genresLoaded, selectedGenreId]);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset !== 0);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>
      <div className="data">
        <SelectGenre
          genres={genres}
          type="movie"
          defaultSelectedGenreId={selectedGenreId}
          setSelectedGenre={setSelectedGenreId}
        />
        {content.length ? <Slider movies={content} /> : <NotAvailable />}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;

export default MoviePage;
