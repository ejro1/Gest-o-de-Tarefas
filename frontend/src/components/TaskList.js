import React from 'react';
import { ListGroup, Badge, Container } from 'react-bootstrap';

const TaskList = ({ tasks }) => {
  return (
    <Container>
      <h2>Lista de Tarefas</h2>
      {tasks.length === 0 ? (
        <p>Não há tarefas listadas.</p>
      ) : (
        <ListGroup>
          {tasks.map((task, index) => (
            <ListGroup.Item key={index}>
              <strong>{task.title}</strong>
              <p>{task.description}</p>
              <Badge bg="success">Concluída</Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default TaskList;
