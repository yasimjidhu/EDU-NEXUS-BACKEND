import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import router from './presentation/routes/chatRoutes';

dotenv.config();

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(express.json());
app.use('/chat', router);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // socket.on('sendMessage', async (message) => {
  //   const savedMessage = await ChatUseCase.sendMessage(message);
  //   io.to(message.conversationId).emit('receiveMessage', savedMessage);
  // });

  socket.on('joinRoom', (conversationId) => {
    socket.join(conversationId);
  });
});

const PORT = 3006;
app.listen(PORT, () => {
  console.log(`chat server running on port ${PORT}`);
});
