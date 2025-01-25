import cors from "cors";
import express, { Request, Response, Application } from "express";
import cookieParser from "cookie-parser";
import router from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
// app.use(cors({origin: 'https://localhost:5173'},));
// const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:5173', 'https://localhost:5173'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true,
};

app.use(cors(corsOptions));

// application routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send({ status: true, message: "welcome to our Bike Store Project API!" });
});

app.use(globalErrorHandler);

app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    status: false,
    message: "Route not found",
  });
});

export default app;