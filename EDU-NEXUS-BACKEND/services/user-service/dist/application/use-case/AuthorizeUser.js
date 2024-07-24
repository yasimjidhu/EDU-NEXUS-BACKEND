import { sendInstructorApprovalMessage } from "../../infrastructure/kafka/kafkaProducer";
export class AuthorizeUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async approveInstructor(email) {
        const approvedUser = await this.userRepository.approve(email);
        if (!approvedUser) {
            throw new Error('User not found or could not be approved');
        }
        await sendInstructorApprovalMessage(email, "approve");
        return approvedUser;
    }
    async rejectInstructor(email) {
        const rejectedUser = await this.userRepository.reject(email);
        if (!rejectedUser) {
            throw new Error('User not found or could not be rejected');
        }
        await sendInstructorApprovalMessage(email, "reject");
        return rejectedUser;
    }
}
