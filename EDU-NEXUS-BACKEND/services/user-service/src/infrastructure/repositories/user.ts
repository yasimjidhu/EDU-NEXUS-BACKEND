import { UserEntity } from "../../domain/entities/user";

export interface UserRepository {
  save(user: UserEntity): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity | null>;
  approve(email:string):Promise<UserEntity | null>
  findAllInstructors():Promise<UserEntity[]>
}
