import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { handleRegister } from "../controllers/authController";

function Signup() {
  const [errorMessage, setErrorMessage] = useState("");
  const [formValues, setFormValues] = useState({
    email: "",
    user_name: "",
    type_user: "reader", 
  });
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const { email, user_name, type_user } = formValues;
      const response = await handleRegister(email, user_name, type_user);
      if (response.success) {
        navigate("/");
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header login />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>¡Únete a Disruptive y descubre un nuevo mundo de contenido multimedia!</h1>
          </div>
          <div className="form flex column">
            <input
              type="email"
              placeholder="Correo"
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
              name="email"
              value={formValues.email}
            />
            <input
              type="text"
              placeholder="Nombre de usuario"
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
              name="user_name"
              value={formValues.user_name}
            />
              <label>
                <input
                  type="radio"
                  value="reader"
                  name="type_user"
                  checked={formValues.type_user === "reader"}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      type_user: e.target.value,
                    })
                  }
                />
                Lector
              </label>
              <label>
                <input
                  type="radio"
                  value="creator"
                  name="type_user"
                  checked={formValues.type_user === "creator"}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      type_user: e.target.value,
                    })
                  }
                />
                Creador
              </label>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button onClick={handleSignUp}>Registrarme</button>
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
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .body {
      gap: 1rem;
      .text {
        gap: 1rem;
        text-align: center;
        font-size: 2rem;
        h1 {
          padding: 0 25rem;
        }
      }
      .form {
        display: grid;
        gap: 1rem;
        width: 60%;
        }
        input {
          color: black;
          border: none;
          padding: 1.5rem;
          font-size: 1.2rem;
          border: 1px solid black;
          &:focus {
            outline: none;
          }
        }
        button {
          padding: 0.5rem 1rem;
          background-color: #6A37FF;
          border: none;
          cursor: pointer;
          color: white;
          font-weight: bolder;
          font-size: 1.05rem;
        }
      }
      button {
        padding: 0.5rem 1rem;
        background-color: #6A37FF;
        border: none;
        cursor: pointer;
        color: white;
        border-radius: 0.2rem;
        font-weight: bolder;
        font-size: 1.05rem;
      }
    }
  }
`;

export default Signup;
