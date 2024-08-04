import { PaginatedCourse ,TApproveCourse} from "../../types/course";
import CourseEntity, { Lesson } from "../entities/course";

export interface CourseRepository {
    addCourse(course: CourseEntity): Promise<CourseEntity>;
    updateCourse(courseId:string,course: CourseEntity): Promise<CourseEntity>;
    updateLessons(courseId: string, lessons: Lesson[]): Promise<CourseEntity>
    getAllCoursesOfInstructor(id: string): Promise<CourseEntity[]>;
    getCourse(courseId: string): Promise<CourseEntity>;
    getAllCourses(page: number, limit: number, sort?: string, filters?: any):Promise<PaginatedCourse>
    getUnpublishedCourses(page:number,limit:number):Promise<PaginatedCourse >
    getCategoryWiseCourses(categoryId: string,page:number,limit:number,sort?:any,filters?:any):Promise<PaginatedCourse>
    approveCourse(data:TApproveCourse):Promise<CourseEntity>
    rejectCourse(data:TApproveCourse):Promise<CourseEntity>
}