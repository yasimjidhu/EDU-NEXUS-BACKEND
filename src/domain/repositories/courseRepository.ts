import { PaginatedCourse } from "../../types/course";
import CourseEntity from "../entities/course";

export interface CourseRepository {
    addCourse(course: CourseEntity): Promise<CourseEntity>;
    updateCourse(course: CourseEntity): Promise<CourseEntity>;
    getAllCoursesOfInstructor(id: string): Promise<CourseEntity[]>;
    getCourse(courseId: string): Promise<CourseEntity>;
    getAllCourses(skip:number,limit:number):Promise<PaginatedCourse>
    getUnpublishedCourses():Promise<CourseEntity[] >
    getCategoryWiseCourses(categoryId: string,page:number,limit:number):Promise<PaginatedCourse>
}