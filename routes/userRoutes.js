const userRouter = require('express').Router();
const controller = require('../controllers/userController');

userRouter.post('/signup', controller.signup);
userRouter.post('/signin', controller.signin);
userRouter.get('/users', controller.getAllUsers);
userRouter.put('/profile/:id', controller.updateProfile); 
userRouter.delete('/delete/:id', controller.deleteUser);

module.exports = userRouter;
