import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import proxy from 'express-http-proxy';

const app: Application = express();

// CORS options
const corsOptions = {
  origin: 'https://edu-nexus-frontend-kappa.vercel.app',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// Logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Request Method: ${req.method} | Request URL: ${req.originalUrl}`);
  next();
});

// Proxy options with error handling
const proxyWithErrorHandling = (target: string) =>
  proxy(target, {
    proxyReqOptDecorator: (proxyReqOpts:any) => {
      proxyReqOpts.headers['x-forwarded-host'] = proxyReqOpts.headers.host;
      proxyReqOpts.headers['x-forwarded-proto'] = 'https';
      return proxyReqOpts;
    },
    proxyErrorHandler: (err, res, next) => {
      console.error(`Error proxying to ${target}:`, err.message);
      res.status(500).json({ message: `Error communicating with ${target}` });
    },
  });

// Define service proxies
app.use('/auth', proxyWithErrorHandling('https://auth-service-new.onrender.com'));
app.use('/user', proxyWithErrorHandling('https://user-service-new.onrender.com'));
app.use('/course', proxyWithErrorHandling('https://content-service-new.onrender.com'));
app.use('/payment', proxyWithErrorHandling('https://payment-service-new-16xi.onrender.com'));
app.use('/chat', proxyWithErrorHandling('https://chat-service-hcpy.onrender.com'));
app.use('/notification', proxyWithErrorHandling('https://notification-service-new.onrender.com'));

// Start the server
const PORT = process.env.PORT || 4002;

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
