import mongoose, { Model } from "mongoose";
import CourseEntity from "../../domain/entities/course";
import { CourseRepository } from "../../domain/repositories/courseRepository";
import { Course } from "../database/models/courses";
import { PaginatedCourse,TApproveCourse } from "../../types/course";

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
        lessons: course.lessons,
        trial: { video: course.trial },
        pricing: { type: course.pricing.type, amount: course.pricing.amount },
        level:course.level
      });

      const createdCourse = await newCourse.save();
      console.log('created course',createdCourse)
      return createdCourse.toObject() as CourseEntity;
    } catch (error: any) {
      throw new Error(`Failed to add course: ${error.message}`);
    }
  }
  async updateCourse(course: CourseEntity): Promise<CourseEntity> {
    try {

        // Find the course by ID and update its properties
        const updatedCourse = await Course.findByIdAndUpdate(
            course.courseId,
            {
                title: course.title,
                description: course.description,
                thumbnail: course.thumbnail,
                instructorRef: course.instructorRef,
                categoryRef: course.categoryRef,
                certificationAvailable: course.certificationAvailable,
                lessons: course.lessons,
                trial: { video: course.trial },
                pricing: { type: course.pricing.type, amount: course.pricing.amount },
                level: course.level,
            },
            { new: true } 
        );

        if (!updatedCourse) {
            throw new Error('Course not found');
        }

  
        return updatedCourse.toObject() as CourseEntity;
    } catch (error: any) {
        console.error(`Error updating course: ${error.message}`, error);
        throw new Error(`Failed to update course: ${error.message}`);
    }
}
  async  getAllCoursesOfInstructor(id: string): Promise<CourseEntity[]> {
    try {
      const allCourses = await Course.find({ instructorRef: new mongoose.Types.ObjectId(id)}).exec();
      return allCourses;

    } catch (error) {
      console.error('Error retrieving courses:', error);
      throw error; 
    }
  }

  async getCourse(courseId: string): Promise<CourseEntity> {
    try {
      const course = await Course.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(courseId) } },
        {
          $lookup: {
            from: 'assessments',
            localField: '_id',
            foreignField: 'course_id',
            as: 'assessments'
          }
        },
        {
          $unwind: {
            path: '$assessments',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $group: {
            _id: '$_id',
            title: { $first: '$title' },
            description: { $first: '$description' },
            lessons: { $first: '$lessons' },
            assessments: { $push: '$assessments' },
            thumbnail: { $first: '$thumbnail' },
            trial: { $first: '$trial' },
            category: { $first: '$category' },
            categoryRef: { $first: '$categoryRef' },
            instructorRef: { $first: '$instructorRef' },
            certificationAvailable: { $first: '$certificationAvailable' },
            pricing: { $first: '$pricing' },
            level: { $first: '$level' },
            courseAmount: { $first: '$courseAmount' }
          }
        },
        {
          $project: {
            _id: 1,
            title: 1,
            description: 1,
            lessons: 1,
            assessments: {
              $filter: {
                input: '$assessments',
                as: 'assessment',
                cond: { $ne: ['$$assessment', null] }
              }
            },
            thumbnail: 1,
            trial: 1,
            category: 1,
            categoryRef: 1,
            instructorRef: 1,
            certificationAvailable: 1,
            pricing: 1,
            level: 1,
            courseAmount: 1
          }
        }
      ]).exec();
  
      if (!course || course.length === 0) {
        throw new Error(`Course with ID ${courseId} not found`);
      }
  
      return course[0] as CourseEntity;
    } catch (error) {
      console.error('Error retrieving course:', error);
      throw error;
    }
  }
  

  async  getAllCourses(page:number,limit:number): Promise<PaginatedCourse> {
    try {
      const skip = (page-1) * limit
      const allCourses = await Course.find().skip(skip).limit(limit).exec();
      const totalCourses = await Course.countDocuments()
      return {allCourses,totalCourses};
    } catch (error: any) {
      console.error("Error retrieving all courses:", error);
      throw new Error('error retrieving all courses')
    }
  }
  async  getUnpublishedCourses(page:number,limit:number): Promise<PaginatedCourse> {
    try {
      const skip = (page -1) * limit
      const allCourses = await Course.find({isPublished:false}).skip(skip).limit(limit).exec();
      const totalCourses = allCourses.length
      return {allCourses,totalCourses};
    } catch (error: any) {
      console.error("Error retrieving unpublished courses:", error);
      throw new Error('error retrieving unpublished courses')
    }
  } 
  async getCategoryWiseCourses(categoryId: string,page:number,limit:number): Promise<PaginatedCourse> {
    try {
      const skip = (page-1) * limit
      const objectid = new mongoose.Types.ObjectId(categoryId)
      const allCourses = await Course.find({ categoryRef:objectid }).skip(skip).limit(limit).exec()
      const totalCourses = await Course.countDocuments()
      return {allCourses,totalCourses}
    } catch (error:any) {
      console.error("Error retrieving category-wise courses:", error);
      throw new Error(error)
    }
  }
  async approveCourse(data:TApproveCourse): Promise<CourseEntity> {
    try {
      const objectID = new mongoose.Types.ObjectId(data.courseId)
      const result = await Course.findOneAndUpdate(
        {_id:objectID},
        {isPublished:true},
        {new:true}
      ).exec()

      if (!result) {
        throw new Error(`Course with ID ${objectID} not found`);
      }
      return result
    } catch (error:any) {
      console.error("Error approving course:", error);
      throw new Error(`Failed to approve course: ${error.message}`);
    }
  }
  async rejectCourse(data:TApproveCourse): Promise<CourseEntity> {
    try {
      const objectID = new mongoose.Types.ObjectId(data.courseId)
      const result = await Course.findOneAndUpdate(
        {_id:objectID},
        {isPublished:false},
        {new:true}
      ).exec()

      if (!result) {
        throw new Error(`Course with ID ${objectID} not found`);
      }
      return result
    } catch (error:any) {
      console.error("Error approving course:", error);
      throw new Error(`Failed to approve course: ${error.message}`);
    }
  }
}

export default CourseRepositoryImpl;
