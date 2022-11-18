import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { IUser } from '../Interfaces/IUser';
import { NotFoundError } from '../Errors';

const secret = process.env.JWT_SECRET || 's3gr3d0@h1m1tsu';

export default class Token {
  public static createToken(body: IUser): string {
    const token = jwt.sign(body, secret, { expiresIn: '24h' });
    return token;
  }

  public static readToken(token: string): IUser {
    try {
      const read = jwt.verify(token, secret);
      return read as IUser
    } catch (error) {
      throw new NotFoundError('Token invalido.')
    }
  }
}