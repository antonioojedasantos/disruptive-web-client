import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies } from "../store";
import SelectGenre from "../components/SelectGenre";
import Slider from "../components/Slider";
import { handleGetThemes } from "../controllers/themeController";

function TVShows() {
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.netflix.movies);
  const [genres, setGenres] = useState([]);
  const genresLoaded = genres.length > 0;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getThemes = async () => {
      const themes = await handleGetThemes();
      if (themes.status_code === 200) {
        setGenres(themes.list);
      } else {
        setGenres([]);
      }
    };

    getThemes();

  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "tv" }));
    }
  }, [dispatch, genres, genresLoaded]);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="data">
        <SelectGenre genres={genres} type="tv" />
        {movies.length ? (
          <>
            <Slider movies={movies} />
          </>
        ) : (
          <h1 className="not-available">
            Sin datos.
          </h1>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      margin-top: 4rem;
    }
  }
`;

export default TVShows;
