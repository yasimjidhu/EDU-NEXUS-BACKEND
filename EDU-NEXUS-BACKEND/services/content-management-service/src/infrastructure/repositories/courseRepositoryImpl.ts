import { Model } from "mongoose";
import CourseEntity from "../../domain/entities/course";
import { CourseRepository } from "../../domain/repositories/courseRepository";
import { Course } from "../database/models/courses";

class CourseRepositoryImpl implements CourseRepository {
  private readonly courseModel: Model<CourseEntity>;

  constructor() {
    this.courseModel = Course as Model<CourseEntity>;
  }

  async addCourse(course: CourseEntity): Promise<CourseEntity> {
    try {
      const newCourse = new Course({
        title: course.title,
        description: course.description,
        thumbnail: course.thumbnail,
        instructorRef: course.instructorRef,
        categoryRef: course.categoryRef,
        certificationAvailable: course.certificationAvailable,
        lessons: course.lessons[course.lessons.length - 1],
        trial: { video: course.trial },
        pricing: course.pricing,
      });

      const createdCourse = await newCourse.save();

      console.log("course created in repository", createdCourse);
      return createdCourse.toObject() as CourseEntity;
    } catch (error: any) {
      throw new Error(`Failed to add course: ${error.message}`);
    }
  }
  async  getAllCourses(id: string): Promise<CourseEntity[]> {
    try {
      const allCourses = await Course.find({ instructorRef: id }).exec();
      return allCourses;

    } catch (error) {
      console.error('Error retrieving courses:', error);
      throw error; 
    }
  }
  async getCourse(courseId: string): Promise<CourseEntity> {
    try {
      const course = await Course.findById(courseId).exec();
      if (!course) {
        throw new Error(`Course with ID ${courseId} not found`);
      }
      return course.toObject() as CourseEntity;
    } catch (error) {
      console.error('Error retrieving course:', error);
      throw error;
    }
  }
  
  
}

export default CourseRepositoryImpl;
