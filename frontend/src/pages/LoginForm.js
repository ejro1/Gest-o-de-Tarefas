import React, { useState } from "react";
import styled from "styled-components";


const FormContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  transition: opacity 0.3s ease-in-out;
  opacity: ${(props) => (props.show ? 1 : 0)};
`;
const LoginForm = ({ onSwitchForm, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = () => {
    // Lógica de autenticação aqui (pode ser uma chamada a uma API, por exemplo)
    onLogin();
  };

  return (
    <div>
      <h2 className="mb-3 animate__animated animate__fadeIn">Login</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Usuário:
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Senha:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="btn btn-info"
          onClick={handleLoginClick}
        >
          ACESSAR
        </button>
      </form>
      <button className="btn btn-secondary mt-3" onClick={onSwitchForm}>
        Registrar
      </button>
    </div>
  );
};

export default LoginForm;
