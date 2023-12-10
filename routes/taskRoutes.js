// Importar o router do Express e o controlador de tarefas
const taskRoutes = require('express').Router();
const controller = require('../controllers/taskController');

// Operações CRUD para tarefas
taskRoutes.get('/', controller.getAll); // Ler todas as tarefas
taskRoutes.get('/:id', controller.getById); // Ler uma por ID (número de tarefa)
taskRoutes.get('/:category',controller.getByCategory);
taskRoutes.post('/create', controller.create); // Criar uma nova tarefa
taskRoutes.put('/update/:id', controller.update); // Atualizar tarefa
taskRoutes.delete('/delete/:id', controller.delete); // Eliminar tarefa
taskRoutes.post('/share', controller.shareTask); // Partilhar tarefa
taskRoutes.put('/favorite/:id', controller.markAsFavorite);// Marcar uma tarefa como favorita
taskRoutes.put('/categorize/:id', controller.categorizeTask);// Categorizar uma tarefa
taskRoutes.put('/priority/:id', controller.prioritizeTask);


// Exportar o router de tarefas
module.exports = taskRoutes;


