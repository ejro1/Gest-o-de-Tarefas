import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const TaskForm = ({ onAddTask, onUpdateTask, selectedTask }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    category: '', 
  });

  useEffect(() => {
    if (selectedTask) {
      setTask({ ...selectedTask });
    }
  }, [selectedTask]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.title.trim() === '' || task.description.trim() === '' || task.category.trim() === '') {
      alert('Por favor, preencha título, descrição e categoria.');
      return;
    }

    if (selectedTask) {
      onUpdateTask(task);
    } else {
      onAddTask(task);
    }
    setTask({ title: '', description: '', category: '' });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formTitle">
        <Form.Label>Título da Tarefa</Form.Label>
        <Form.Control
          type="text"
          placeholder="Digite o título da tarefa"
          name="title"
          value={task.title}
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
          value={task.description}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formCategory">
        <Form.Label>Categoria</Form.Label>
        <Form.Control
          type="text"
          placeholder="Digite a categoria da tarefa"
          name="category"
          value={task.category}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Button variant="success" type="submit">
        {selectedTask ? 'Atualizar Tarefa' : 'Adicionar Tarefa'}
      </Button>
    </Form>
  );
};

export default TaskForm;
