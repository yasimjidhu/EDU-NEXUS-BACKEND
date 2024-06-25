import CourseEntity from "../entities/course";

export interface CourseRepository {
    addCourse(course: CourseEntity): Promise<CourseEntity>;
    getAllCourses(id: string): Promise<CourseEntity[]>;
    getCourse(courseId: string): Promise<CourseEntity>;
}