import { User } from "../database/models/User";
export class UserRepositoryImpl {
    async save(user) {
        try {
            const newUser = new User(user);
            await newUser.save();
            return newUser.toObject();
        }
        catch (error) {
            throw new Error(`Failed to save user: ${error.message}`);
        }
    }
    async findByEmail(email) {
        try {
            const user = await User.findOne({ email }).exec();
            return user ? user.toObject() : null;
        }
        catch (error) {
            throw new Error(`Failed to find user by email: ${error.message}`);
        }
    }
    async approve(email) {
        try {
            const updatedUser = await User.findOneAndUpdate({ email: email }, { $set: { isVerified: true } }, { new: true });
            return updatedUser ? updatedUser.toObject() : null;
        }
        catch (error) {
            throw new Error(`Failed to approve user: ${error.message}`);
        }
    }
    async reject(email) {
        try {
            const updatedUser = await User.findOneAndUpdate({ email: email }, { $set: { isRejected: true } }, { new: true });
            return updatedUser ? updatedUser.toObject() : null;
        }
        catch (error) {
            throw new Error(`Failed to reject user: ${error.message}`);
        }
    }
    async findAllInstructors() {
        try {
            const allInstructors = await User.find({
                role: "instructor",
                isVerified: false,
                isRejected: false,
            }).exec();
            return allInstructors.map((instructor) => instructor.toObject());
        }
        catch (error) {
            throw new Error(`Failed to find all instructors: ${error.message}`);
        }
    }
    async getVerifiedInstructors() {
        try {
            const verifiedInstructors = await User.find({
                role: "instructor",
                isVerified: true,
                isRejected: false,
            }).exec();
            return verifiedInstructors.map((instructor) => instructor.toObject());
        }
        catch (error) {
            throw new Error(`Failed to find all instructors: ${error.message}`);
        }
    }
    async getUnVerifiedInstructors() {
        try {
            const unVerifiedInstructors = await User.find({
                role: "instructor",
                isVerified: false,
                isRejected: false,
            }).exec();
            return unVerifiedInstructors.map((instructor) => instructor.toObject());
        }
        catch (error) {
            throw new Error(`Failed to find all instructors: ${error.message}`);
        }
    }
    async findAllUsers() {
        try {
            const allUsers = await User.find({
                isRejected: false,
                isVerified: true,
            }).exec();
            return allUsers.map((user) => user.toObject());
        }
        catch (error) {
            throw new Error(`Failed to find all users: ${error.message}`);
        }
    }
    async blockUser(email) {
        try {
            const blockedUser = await User.findOneAndUpdate({ email: email }, { $set: { isBlocked: true } }, { new: true });
            return blockedUser ? blockedUser.toObject() : null;
        }
        catch (error) {
            console.error(error);
            throw new Error(`Failed to block the user: ${error.message}`);
        }
    }
    async unBlockUser(email) {
        try {
            const unblockedUser = await User.findOneAndUpdate({ email: email }, { $set: { isBlocked: false } }, { new: true });
            return unblockedUser ? unblockedUser.toObject() : null;
        }
        catch (error) {
            console.error(error);
            throw new Error(`Failed to unblock the user: ${error.message}`);
        }
    }
}
