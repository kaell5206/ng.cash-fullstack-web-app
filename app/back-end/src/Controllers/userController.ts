import { IUser, userSchema } from '../Interfaces/IUser';
import { Request, Response } from 'express'
import UserService from '../Services/userService';
import Token from '../Services/authService';
import AccountService from '../Services/accountService';

export default class UserController {
  public async create(req: Request & { body: IUser }, res: Response): Promise<void> {
      const { username, password } = req.body;
      const validate = await userSchema.parseAsync({ username, password })
      const { id, username: user, accountId } = await UserService.register(validate)
      const token = Token.createToken({ id, username, accountId })
      res.status(201).json({ id, username, accountId ,token })
  }

  public async login(req: Request & { body: IUser }, res: Response): Promise<void> {
    const { username, password } = req.body;
      const validate = await userSchema.parseAsync({ username, password })
      const user = await UserService.login(validate)
      const token = Token.createToken(user)
      res.status(200).json({ ...user, token })
  }

  public async validate(req: Request, res: Response): Promise<Response | void> {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token não encontrado.' });
    }
    const { id, username, accountId } = Token.readToken(authorization);
    res.status(200).json({ id, username, accountId })
  }

  public async userBalance(req: Request, res: Response): Promise<Response | void> {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token não encontrado.' });
    }
    const { accountId } = Token.readToken(authorization);
    if (!accountId) return res.status(401).json({ message: 'Token invalido' });
    const { balance } = await AccountService.getBalance(accountId)
    res.status(200).json({ balance })
  }
}