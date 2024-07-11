import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import proxy from 'express-http-proxy';
import axios from 'axios';

const app: Application = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

axios.defaults.withCredentials = true;

// Define proxies
const authProxy = proxy('http://localhost:3001', {
  proxyReqPathResolver: (req) => `/auth${req.url}`,
});
const userProxy = proxy('http://localhost:3002', {
  proxyReqPathResolver: (req) => `/user${req.url}`,
});
const notificationProxy = proxy('http://localhost:3003', {
  proxyReqPathResolver: (req) => `/notification${req.url}`,
});
const courseProxy = proxy('http://localhost:3004', {
  proxyReqPathResolver: (req) => `/course${req.url}`,
});
const paymentProxy = proxy('http://localhost:3005', {
  proxyReqPathResolver: (req) => `/payment${req.url}`,
});
const chatProxy = proxy('http://localhost:3006', {
  proxyReqPathResolver: (req) => `/chat${req.url}`,
});


// Proxy middleware
app.use('/auth', authProxy);
app.use('/user', userProxy);
app.use('/course', courseProxy);
app.use('/payment', paymentProxy);
app.use('/chat', chatProxy);
app.use('/notification', notificationProxy);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`API gateway running on port ${PORT}`);
});
