import { EnrollmentEntity } from "../../domain/entities/enrollments";
import { EnrollmentRepository } from "../../domain/repositories/enrollmentRepository";

export class EnrollmentUseCase{
    constructor(private readonly enrollmentRepository:EnrollmentRepository){}

    async enroll(enrollmentData: EnrollmentEntity): Promise<EnrollmentEntity | null> {
        try {
            const enrolledStudent = await this.enrollmentRepository.enroll(enrollmentData);
            return enrolledStudent;
        } catch (error:any) {
            throw new Error(`Failed to enroll to the course: ${error.message}`);
        }
    }
    async checkEnrollment(userId:string,courseId:string):Promise<boolean>{
        try{
            const studentEnrolled = await this.enrollmentRepository.isUserEnrolled(userId,courseId)
            return studentEnrolled
        }catch(error:any){
            throw new Error(error.message)
        }
    }
}