import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import MoviePage from "./pages/Movies";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Themes from "./pages/Themes";
import UserListedMovies from "./pages/UserListedMovies";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/tematicas" element={<Themes />} />
        <Route exact path="/categorias" element={<MoviePage />} />
        <Route exact path="/contenido" element={<UserListedMovies />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
