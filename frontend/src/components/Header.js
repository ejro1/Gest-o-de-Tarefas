// src/components/Header.js
import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import logo from '../assets/logo.png';
import '../styles/global.css';

const Header = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt="logotipo"
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          {' Gerenciador de Tarefas'}
        </Navbar.Brand>
        <Nav className="me-auto">
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
