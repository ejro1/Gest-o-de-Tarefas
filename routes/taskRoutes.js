// Importar el enrutador de Express y el controlador de tareas
const taskRoutes = require('express').Router();
const controller = require('../controllers/taskController');

// Operaciones CRUD para estudiantes
taskRoutes.get('/', controller.getAll); // Leer todos los estudiantes
taskRoutes.get('/:number', controller.getById); // Leer uno por su ID (número de estudiante)
taskRoutes.post('/create', controller.create); // Crear un nuevo estudiante
taskRoutes.put('/update', controller.update); // Actualizar estudiante
taskRoutes.delete('/delete/:number', controller.delete); // Eliminar estudiante

// Exportar el enrutador de estudiantes
module.exports = taskRoutes;
