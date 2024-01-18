import React, { useState } from 'react';
import Header from '../components/Header';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { Container, Row, Col } from 'react-bootstrap';

const HomePage = () => {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div>
      <Header />
      <Container>
        <Row className="mt-4">
          <Col md={6}>
            <h2>Adicionar Tarefa</h2>
            <TaskForm onAddTask={handleAddTask} />
          </Col>
          <Col md={6}>
            <TaskList tasks={tasks} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
