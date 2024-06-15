import express from "express";
import cors from 'cors'
import bodyParser from "body-parser";
import connectDB from "./infrastructure/database/config";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser'
import userRouter from './application/interface/routes/userRoutes'
import axios from 'axios'


dotenv.config();

const app = express();
app.use(cookieParser())


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions))

axios.defaults.withCredentials = true;

app.use("/user", userRouter);

connectDB()
  .then(() => {
    app.listen(3002, () => {
      console.log("User service running on port 3002");
    });
  })
  .catch((err:any) => {
    console.log("error occured while connecting user-db",err);
  });
