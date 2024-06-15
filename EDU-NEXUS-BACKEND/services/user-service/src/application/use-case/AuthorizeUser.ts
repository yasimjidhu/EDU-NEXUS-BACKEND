import { UserEntity } from "../../domain/entities/user";
import { UserRepository } from "../../infrastructure/repositories/user";
import { sendInstructorApprovedMessage } from "../../infrastructure/kafka/kafkaProducer";

export class AuthorizeUserUseCase{
    constructor(private userRepository:UserRepository){}

    async approveInstructor(email:string):Promise<UserEntity>{
        const approvedUser = await this.userRepository.approve(email)
        
        if(!approvedUser){
            throw new Error('User not found or could not be approved')
        }
        
        await sendInstructorApprovedMessage(approvedUser)
        return approvedUser
    }
}