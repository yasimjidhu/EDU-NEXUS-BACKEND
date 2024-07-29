import mongoose, { Model } from "mongoose";
import CourseEntity from "../../domain/entities/course";
import { CourseRepository } from "../../domain/repositories/courseRepository";
import { Course } from "../database/models/courses";
import { PaginatedCourse,TApproveCourse } from "../../types/course";
import { Lesson } from "../../domain/entities/course";

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
        level:course.level,
        language:course.language
      });

      const createdCourse = await newCourse.save();

      return createdCourse.toObject() as CourseEntity;
    } catch (error: any) {
      throw new Error(`Failed to add course: ${error.message}`);
    }
  }
  async updateCourse(courseId:string,course: CourseEntity): Promise<CourseEntity> {
    try {

        // Find the course by ID and update its properties
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                title: course.title,
                description: course.description,
                thumbnail: course.thumbnail,
                instructorRef: course.instructorRef,
                categoryRef: course.categoryRef,
                certificationAvailable: course.certificationAvailable,
                trial: { video: course.trial },
                pricing: { type: course.pricing.type, amount: course.pricing.amount },
                level: course.level,
                language:course.language
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

  async updateLessons(courseId: string, lessons: Lesson[]): Promise<CourseEntity> {
    try {
        const course = await Course.findById(courseId);

        if (!course) {
            throw new Error('Course not found');
        }

        if (course.lessons && course.lessons.length > 0) {
            // Update each lesson by its ID
            lessons.forEach((updatedLesson) => {
                const lessonIndex = course.lessons!.findIndex(l => l._id?.toString() === updatedLesson._id);
                if (lessonIndex === -1) {
                    throw new Error(`Lesson with ID ${updatedLesson._id} not found`);
                }
                // Update the properties of the lesson
                course.lessons![lessonIndex] = updatedLesson;
            });

            const updatedCourse = await course.save();
            return updatedCourse.toObject() as CourseEntity;
        } else {
            throw new Error('No lessons to update');
        }

    } catch (error: any) {
        console.error(`Error updating lessons: ${error.message}`, error);
        throw new Error(`Failed to update lessons: ${error.message}`);
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
          $lookup:{
            from:'enrollments',
            localField:'_id',
            foreignField:'courseId',
            as:'enrollments'
          }
        },
        {
          $group: {
            _id: '$_id',
            title: { $first: '$title' },
            description: { $first: '$description' },
            lessons: { $first: '$lessons' },
            assessments: { $push: '$assessments' },
            enrollments:{$first:'$enrollments'},
            enrolledStudentsCount:{$sum:{$size:'$enrollments'}},
            thumbnail: { $first: '$thumbnail' },
            trial: { $first: '$trial' },
            category: { $first: '$category' },
            categoryRef: { $first: '$categoryRef' },
            instructorRef: { $first: '$instructorRef' },
            certificationAvailable: { $first: '$certificationAvailable' },
            pricing: { $first: '$pricing' },
            level: { $first: '$level' },
            language:{$first:'$language'},
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
            enrolledStudentsCount:1,
            thumbnail: 1,
            trial: 1,
            category: 1,
            categoryRef: 1,
            instructorRef: 1,
            certificationAvailable: 1,
            pricing: 1,
            level: 1,
            language:1,
            courseAmount: 1
          }
        }
      ]).exec();
  
      if (!course || course.length === 0) {
        throw new Error(`Course with ID ${courseId} not found`);
      }
      console.log('course data',course[0])
  
      return course[0] as CourseEntity;
    } catch (error) {
      console.error('Error retrieving course:', error);
      throw error;
    }
  }

  async getAllCourses(page: number, limit: number, sort?: string, filters?: any): Promise<PaginatedCourse> {
    try {
        const skip = (page - 1) * limit;

        // Build the match stage for filtering
        const matchStage: any = {};
        if (filters?.price) {
            const [minPrice, maxPrice] = filters.price.split('-');
            matchStage['pricing.amount'] = {
                $gte: Number(minPrice),
                ...(maxPrice !== '+' && { $lte: Number(maxPrice) })
            }
        }

        if (filters?.level) {
            matchStage.level = filters.level
        }

        let sortStage: any = { _id: 1 }; // Default sort
        if (sort) {
            const [field, order] = sort.split('_');
            if (field === 'price') {
                sortStage = { 'pricing.amount': order === 'asc' ? 1 : -1 };
            } else {
                sortStage = { [field]: order === 'asc' ? 1 : -1 };
            }
        }

        // Aggregation pipeline
        const aggregationPipeline = [
            { $match: matchStage },
            {
                $lookup: {
                    from: 'enrollments',
                    localField: '_id',
                    foreignField: 'courseId',
                    as: 'enrollments'
                }
            },
            {
                $addFields: {
                    enrolledStudentsCount: { $size: '$enrollments' }
                }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    description: 1,
                    lessons: 1,
                    assessments: 1,
                    thumbnail: 1,
                    trial: 1,
                    category: 1,
                    categoryRef: 1,
                    instructorRef: 1,
                    certificationAvailable: 1,
                    pricing: 1,
                    level: 1,
                    language: 1,
                    enrolledStudentsCount: 1
                }
            },
            { $sort: sortStage },
            { $skip: skip },
            { $limit: limit }
        ];

        const allCourses = await Course.aggregate(aggregationPipeline).exec();

        // Count total courses with applied filters
        const totalCourses = await Course.countDocuments(matchStage);

        return { allCourses, totalCourses };

    } catch (error: any) {
        console.error("Error retrieving all courses:", error);
        throw new Error('Error retrieving all courses');
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
  async  getCategoryWiseCourses(
    categoryId: string,
    page: number,
    limit: number,
    sort?: string,
    filters?: { price?: string; level?: string }
  ): Promise<PaginatedCourse> {
    try {
      const skip = (page - 1) * limit;
      const objectid = new mongoose.Types.ObjectId(categoryId);
      
      // Match stage for filters
      const matchStage: any = { categoryRef: objectid };
      if (filters?.price) {
        const [minPrice, maxPrice] = filters.price.split('-');
        matchStage['pricing.amount'] = {
          $gte: Number(minPrice),
          ...(maxPrice != '+' && { $lte: Number(maxPrice) }),
        };
      }
  
      if (filters?.level) {
        matchStage.level = filters.level;
      }
  
      // Sort stage
      let sortStage: any = { _id: 1 };
      if (sort) {
        const [field, order] = sort.split('_');
        const sortOrder = order === 'asc' ? 1 : -1;
        if (field === 'price') {
          sortStage = { 'pricing.amount': sortOrder };
        } else {
          sortStage = { [field]: sortOrder };
        }
      }
  
      // Aggregation pipeline to fetch category-wise courses with enrolled students count
      const allCourses = await Course.aggregate([
        { $match: matchStage },
        {
          $lookup: {
            from: 'enrollments',
            localField: '_id',
            foreignField: 'courseId',
            as: 'enrollments',
          },
        },
        {
          $addFields: {
            enrolledStudentsCount: { $size: '$enrollments' },
          },
        },
        {
          $project: {
            _id: 1,
            title: 1,
            description: 1,
            lessons: 1,
            assessments: 1,
            thumbnail: 1,
            trial: 1,
            category: 1,
            categoryRef: 1,
            instructorRef: 1,
            certificationAvailable: 1,
            pricing: 1,
            level: 1,
            language: 1,
            courseAmount: 1,
            enrolledStudentsCount: 1,
          },
        },
        { $sort: sortStage },
        { $skip: skip },
        { $limit: limit },
      ]).exec();
  
      const totalCourses = await Course.countDocuments(matchStage);
  
      return { allCourses, totalCourses };
    } catch (error: any) {
      console.error("Error retrieving category-wise courses:", error);
      throw new Error('Error retrieving category-wise courses');
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
