import { Kafka } from "kafkajs";
import { UserEntity } from "../../domain/entities/user";


const kafka = new Kafka({
    clientId:'user-service',
    brokers:['localhost:9092']
})

const producer = kafka.producer()

export async function sendInstructorApprovedMessage(user:UserEntity){
    await producer.send({
        topic:'instructor-approved',
        messages:[{value:JSON.stringify(user)}]
    })
}