import React from 'react';
import Header from '../components/Header';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { Container, Row, Col } from 'react-bootstrap';

const HomePage = () => {
  return (
    <div>
      <Header />
      <Container>
        <Row className="mt-4">
          <Col md={6}>
            <h2>Adicionar Tarefa</h2>
            <TaskForm />
          </Col>
          <Col md={6}>
            <TaskList />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
