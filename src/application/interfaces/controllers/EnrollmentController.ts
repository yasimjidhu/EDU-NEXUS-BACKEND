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
    console.log("request query of checkenrollment ", req.query);

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
}
