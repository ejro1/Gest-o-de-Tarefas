const express = require('express');
const router = express.Router();


const userRoutes = require('./userRoutes');
const taskRoutes = require('./taskRoutes');



const authenticationMiddleware = require('../middlewares/auth');


router.use('/users', authenticationMiddleware, userRoutes);
router.use('/tasks', authenticationMiddleware, taskRoutes);


module.exports = router;








