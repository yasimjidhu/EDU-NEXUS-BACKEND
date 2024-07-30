import CourseEntity from "../domain/entities/course";

export interface PaginatedCourse{
    allCourses:CourseEntity[];
    totalCourses:number;
}

export interface TApproveCourse{
    courseId:string;
    email:string;
}
