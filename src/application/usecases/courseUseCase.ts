// domain/usecases/createCourse.ts

import CourseEntity from "../../domain/entities/course";
import { sendMessage } from "../../infrastructure/kafka/service";
import CourseRepositoryImpl from "../../infrastructure/repositories/courseRepositoryImpl";
import { PaginatedCourse,TApproveCourse } from "../../types/course";

export class CourseUseCase  {
    constructor(private readonly courseRepository: CourseRepositoryImpl) {}

    async addCourse(course: CourseEntity): Promise<CourseEntity> {
        try {
            const createdCourse = await this.courseRepository.addCourse(course);
            return createdCourse;
        } catch (error:any) {
            throw new Error(`Failed to create course: ${error.message}`);
        }
    }
    async updateCourse(course: CourseEntity): Promise<CourseEntity> {
        try {
            const updatedCourse = await this.courseRepository.updateCourse(course);
            return updatedCourse;
        } catch (error:any) {
            throw new Error(`Failed to update course: ${error.message}`);
        }
    }
    async getAllCoursesOfInstructor(instructorId:string): Promise<CourseEntity[]> {
        try {
            const allCourses = await this.courseRepository.getAllCoursesOfInstructor(instructorId);
            return allCourses;
        } catch (error:any) {
            throw new Error(`Failed to retrieve courses: ${error.message}`);
        }
    }
    async getCourse(courseId:string): Promise<CourseEntity> {
        try {
            const course = await this.courseRepository.getCourse(courseId);
            return course;
        } catch (error:any) {
            throw new Error(`Failed to retrieve course: ${error.message}`);
        }
    }
    async getAllCourses(page:number,limit:number): Promise<PaginatedCourse> {
        try {
            const allCourses = await this.courseRepository.getAllCourses(page,limit);
            return allCourses;
        } catch (error:any) {
            throw new Error(`Failed to retrieve courses: ${error.message}`);
        }
    }
    async getUnpublishedCourses(page:number,limit:number): Promise<PaginatedCourse> {
        try {
            const unpublishedCourses = await this.courseRepository.getUnpublishedCourses(page,limit);
            return unpublishedCourses;
        } catch (error:any) {
            throw new Error(`Failed to retrieve unpublished courses: ${error.message}`);
        }
    }
    async getCategoryWiseCourses(categoryId: string,page:number,limit:number): Promise<PaginatedCourse> {
        return await this.courseRepository.getCategoryWiseCourses(categoryId,page,limit);
    }
    async approveCourse(data: TApproveCourse): Promise<CourseEntity> {
        try {
          const updatedCourse = await this.courseRepository.approveCourse(data);
          if (updatedCourse) {
            console.log(`Approving course: ${updatedCourse.title}`);
            await sendMessage({
              email: data.email,
              courseName: updatedCourse.title,
              action: 'approve',
            });
            console.log('Approval email sent:', data.email);
          }
          return updatedCourse;
        } catch (error) {
          console.error('Error approving course:', error);
          throw error;
        }
      }
    
      async rejectCourse(data: TApproveCourse): Promise<CourseEntity> {
        try {
          const updatedCourse = await this.courseRepository.rejectCourse(data);
          if (updatedCourse) {
            console.log(`Rejecting course: ${updatedCourse.title}`);
            await sendMessage({
              email: data.email,
              courseName: updatedCourse.title,
              action: 'reject',
            });
            console.log('Rejection email sent:', data.email);
          }
          return updatedCourse;
        } catch (error) {
          console.error('Error rejecting course:', error);
          throw error;
        }
      }
}
