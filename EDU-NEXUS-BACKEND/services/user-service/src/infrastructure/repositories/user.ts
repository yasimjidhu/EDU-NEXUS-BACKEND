import { UserEntity } from "../../domain/entities/user";

export interface UserRepository {
  save(user: UserEntity): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity | null>;
  approve(email:string):Promise<UserEntity | null>
  reject(email:string):Promise<UserEntity | null>
  findAllInstructors():Promise<UserEntity[]>
  findAllUsers():Promise<UserEntity[]>
  blockUser(email:string):Promise<UserEntity|null>
  unBlockUser(email:string):Promise<UserEntity|null>
  getVerifiedInstructors():Promise<UserEntity[]>
  getUnVerifiedInstructors():Promise<UserEntity[]>
}
