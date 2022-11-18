import { Router } from 'express';
import UserController from '../Controllers/userController';

const userRoute = Router();

const controller = new UserController()

userRoute.post('/register', controller.create)

userRoute.post('/login', controller.login)

userRoute.get('/validate', controller.validate)

export default userRoute;
