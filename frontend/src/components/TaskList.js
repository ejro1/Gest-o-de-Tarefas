import React, { useState, useEffect } from 'react';
import { ListGroup, Badge, Container } from 'react-bootstrap';
import TaskForm from './TaskForm';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // Função para obter tarefas do backend
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks');
        setTasks(response.data);
        setShowAlert(response.data.length === 0);
      } catch (error) {
        console.error('Erro ao obter tarefas:', error);
      }
    };

    // Chamar a função para buscar tarefas ao montar o componente
    fetchTasks();
  }, []);

  // Função para adicionar tarefa ao backend
  const handleAddTask = async (newTask) => {
    try {
      const response = await axios.post('http://localhost:5000/api/tasks/create', newTask);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };

  return (
    <Container>
      <h2>Lista de Tarefas</h2>
      {tasks.length === 0 && <p>Não há tarefas listadas.</p>}
      {tasks.length > 0 && (
        <ListGroup>
          {tasks.map(task => (
            <ListGroup.Item key={task.id}>
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
