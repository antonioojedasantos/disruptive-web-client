import React from "react";
import styled from "styled-components";
import CardSlider from "./CardSlider";

export default function Slider({ movies }) {
  const groupedMovies = movies.reduce((acc, movie) => {
    if (!acc[movie.type_detail]) {
      acc[movie.type_detail] = [];
    }
    acc[movie.type_detail].push(movie);
    return acc;
  }, {});

  return (
    <Container>
      {Object.keys(groupedMovies).map((category) => (
        <CardSlider key={category} data={groupedMovies[category]} category={category} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
