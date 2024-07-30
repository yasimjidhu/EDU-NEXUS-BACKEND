import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';
import { EnrollmentRepository } from '../../domain/repositories/enrollmentRepository';

interface EnrollmentEvent {
  type: string;
  payload: any;
}

const kafka = new Kafka({
  clientId: 'content-management-service',
  brokers: ['localhost:9092']
});

let consumer: Consumer;
let isRunning: boolean = false;

async function handleEnrollmentMessage(message: EachMessagePayload['message'], enrollmentRepository: EnrollmentRepository): Promise<void> {
  const eventData: EnrollmentEvent = JSON.parse(message.value!.toString());
  if (eventData.type === 'ENROLLMENT_CREATED') {
    console.log('Enrollment created message received', eventData.payload);
    await enrollmentRepository.enroll(eventData.payload);
    console.log('enrollment completed')
  }
}

export async function startEnrollmentConsumer(enrollmentRepository: EnrollmentRepository): Promise<void> {
  consumer = kafka.consumer({ groupId: 'enrollment-group' });

  try {
    console.log('Starting enrollment consumer...');
    await consumer.connect();
    await consumer.subscribe({ topic: 'enrollment-events', fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
        await handleEnrollmentMessage(message, enrollmentRepository);
      },
    });

    isRunning = true;
    console.log('Enrollment consumer started');
  } catch (error) {
    console.error('Error starting enrollment consumer:', error);
  }
}

export async function stopEnrollmentConsumer(): Promise<void> {
  try {
    console.log('Stopping enrollment consumer...');
    if (consumer) {
      await consumer.disconnect();
    }
    isRunning = false;
    console.log('Enrollment consumer stopped');
  } catch (error) {
    console.error('Error stopping enrollment consumer:', error);
  }
}

export function isEnrollmentConsumerRunning(): boolean {
  return isRunning;
}

// Graceful shutdown
const shutdown = async () => {
  await stopEnrollmentConsumer();
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
