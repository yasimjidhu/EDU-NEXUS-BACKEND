import { UserRepository } from "./user";
import { UserEntity } from "../../domain/entities/user";
import { User } from "../database/models/User";

export class UserRepositoryimpl implements UserRepository {
  async save(user: UserEntity): Promise<UserEntity> {
    const newUser = new User(user);
    await newUser.save();
    return newUser.toObject() as UserEntity;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await User.findOne({ email }).exec();
    return user ? (user.toObject() as UserEntity) : null;
  }
  async approve(email: string): Promise<UserEntity | null> {
    console.log('email in repo',email)
    const updatedUser = await User.findOneAndUpdate(
      {email:email},
      {$set:{isVerified:true}},
      {new:true}
    )
    console.log('updated user',updatedUser)
    return updatedUser ? (updatedUser.toObject()as UserEntity) : null
  }

  async findAllInstructors(): Promise<UserEntity[]> {
    const allInstructors = await User.find({ role: 'instructor' }).exec();
    return allInstructors.map(instructor => instructor.toObject() as UserEntity);
  }
}
