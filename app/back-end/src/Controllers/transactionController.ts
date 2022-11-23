import { Request, Response } from "express";
import Token from "../Services/authService";
import { ITransacBody } from "../Interfaces/ITransaction";
import TransactionService from "../Services/transactionService";

export default class TransactionController {
  public static async createTransaction(req: Request & { body: ITransacBody},
     res: Response): Promise<Response | void> {
      const { authorization } = req.headers;
      const { creditedUser } = req.body;
      const value = Number(req.body.value)
      if (!authorization) {
        return res.status(401).json({ message: 'Token não encontrado.' });
    }
      const { accountId } = Token.readToken(authorization)
      const transac = await TransactionService.create({ creditedUser, value }, Number(accountId))
      res.status(201).json(transac)
  }

  public static async findAllTransactions(req: Request & { body: ITransacBody},
    res: Response): Promise<Response | void> { 
      try {
        const { authorization } = req.headers;
      if (!authorization) {
        return res.status(401).json({ message: 'Token não encontrado.' });
      }
      const { accountId } = Token.readToken(authorization);
      const findAll = await TransactionService.findAll(Number(accountId));
      res.status(200).json(findAll)
      } catch (error) {
        return res.status(400).json({ message: "Algo deu errado." })
    }
  }
}