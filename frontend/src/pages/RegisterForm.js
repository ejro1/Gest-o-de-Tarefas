import React, { useState } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const RegisterForm = ({ onSwitchForm }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegisterClick = () => {
    // Lógica de registro aqui (pode ser uma chamada a uma API, por exemplo)
    // Certifique-se de validar a senha e a confirmação da senha antes de prosseguir
  };

  return (
    <div>
      <h2 className="mb-3 animate__animated animate__fadeIn">Registro</h2>
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
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirmar Senha:
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="btn btn-success"
          onClick={handleRegisterClick}
        >
          Registrar
        </button>
      </form>
      <button className="btn btn-secondary mt-3" onClick={onSwitchForm}>
        Login
      </button>
    </div>
  );
};

export default RegisterForm;
