// src/components/Header.js
import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import logo from '../assets/logo.png';
import '../styles/styles.css'; // Importe o arquivo de estilos

const Header = () => {
  return (
    <Navbar className="custom-header" variant="dark">
      <Container>
        <div className="custom-logo-container">
          <Navbar.Brand href="#home">
            <img
              alt="logotipo"
              src={logo}
              width="150"  
              height="150"
              className="d-inline-block align-top"
            />
            {' Gerenciador de Tarefas'}
          </Navbar.Brand>
        </div>
        <Nav className="me-auto">
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
