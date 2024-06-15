import { isNullOrUndefined } from "util";
import { UserEntity } from "../../domain/entities/user";
import { UserRepository } from "../../infrastructure/repositories/user";


export class ProfileUseCase{
    constructor(
        private userRepository:UserRepository){}

    async getUser(email:string):Promise<UserEntity | null>{
        let user = await this.userRepository.findByEmail(email)
        if(!user){
            throw new Error('user not found')
        }
        return user
    }
    async getAllInstructors():Promise<UserEntity[] | null>{
        let allInstructors = await this.userRepository.findAllInstructors()
        if(!allInstructors){
            return null
        }
        return allInstructors
    }
}