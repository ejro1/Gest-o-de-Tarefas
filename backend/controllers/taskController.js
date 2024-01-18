// TaskList.js
import React, { useState, useEffect } from 'react';
import { ListGroup, Badge, Container, Button } from 'react-bootstrap';
import TaskForm from './TaskForm';
import api from '../services/api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);

  useEffect(() => {
    api.get('/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => console.error('Erro ao obter tarefas:', error));
  }, []);

  const handleAddTask = async (newTask) => {
    try {
      const response = await api.post('/tasks', newTask);
      setTasks([...tasks, response.data]);
      // Oculta o formulário após adicionar uma tarefa
      setShowTaskForm(false);
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };

  return (
    <Container>
      <h2>Lista de Tarefas</h2>
      {tasks.length > 0 ? (
        <ListGroup>
          {tasks.map(task => (
            <ListGroup.Item key={task.id}>
              <strong>{task.title}</strong>
              <p>{task.description}</p>
              <Badge bg="success">Concluída</Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p>Não tens tarefas listadas.</p>
      )}

      {/* Botão/link para mostrar/ocultar o formulário */}
      <Button onClick={() => setShowTaskForm(!showTaskForm)}>
        {showTaskForm ? 'Ocultar Formulário' : 'Adicionar Tarefa'}
      </Button>

      {/* Renderiza o formulário apenas se showTaskForm for true */}
      {showTaskForm && <TaskForm onAddTask={handleAddTask} />}
    </Container>
  );
};

export default TaskList;
