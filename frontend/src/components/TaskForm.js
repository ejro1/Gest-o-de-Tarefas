import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const TaskForm = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(newTask);
    // Limpar o formulário após o envio
    setNewTask({ title: '', description: '' });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formTitle">
        <Form.Label>Título da Tarefa</Form.Label>
        <Form.Control
          type="text"
          placeholder="Digite o título da tarefa"
          name="title"
          value={newTask.title}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formDescription">
        <Form.Label>Descrição da Tarefa</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Digite a descrição da tarefa"
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Button variant="success" type="submit">
        Adicionar Tarefa
      </Button>
    </Form>
  );
};

export default TaskForm;
