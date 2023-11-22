// Importar express y crear un router
const express = require('express');
const router = express.Router();

// Importar rutas y controladores
const taskRoutes = require('./taskRoutes');
const authRouter = require('./auth');

// Importar el middleware de autenticación
const authenticationMiddleware = require('../middlewares/auth');

// Aplicar el middleware de autenticación a rutas específicas
router.use('/tasks', authenticationMiddleware, taskRoutes);
router.use('/auth', authRouter);

// Exportar el router en lugar de app
module.exports = router;








