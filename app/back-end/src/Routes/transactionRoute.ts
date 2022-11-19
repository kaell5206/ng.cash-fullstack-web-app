import { Router } from "express";
import TransactionController from "../Controllers/transactionController";

const transcRoute = Router();

transcRoute.post("/transaction", TransactionController.createTransaction);
transcRoute.get("/transaction", TransactionController.findAllTransactions);


export default transcRoute;
