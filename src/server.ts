import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import axios from "axios";
import proxy from 'express-http-proxy';

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

axios.defaults.withCredentials = true;

const authServiceProxy = proxy('http://localhost:3001');
const userServiceProxy = proxy('http://localhost:3002');
const notificationServiceProxy = proxy('http://localhost:3003');
const chatServiceProxy = proxy('http://localhost:3006');
const courseServiceProxy = proxy('http://localhost:3004');
const paymentServiceProxy = proxy('http://localhost:3005');

app.use('/auth', authServiceProxy);
app.use('/user', userServiceProxy);
app.use('/chat', chatServiceProxy);
app.use('/course', courseServiceProxy);
app.use('/payment', paymentServiceProxy);
app.use('/notification', notificationServiceProxy);

app.listen(4000, () => {
  console.log("API Gateway running on port 4000");
});
