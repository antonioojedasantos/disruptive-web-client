import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { handleLogin } from "../controllers/authController";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onLogin = async () => {
    const response = await handleLogin(email, userName);
    if (response.success) {
      navigate("/");
    } else {
      setErrorMessage(response.message);
    }
  };

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header />
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Bienvenido</h3>
            </div>
            <div className="container flex column">
              <input
                type="text"
                placeholder="Correo"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                type="text"
                placeholder="Nombre de usuario"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
              />
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <button onClick={onLogin}>Iniciar sesión</button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    grid-template-rows: 15vh 85vh;
    .form-container {
      gap: 2rem;
      height: 85vh;
      .form {
        padding: 2rem;
        background-color: #000000b0;
        width: 25vw;
        gap: 2rem;
        color: white;
        .container {
          gap: 2rem;
          input {
            padding: 0.5rem 1rem;
            width: 15rem;
          }
          .error-message {
            color: red;
            font-size: 0.9rem;
          }
          button {
            padding: 0.5rem 1rem;
            background-color: #6a37ff;
            border: none;
            cursor: pointer;
            color: white;
            border-radius: 0.2rem;
            font-weight: bolder;
            font-size: 1.05rem;
          }
        }
      }
    }
  }
`;

export default LoginPage;
