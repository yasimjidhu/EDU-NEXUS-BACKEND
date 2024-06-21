import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: 'user-service',
    brokers: ['localhost:9092']
});

const producer = kafka.producer();

export const sendApprovalMessage = async (email: string, action: 'approve' | 'reject') => {
    console.log(`Sending ${action} email to notification service:`, email);
    try {
        await producer.connect();

        await producer.sendBatch({
            topicMessages: [
                {
                    topic: 'instructor-approval',
                    messages: [
                        { value: JSON.stringify({ email, action }) }
                    ]
                }
            ]
        });

        console.log(`${action} message sent successfully`, email);
    } catch (error) {
        console.error('Error sending message', error);
    } finally {
        await producer.disconnect();
    }
};
