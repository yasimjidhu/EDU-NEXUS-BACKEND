// MongoCategoryRepository.ts
import { EnrollmentEntity } from "../../domain/entities/enrollments";
import { EnrollmentRepository } from "../../domain/repositories/enrollmentRepository";
import { Enrollment } from "../database/models/enrollments"; 

export class enrollmentRepositoryImpl implements EnrollmentRepository{

    async enroll(data: EnrollmentEntity): Promise<EnrollmentEntity | null> {
        try {
            const enrollment = new Enrollment(data);
            const savedEnrollment = await enrollment.save();
            return savedEnrollment.toObject() as EnrollmentEntity;
        } catch (error) {
            console.error('Error creating enrollment:', error);
            return null
        }
    }
    async isUserEnrolled(userId: string, courseId: string): Promise<boolean> {
        try {
            const enrollment = await Enrollment.findOne({ userId, courseId });
            return enrollment !== null;
        } catch (error) {
            console.error('Error checking enrollment:', error);
            return false;
        }
    }
}
