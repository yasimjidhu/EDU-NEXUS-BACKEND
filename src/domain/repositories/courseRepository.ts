import { PaginatedCourse ,TApproveCourse} from "../../types/course";
import CourseEntity from "../entities/course";

export interface CourseRepository {
    addCourse(course: CourseEntity): Promise<CourseEntity>;
    updateCourse(course: CourseEntity): Promise<CourseEntity>;
    getAllCoursesOfInstructor(id: string): Promise<CourseEntity[]>;
    getCourse(courseId: string): Promise<CourseEntity>;
    getAllCourses(skip:number,limit:number):Promise<PaginatedCourse>
    getUnpublishedCourses(page:number,limit:number):Promise<PaginatedCourse >
    getCategoryWiseCourses(categoryId: string,page:number,limit:number):Promise<PaginatedCourse>
    approveCourse(data:TApproveCourse):Promise<CourseEntity>
    rejectCourse(data:TApproveCourse):Promise<CourseEntity>
}