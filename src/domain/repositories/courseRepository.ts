import CourseEntity from "../entities/course";

export interface CourseRepository {
    addCourse(course: CourseEntity): Promise<CourseEntity>;
    updateCourse(course: CourseEntity): Promise<CourseEntity>;
    getAllCoursesOfInstructor(id: string): Promise<CourseEntity[]>;
    getCourse(courseId: string): Promise<CourseEntity>;
    getAllCourses():Promise<CourseEntity[] >
    getUnpublishedCourses():Promise<CourseEntity[] >

}