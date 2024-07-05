import CourseEntity from "../domain/entities/course";

export interface PaginatedCourse{
    allCourses:CourseEntity[];
    totalCourses:number;
}