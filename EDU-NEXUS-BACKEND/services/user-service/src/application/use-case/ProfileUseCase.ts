
import { UserEntity } from "../../domain/entities/user";
import { UserRepository } from "../../infrastructure/repositories/user";


export class ProfileUseCase{
    constructor(
        private userRepository:UserRepository){}

    async getUser(email:string):Promise<UserEntity | null>{
        const user = await this.userRepository.findByEmail(email)
        if(!user){
            throw new Error('user not found')
        }
        return user
    }
    async getAllInstructors():Promise<UserEntity[] | null>{
        const allInstructors = await this.userRepository.findAllInstructors()
        if(!allInstructors){
            return null
        }
        return allInstructors
    }
    async getAllUsers():Promise<UserEntity[] | null>{
        const allUsers = await this.userRepository.findAllUsers()
        if(!allUsers){
            return null
        }
        return allUsers
    }
    async blockUser(email:string):Promise<UserEntity | null>{
        const blockedUser = await this.userRepository.blockUser(email)
        if(!blockedUser){
            return null
        }
        return blockedUser
    }
    async unBlockUser(email:string):Promise<UserEntity | null>{
        const unBlockedUser = await this.userRepository.unBlockUser(email)
        if(!unBlockedUser){
            return null
        }
        return unBlockedUser
    }
}