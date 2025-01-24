import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
const app = express();

// Middleware parsers
app.use(express.json());
app.use(cors());

// Application routes
app.use('/api', router);
app.get('/', (req: Request, res: Response) => {
  res.send("welcome to out bike store API!");
});

export default app;
