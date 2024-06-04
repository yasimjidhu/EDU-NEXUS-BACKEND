import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import connectDB from "./database/auth-db";
import RedisClient from "../infrastructure/database/redic-client";
import authRouter from "../application/interfaces/routes/authRoutes";
import { createClient } from "redis";
import connectRedis from "connect-redis";
import dotenv from "dotenv";
import RedisStore from "connect-redis";
import cors from 'cors'
import passport from 'passport'

dotenv.config();

const app = express();

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient
  .connect()
  .then(() => {
    console.log("Connected to Redis");
  })
  .catch((err) => {
    console.error(err);
  });

const sessionStore = new RedisStore({
  client: redisClient,
});

app.use("/auth", authRouter);

connectDB()
  .then(() => {
    app.listen(3001, () => {
      console.log("Auth service running on port 3001");
    });
  })
  .catch((err) => {
    console.log("error occured while connecting auth-db");
  });
