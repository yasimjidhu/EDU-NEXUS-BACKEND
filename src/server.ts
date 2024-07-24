import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './infrastructure/database/course-db';
import router from './application/interfaces/routes/index';
import { startEnrollmentConsumer } from './infrastructure/kafka/consumer';
import { EnrollmentRepositoryImpl } from './infrastructure/repositories/enrollmentRepositoryImpl';

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

app.use('/course', router);

connectDB().then(() => {
  // Initialize the EnrollmentRepository
  const enrollmentRepository = new EnrollmentRepositoryImpl();
  startEnrollmentConsumer(enrollmentRepository);
  console.log('enrollment consumer started')
}).then(() => {
  app.listen(3004, () => {
    console.log('content-mgt service running on port 3004');
  });
}).catch(error => {
  console.error('Error starting the service:', error);
});
