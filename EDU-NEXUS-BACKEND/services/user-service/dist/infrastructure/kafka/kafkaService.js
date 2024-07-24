import { producer } from "./kafkaProducer";
export const sendBlockUserMessage = async (email) => {
    const message = { email, action: 'block' };
    console.log('block message sent to auth service', email);
    await sendMessage('user-status', message);
};
export const sendUnblockUserMessage = async (email) => {
    const message = { email, action: 'unblock' };
    console.log('unblock message sent to auth service', email);
    await sendMessage('user-status', message);
};
async function sendMessage(topic, payload) {
    try {
        await producer.connect();
        const batch = {
            topicMessages: [
                {
                    topic,
                    messages: [
                        { value: JSON.stringify(payload) }
                    ]
                }
            ]
        };
        await producer.sendBatch(batch);
        console.log(`${payload.action} message sent successfully for ${payload.email}`);
    }
    catch (error) {
        console.error('Error sending message', error);
    }
    finally {
        await producer.disconnect();
    }
}
