import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useDispatch } from "react-redux";
import { fetchMovies } from "../store";
import SelectGenre from "../components/SelectGenre";
import Slider from "../components/Slider";
import { handleGetThemes } from "../controllers/themeController";
import { handleGetContent } from "../controllers/contentController";

function Themes() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [content, setContent] = useState([]);
  const [genres, setGenres] = useState([]);

  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const genresLoaded = genres.length > 0;
  const dispatch = useDispatch();

  useEffect(() => {
    const getThemes = async () => {
      const themes = await handleGetThemes();
      if (themes.status_code === 200) {
        setGenres(themes.list);
        setSelectedGenreId(themes.list.length > 0 ? themes.list[0]._id : null);
      } else {
        setGenres([]);
        setSelectedGenreId(null);
      }
    };

    const getContents = async () => {
      const contents = await handleGetContent({ type: "tematica" });
      if (contents.status_code === 200) {
        setContent(contents.list);
      } else {
        setContent([]);
      }
    };

    getThemes();
    getContents();
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
        <SelectGenre
          genres={genres}
          type="tv"
          defaultSelectedGenreId={selectedGenreId} 
          setSelectedGenre={(genreId) => setSelectedGenreId(genreId)}
        />
        {content.length ? (
          <>
            <Slider movies={content} />
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

export default Themes;
