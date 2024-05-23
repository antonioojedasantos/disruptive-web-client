import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/home.jpg";
import Slider from "../components/Slider";
import MoreInfoCard from "../components/MoreInfoCard";

import { handleGetThemes } from "../controllers/themeController";
import { handleGetContent } from "../controllers/contentController";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import { AiOutlineInfoCircle } from "react-icons/ai";

function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [content, setContent] = useState([]);
  const [genres, setGenres] = useState([]);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const [showMoreInfo, setShowMoreInfo] = useState(false); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("user")) navigate("/login");
    dispatch(getGenres());
  }, [dispatch, navigate]);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "all" }));
    }
  }, [dispatch, genres, genresLoaded]);

  useEffect(() => {
    const getThemes = async () => {
      const themes = await handleGetThemes();
      if (themes.status_code === 200) {
        setGenres(themes.list);
      } else if (themes.status_code === 401) {
        navigate("/");
      } else {
        setGenres([]);
      }
    };

    const getContents = async () => {
      const contents = await handleGetContent();
      if (contents.status_code === 200) {
        setContent(contents.list);
      } else {
        setContent([]);
      }
    };

    getThemes();
    getContents();
  }, [navigate]);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const handleMoreInfoClick = () => {
    setShowMoreInfo(true);
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="hero">
        <img src={backgroundImage} alt="background" className="background-image" />
        <div className="container">

          <div className="buttons flex">

            <button className="flex j-center a-center" onClick={handleMoreInfoClick}>
              <AiOutlineInfoCircle />
              More Info
            </button>
          </div>
        </div>
      </div>
      <Slider movies={content} />
      {showMoreInfo && <MoreInfoCard onClose={() => setShowMoreInfo(false)} />}
    </Container>
  );
}

const Container = styled.div`
  background-color: black;
  .hero {
    position: relative;
    .background-image {
      filter: brightness(60%);
    }
    img {
      height: 100vh;
      width: 100vw;
    }
    .container {
      position: absolute;
      bottom: 5rem;
      .logo {
        img {
          width: 100%;
          height: 100%;
          margin-left: 5rem;
        }
      }
      .buttons {
        margin: 5rem;
        gap: 2rem;
        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border: none;
          cursor: pointer;
          transition: 0.2s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1.8rem;
            }
          }
        }
      }
    }
  }
`;

export default Home;
