import React from 'react';
import { ListGroup, Badge, Container, Button } from 'react-bootstrap';

const TaskList = ({ tasks, onEditTask, onDeleteTask }) => {
  const handleEditClick = (task) => {
    onEditTask(task);
  };

  const handleDeleteClick = (taskId) => {
    onDeleteTask(taskId);
  };

  return (
    <Container>
      <h2>Lista de Tarefas</h2>
      {tasks.length === 0 ? (
        <p>Não há tarefas listadas.</p>
      ) : (
        <ListGroup>
          {tasks.map((task) => (
            <ListGroup.Item key={task.id}>
              <strong>{task.title}</strong>
              <p>{task.description}</p>
              <Badge bg="success">Concluída</Badge>
              <Button variant="info" className="ms-2" onClick={() => handleEditClick(task)}>
                Editar
              </Button>
              <Button variant="danger" className="ms-2" onClick={() => handleDeleteClick(task.id)}>
                Excluir
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default TaskList;
