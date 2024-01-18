import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import "animate.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useNavigate } from "react-router-dom";

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledFormContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const HomePage = () => {
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  const handleLogin = () => {
    // Lógica de autenticação aqui

    // Após autenticação bem-sucedida, redirecione para a página principal
    navigate("/app");
  };

  return (
    <main>
      <StyledContainer>
        <StyledFormContainer>
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold animate__animated animate__fadeIn">
              Bem-vindo
            </h1>

            <div className="mt-4">
              <CSSTransition
                in={showLogin}
                timeout={300}
                classNames="fade"
                unmountOnExit
              >
                <LoginForm onSwitchForm={toggleForm} onLogin={handleLogin} />
              </CSSTransition>
              <CSSTransition
                in={!showLogin}
                timeout={300}
                classNames="fade"
                unmountOnExit
              >
                <RegisterForm onSwitchForm={toggleForm} />
              </CSSTransition>
            </div>
          </div>
        </StyledFormContainer>
      </StyledContainer>
    </main>
  );
};

export default HomePage;
