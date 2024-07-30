import CourseEntity from "../../domain/entities/course";
import { EnrollmentEntity } from "../../domain/entities/enrollments";
import { EnrollmentRepository } from "../../domain/repositories/enrollmentRepository";
import { UserServiceClient } from "../../infrastructure/grpc/userClient";

export class EnrollmentUseCase{
    constructor(private readonly enrollmentRepository:EnrollmentRepository,
        private userServiceClient:UserServiceClient
    ){}

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
    async getStudentEnrolledCourses(userId: string): Promise<CourseEntity[] | []> {
        try {
            const enrolledCourses = await this.enrollmentRepository.getEnrolledCourses(userId);
            return enrolledCourses;
        } catch (error:any) {
            throw new Error(`Failed to fetch enrolled course: ${error.message}`);
        }
    }
    async updateLessonProgress (userId: string, courseId: string, lessonId: string, progress: number,totalLesson:number) {
        return await this.enrollmentRepository.updateLessonProgress(userId,courseId,lessonId,progress,totalLesson);
    };
    async updateAssessmentCompletion(userId: string, courseId: string) {
        return await this.enrollmentRepository.updateAssessmentCompletion(userId,courseId);
    };
    async getEnrolledInstructorsRefs(userId:string):Promise<any[]>{
        const instructorIds =  await  this.enrollmentRepository.enrolledInstructorRefs(userId)
        console.log('instructors id got and made the  grpc call',instructorIds)
        return this.userServiceClient.getInstructors(instructorIds)
    }
}