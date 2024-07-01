import { Request, Response } from "express";
import { CourseUseCase } from "../../usecases/courseUseCase";

export class CourseController {
  constructor(private courseUseCase: CourseUseCase) {}

  async addCourse(req: Request, res: Response): Promise<void> {
    console.log("request body of ", req.body);
    try {
      const course = await this.courseUseCase.addCourse(req.body);
      if (!course) {
        res.status(500).json({ message: "Error occurred while adding course" });
        return;
      }
      res.status(200).json({ message: "course added successfully", course });
    } catch (error: any) {
      console.log("error occured in add course", error);
      res.status(500).json({ message: error.message });
    }
  }
  async getAllCoursesOfInstructor(req: Request, res: Response): Promise<void> {
    try {

      const instructorId = req.params.instructorId as string
      const allCourses = await this.courseUseCase.getAllCoursesOfInstructor(
        instructorId
      );
      if (!allCourses) {
        res
          .status(500)
          .json({ message: "Error occurred while fetching  allCourses" });
      }
      res.status(200).json({
        message: "course retrieved successfully",
        courses: allCourses,
      });
    } catch (error: any) {
      console.log("error occured in add course", error);
      res.status(500).json({ message: error.message });
    }
  }
  async getCourse(req: Request, res: Response): Promise<void> {
    try {
      console.log('req.params',req.params)
      const courseId = req.params.id as string;
      console.log('course id got',courseId)

      const course = await this.courseUseCase.getCourse(courseId);
      if (!course) {
        res
          .status(500)
          .json({ message: "Error occurred while fetching  course" });
        return;
      }
      res
        .status(200)
        .json({ message: "course retrieved successfully", course: course });
    } catch (error: any) {
      console.log("error occured in  course retrieval", error);
      res.status(500).json({ message: error.message });
    }
  }

  async getAllCourses(req: Request, res: Response): Promise<void> {
    try {
      const courses = await this.courseUseCase.getAllCourses();
      res
        .status(200)
        .json({ message: "courses retrieved successfully", courses: courses });
    } catch (error: any) {
      console.log("error occured in retrieve courses", error);
      res.status(500).json({ message: error.message });
    }
  }

  async getUnpublishedCourses(req: Request, res: Response): Promise<void> {
    try {

      const allUnpublishedCourses = await this.courseUseCase.getUnpublishedCourses();
      if (!allUnpublishedCourses) {
        res
          .status(500)
          .json({ message: "Error occurred while fetching  course" });
        return;
      }
      res
        .status(200)
        .json({ message: "course retrieved successfully", courses: allUnpublishedCourses });
    } catch (error: any) {
      console.log("error occured in  course retrieval", error);
      res.status(500).json({ message: error.message });
    }
  }

}
