// domain/usecases/createCourse.ts

import CourseEntity from "../../domain/entities/course";
import CourseRepositoryImpl from "../../infrastructure/repositories/courseRepositoryImpl";


export class CourseUseCase  {
    constructor(private readonly courseRepository: CourseRepositoryImpl) {}

    async addCourse(course: CourseEntity): Promise<CourseEntity> {
        try {
            console.log('course in usecase',course)
            const createdCourse = await this.courseRepository.addCourse(course);
            return createdCourse;
        } catch (error:any) {
            throw new Error(`Failed to create course: ${error.message}`);
        }
    }
    async getAllCourses(instructorId:string): Promise<CourseEntity[]> {
        try {
            console.log('instructorId in usecase',instructorId)
            const allCourses = await this.courseRepository.getAllCourses(instructorId);
            return allCourses;
        } catch (error:any) {
            throw new Error(`Failed to retrieve courses: ${error.message}`);
        }
    }
    async getCourse(courseId:string): Promise<CourseEntity> {
        try {
            console.log('courseId in usecase',courseId)
            const course = await this.courseRepository.getCourse(courseId);
            return course;
        } catch (error:any) {
            throw new Error(`Failed to retrieve course: ${error.message}`);
        }
    }
}
