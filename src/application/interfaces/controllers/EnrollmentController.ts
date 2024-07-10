import { Request, Response } from "express";
import { EnrollmentUseCase } from "../../usecases/enrollmentUseCase";

export class EnrollmentController {
  constructor(private enrollmentUseCase: EnrollmentUseCase) {}

  async enrollment(req: Request, res: Response): Promise<void> {
    try {
      const enrolledStudent = await this.enrollmentUseCase.enroll(req.body);
      if (!enrolledStudent) {
        res
          .status(500)
          .json({ message: "Error occurred while enrolling to the course" });
        return;
      }
    
      res
        .status(200)
        .json({ message: "successfully enrolled to the course  ", enrolledStudent });
    } catch (error: any) {
      console.log("error occured in enrollment ", error);
      res.status(500).json({ message: error.message });
    }
  }
  async checkEnrollment(req: Request, res: Response): Promise<void> {

    try {
      const { userId, courseId } = req.query;
      if (!userId || !courseId) {
        res
          .status(400)
          .json({ message: "User ID and Course ID are required" });
      }
      const studentEnrolled = await this.enrollmentUseCase.checkEnrollment(
        userId as string,
        courseId as string
      );
      if (!studentEnrolled) {
        res
          .status(500)
          .json({ message: "Error occurred while checking enrollment status" });
        return;
      }
      res.status(200).json({studentEnrolled});
    } catch (error: any) {
      console.log("error occured in enrollment verification", error);
      res.status(500).json({ message: error.message });
    }
  }
  async getStudentEnrolledCourses(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId as string
      const enrolledCourses = await this.enrollmentUseCase.getStudentEnrolledCourses(userId);
      res.status(200).json({ message: "successfully retrieved enrolled courses ", courses:enrolledCourses });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
  async updateLessonProgress(req:Request,res:Response):Promise<void>{
    try{
      console.log('updated lesson progress reached in backend',req.body)
      const {userId,courseId,lessonId,progress,totalLesson} = req.body
      const updatedLessonProgress = await this.enrollmentUseCase.updateLessonProgress(userId,courseId,lessonId,progress,totalLesson)
      res.status(200).json({ message: "successfully updated the lesson progress ", response:updatedLessonProgress });
    }catch(error:any){
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
  async updateAssessmentCompletion(req:Request,res:Response):Promise<void>{
    try{
      console.log('update assessment  reached in backend',req.body)
      const {userId,courseId} = req.body

      const updatedAssessmentCompletion = await this.enrollmentUseCase.updateAssessmentCompletion(userId,courseId)
      res.status(200).json({ message: "successfully updated the assessment progress ", data:updatedAssessmentCompletion });
    }catch(error:any){
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }

}
