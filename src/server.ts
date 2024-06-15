import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors'

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));

const authServiceProxy = createProxyMiddleware({
  target: 'http://localhost:3001', 
  changeOrigin: true,
});

const userServiceProxy = createProxyMiddleware({
  target:'http://localhost:3002',
  changeOrigin: true,
})


app.use('/auth', authServiceProxy);
app.use('/user',userServiceProxy)


app.listen(4000, () => {
  console.log('API Gateway running on port 4000');
});
