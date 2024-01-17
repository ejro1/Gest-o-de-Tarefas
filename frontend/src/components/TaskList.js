// src/components/TaskList.js
import React, { useState } from 'react';
import { ListGroup, Badge } from 'react-bootstrap';

const TaskList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Fazer compras', description: 'Comprar alimentos e produtos essenciais' },
    { id: 2, title: 'Estudar React', description: 'Aprender React para construir aplicativos modernos' },
  ]);

  return (
    <div>
      <h2>Lista de Tarefas</h2>
      <ListGroup>
        {tasks.map(task => (
          <ListGroup.Item key={task.id}>
            <strong>{task.title}</strong>
            <p>{task.description}</p>
            <Badge bg="success">Concluída</Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default TaskList;
