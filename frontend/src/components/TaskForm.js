import React from 'react';
import { Form, Button } from 'react-bootstrap';

const TaskForm = () => {
  return (
    <Form>
      <Form.Group controlId="formTitle">
        <Form.Label>Título da Tarefa</Form.Label>
        <Form.Control type="text" placeholder="Digite o título da tarefa" />
      </Form.Group>
      <Form.Group controlId="formDescription">
        <Form.Label>Descrição da Tarefa</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="Digite a descrição da tarefa" />
      </Form.Group>
      <Button variant="success" type="submit">
        Adicionar Tarefa
      </Button>
    </Form>
  );
};

export default TaskForm;
