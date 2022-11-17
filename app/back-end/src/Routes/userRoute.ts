import { Router } from 'express';
import UserController from '../Controllers/userController';
import UserService from '../Services/userService';

const userRoute = Router();

const controller = new UserController()

userRoute.post('/register', controller.create)

export default userRoute;
