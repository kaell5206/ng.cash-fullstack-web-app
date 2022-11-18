import { IUser, userSchema } from '../Interfaces/IUser';
import { Request, Response } from 'express'
import UserService from '../Services/userService';
import Token from '../Services/authService';

export default class UserController {
  public async create(req: Request & { body: IUser }, res: Response): Promise<void> {
      const { username, password } = req.body;
      const validate = await userSchema.parseAsync({ username, password })
      const createUser = await UserService.register(validate)
      const token = Token.createToken(createUser)
      res.status(201).json({ token })
  }

  public async login(req: Request & { body: IUser }, res: Response): Promise<void> {
    const { username, password } = req.body;
      const validate = await userSchema.parseAsync({ username, password })
      const user = await UserService.login(validate)
      const token = Token.createToken(user)
      res.status(200).json({ token })
  }
}