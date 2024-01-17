const userRouter = require('express').Router();
const controller = require('../controllers/userController');

userRouter.post('/signin', controller.signin);
userRouter.post('/signup', controller.signup);
userRouter.get('/users', controller.getAllUsers);
userRouter.put('/profile/:id', controller.updateProfile);
userRouter.delete('/delete/:id', controller.deleteUser);


module.exports = userRouter;