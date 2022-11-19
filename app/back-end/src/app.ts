import express from 'express';
import 'express-async-errors';
import errorMiddlewareHandler from './middlewares/errorHandlerMiddleware';
import transcRoute from './Routes/transactionRoute';
import userRoute from './Routes/userRoute';


class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.app.get('/', (req: express.Request,
      res: express.Response) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);

    this.app.use('/user', userRoute)

    this.app.use('/actions', transcRoute)

    this.app.use(errorMiddlewareHandler)
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

export const { app } = new App();
