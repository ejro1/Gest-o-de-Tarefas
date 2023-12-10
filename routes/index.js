// Importar express y crear un router
const express = require('express');
const router = express.Router();

// Importar rutas y controladores
const userRoutes = require('./userRoutes');
const taskRoutes = require('./taskRoutes');


// Importar el middleware de autenticación
const authenticationMiddleware = require('../middlewares/auth');

// Aplicar el middleware de autenticación a rutas específicas
router.use('/users', authenticationMiddleware, userRoutes);
router.use('/tasks', authenticationMiddleware, taskRoutes);

// Exportar el router en lugar de app
module.exports = router;








