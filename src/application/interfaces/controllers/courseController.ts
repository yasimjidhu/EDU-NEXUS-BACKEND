import { Request, Response } from "express";
import { CourseUseCase } from "../../usecases/courseUseCase";

export class CourseController {
  constructor(private courseUseCase: CourseUseCase) {}

  async addCourse(req: Request, res: Response): Promise<void> {
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
  async updateCourse(req: Request, res: Response): Promise<void> {

    try {
      const course = await this.courseUseCase.updateCourse(req.body);
      if (!course) {
        res.status(500).json({ message: "Error occurred while updating the  course" });
        return;
      }
      res.status(200).json({ message: "course updated successfully", course });
    } catch (error: any) {
      console.log("error occured in update course", error);
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
      const courseId = req.params.id as string;

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
    const page = parseInt(req.query.page as string)||1
    const limit = 8

    try {
      const courses = await this.courseUseCase.getAllCourses(page,limit);
      res.status(200).json({ message: "courses retrieved successfully", courses });
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
  async getCategoryWiseCourses(req: Request, res: Response): Promise<void> {
    console.log('categorywise requeest reached in backend',req.params)
    const { categoryId } = req.params
    const page = parseInt(req.query.page as string) || 1;
    const limit = 8;
    console.log('page in controller',page)
    try {
      const { allCourses, totalCourses } = await this.courseUseCase.getCategoryWiseCourses(
        categoryId as string,
        page,
        limit
      );
      res.status(200).json({ message: "Courses retrieved successfully", allCourses, totalCourses });
    } catch (error: any) {
      console.error("Error occurred in retrieving courses:", error);
      res.status(500).json({ message: error.message });
    }
  }
  
}
