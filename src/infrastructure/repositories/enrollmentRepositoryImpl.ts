// MongoCategoryRepository.ts
import CourseEntity from "../../domain/entities/course";
import { EnrollmentEntity } from "../../domain/entities/enrollments";
import { EnrollmentRepository } from "../../domain/repositories/enrollmentRepository";
import { Enrollment } from "../database/models/enrollments";
import { Course } from "../database/models/courses";
import mongoose from "mongoose";

export class EnrollmentRepositoryImpl implements EnrollmentRepository {
  async enroll(data: EnrollmentEntity): Promise<EnrollmentEntity | null> {
    try {
      const enrollment = new Enrollment(data);
      const savedEnrollment = await enrollment.save();
      return savedEnrollment.toObject() as EnrollmentEntity;
    } catch (error) {
      console.error("Error creating enrollment:", error);
      return null;
    }
  }
  async isUserEnrolled(userId: string, courseId: string): Promise<boolean> {
    try {
      const enrollment = await Enrollment.findOne({ userId, courseId });
      return enrollment !== null;
    } catch (error) {
      console.error("Error checking enrollment:", error);
      return false;
    }
  }
  async getEnrolledCourses(userId: string): Promise<CourseEntity[] | []> {
    try {
      const userObjectId = new mongoose.Types.ObjectId(userId);

      const matchingEnrollments = await Enrollment.find({
        userId: userObjectId,
      });

      const enrolledCourses = await Enrollment.aggregate([
        { $match: { userId: userObjectId } },
        {
          $lookup: {
            from: "courses",
            localField: "courseId",
            foreignField: "_id",
            as: "courseDetails",
          },
        },
        { $unwind: "$courseDetails" },
        {
          $replaceRoot: { newRoot: "$courseDetails" },
        },
      ]).exec();

      return enrolledCourses as CourseEntity[];
    } catch (error) {
      console.error("Error fetching enrollment data:", error);
      return [];
    }
  }
  async  updateLessonProgress(userId: string, courseId: string, lessonId: string, progress: number, totalLesson: number): Promise<EnrollmentEntity> {

    const enrollment = await Enrollment.findOne({ userId, courseId }).exec();
    if (!enrollment) {
      throw new Error('Enrollment not found');
    }
  
    // Initialize progress if it is not already defined
    if (!enrollment.progress) {
      enrollment.progress = {
        completedLessons: [],
        overallCompletionPercentage: 0,
      };
    }
  
    // Initialize completedLessons if it is null or undefined
    if (!enrollment.progress.completedLessons) {
      enrollment.progress.completedLessons = [];
    }
  
    const lessonObjectId = new mongoose.Types.ObjectId(lessonId);
  
    // Add lessonId to completedLessons if progress > 0 and it's not already included
    if (progress > 0 && !enrollment.progress.completedLessons.includes(lessonObjectId)) {
      enrollment.progress.completedLessons.push(lessonObjectId);
    }
    
    console.log('total lesson',totalLesson)
    console.log('enrollment completed lesson length',enrollment.progress.completedLessons.length)
    // Calculate the overallCompletionPercentage
    enrollment.progress.overallCompletionPercentage = (enrollment.progress.completedLessons.length / totalLesson) * 100;
    
    if(enrollment.progress.overallCompletionPercentage < 100){
        enrollment.completionStatus = 'in-progress'
    }else{
        enrollment.completionStatus = 'completed'
    }
    // Save the updated enrollment document
    await enrollment.save();
    console.log('updated enrollment',enrollment)
    // Return the updated enrollment as EnrollmentEntity
    return enrollment.toObject() as EnrollmentEntity;
  }
  async  updateAssessmentCompletion(userId: string, courseId: string): Promise<EnrollmentEntity | null> {
    try {
      const updatedCompletion = await Enrollment.findOneAndUpdate(
        { userId: userId, courseId: courseId },
        { $set: { assessmentCompleted: true } },
        { new: true }
      ) as EnrollmentEntity | null; 
      console.log('assessmentCompletion updated',updatedCompletion)
  
      return updatedCompletion;
    } catch (error: any) {
      console.log('Error occurred while updating the assessment completion', error);
      return null;
    }
  }
  async  enrolledInstructorRefs(userId: string): Promise<any[]> {
    const enrolledInstructors = await Enrollment.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(userId) }
      },
      {
        $lookup: {
          from: 'courses',
          localField: 'courseId',
          foreignField: '_id',
          as: 'course'
        }
      },
      {
        $unwind: '$course'
      },
      {
        $group: {
          _id: null,
          instructorRefs: { $addToSet: '$course.instructorRef' }
        }
      },
      {
        $project: {
          _id: 0,
          instructorRefs: 1
        }
      }
    ]);
    console.log('enrolled instructors',enrolledInstructors)
    return enrolledInstructors[0]?.instructorRefs || [];
  }
}
