import { sendBlockUserMessage, sendUnblockUserMessage } from "../../infrastructure/kafka/kafkaService";
export class ProfileUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getUser(email) {
        console.log('user email is ', email);
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('user not found');
        }
        return user;
    }
    async getAllInstructors() {
        const allInstructors = await this.userRepository.findAllInstructors();
        if (!allInstructors) {
            return null;
        }
        return allInstructors;
    }
    async getVerifiedInstructors() {
        const verifiedInstructors = await this.userRepository.getVerifiedInstructors();
        if (!verifiedInstructors) {
            return null;
        }
        return verifiedInstructors;
    }
    async getUnVerifiedInstructors() {
        const unVerifiedInstructors = await this.userRepository.getUnVerifiedInstructors();
        if (!unVerifiedInstructors) {
            return null;
        }
        return unVerifiedInstructors;
    }
    async getAllUsers() {
        const allUsers = await this.userRepository.findAllUsers();
        if (!allUsers) {
            return null;
        }
        return allUsers;
    }
    async blockUser(email) {
        const blockedUser = await this.userRepository.blockUser(email);
        if (!blockedUser) {
            return null;
        }
        await sendBlockUserMessage(email);
        return blockedUser;
    }
    async unBlockUser(email) {
        const unBlockedUser = await this.userRepository.unBlockUser(email);
        if (!unBlockedUser) {
            return null;
        }
        await sendUnblockUserMessage(email);
        return unBlockedUser;
    }
}
