const express = require('express');
const router = express.Router();


const userRoutes = require('./userRoutes');
const taskRoutes = require('./taskRoutes');


router.get('/', (req, res) => {
    res.send('O servidor está funcionando corretamente!');
});


const authenticationMiddleware = require('../middlewares/auth');


router.use('/users', userRoutes);
router.use('/tasks', authenticationMiddleware, taskRoutes);


module.exports = router;








