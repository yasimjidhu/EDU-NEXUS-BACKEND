import { UserEntity } from '../../domain/entities/user';
export class RegisterUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(request, email) {
        const date = new Date(request.dob);
        const user = new UserEntity(request.firstName, request.lastName, email, '', request.role, {
            avatar: request.profileImage,
            dateOfBirth: date,
            gender: request.gender
        }, request.gender, {
            address: request.address,
            phone: request.phone,
            social: '',
        }, request.qualification, request.cv);
        user.profit = 0;
        user.isBlocked = false;
        if (request.role === 'student') {
            user.isVerified = true;
        }
        else {
            user.isVerified = false;
        }
        user.isGAuth = false;
        user.isRejected = false;
        return await this.userRepository.save(user);
    }
}
