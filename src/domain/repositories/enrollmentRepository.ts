import { EnrollmentEntity } from "../entities/enrollments";

    export interface EnrollmentRepository{
        enroll(data:EnrollmentEntity):Promise<EnrollmentEntity | null>;
        isUserEnrolled(userId:string,courseId:string):Promise<boolean>;
}