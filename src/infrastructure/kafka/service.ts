import {producer} from './producer'

export const sendMessage = async ({email,courseName,action}:{email:string,courseName:string,action:string}) => {
    console.log(`Sending ${action} email to notification service:`, email);
    try {
        await producer.connect();

        await producer.sendBatch({
            topicMessages: [
                {
                    topic: 'course-approval',
                    messages: [
                        { value: JSON.stringify({ email,courseName, action }) }
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
