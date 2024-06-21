import { UserEntity } from "../../domain/entities/user";
import { UserRepository } from "../../infrastructure/repositories/user";

export class AuthorizeUserUseCase{
    constructor(private userRepository:UserRepository){}

    async approveInstructor(email:string):Promise<UserEntity>{
        const approvedUser = await this.userRepository.approve(email)
        
        if(!approvedUser){
            throw new Error('User not found or could not be approved')
        }
        
        return approvedUser
    }
    async rejectInstructor(email:string):Promise<UserEntity>{
        const rejectedUser = await this.userRepository.reject(email)

        if(!rejectedUser){
            throw new Error('User not found or could not be rejected')
        }
        return rejectedUser
    }
}