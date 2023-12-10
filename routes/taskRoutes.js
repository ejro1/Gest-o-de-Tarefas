const taskRoutes = require('express').Router();
const controller = require('../controllers/taskController');


taskRoutes.get('/', controller.getAll); 
taskRoutes.get('/:id', controller.getById); 
taskRoutes.get('/:category',controller.getByCategory); 
taskRoutes.post('/create', controller.create); 
taskRoutes.put('/update/:id', controller.update); 
taskRoutes.delete('/delete/:id', controller.delete); 
taskRoutes.post('/share', controller.shareTask); 
taskRoutes.put('/favorite/:id', controller.markAsFavorite);
taskRoutes.put('/categorize/:id', controller.categorizeTask);
taskRoutes.put('/priority/:id', controller.prioritizeTask);



module.exports = taskRoutes;


