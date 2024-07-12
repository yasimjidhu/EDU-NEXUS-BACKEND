import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: 'content-service',
    brokers: ['localhost:9092']
});

export const producer = kafka.producer();

