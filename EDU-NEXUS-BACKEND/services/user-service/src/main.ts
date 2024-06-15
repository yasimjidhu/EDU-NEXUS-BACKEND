import express from 'express';
import { Kafka } from 'kafkajs';
import { UserController } from './application/interface/controllers/userController';
import { AuthorizeUserUseCase } from './application/use-case/AuthorizeUser';
import { UserRepositoryimpl } from './infrastructure/repositories/UserImpl';

const app = express();
app.use(express.json());

const kafka = new Kafka({
  clientId: 'user-service',
  brokers: ['localhost:9092']
});

const userRepository = new UserRepositoryimpl();
const approveInstructorUseCase = new AuthorizeUserUseCase(userRepository);
const userController = new UserController(approveInstructorUseCase);

app.post('/approve-instructor', (req, res) => userController.approveInstructorHandler(req, res));

const consumer = kafka.consumer({ groupId: 'user-group' });

async function startKafkaConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'approve-instructor' });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const email = message.value?.toString() || '';
      await approveInstructorUseCase.execute(email);
    },
  });
}

startKafkaConsumer();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`User Service running on port ${port}`);
});
