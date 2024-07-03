import CourseEntity from "../entities/course";
import { EnrollmentEntity } from "../entities/enrollments";

export interface EnrollmentRepository {
  enroll(data: EnrollmentEntity): Promise<EnrollmentEntity | null>;
  isUserEnrolled(userId: string, courseId: string): Promise<boolean>;
  getEnrolledCourses(userId: string): Promise<CourseEntity[] | []>;
  updateLessonProgress(userId: string, courseId: string, lessonId: string, progress: number,totalLesson:number): Promise<EnrollmentEntity>
}
