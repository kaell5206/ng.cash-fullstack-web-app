import { IUserBody } from '../Interfaces/IUser';
import { Request, Response } from 'express'
import UserService from '../Services/userService';

export default class UserController {
  public async create(req: Request & { body: IUserBody }, res: Response): Promise<void> {
    try {
      console.log(req.body);
    const { username, password } = req.body;
    const newUser = { username, password, accountId: 1 };
    const add = await UserService.create(newUser)
    res.status(200).json(add)
    } catch (error) {
      console.log(error);
      
    }
  }
}