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
    const limit = 6

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
      const page = parseInt(req.query.page as string)||1
      const limit = 10
      const {allCourses,totalCourses} = await this.courseUseCase.getUnpublishedCourses(page,limit);

      res.status(200).json({ message: "course retrieved successfully", allCourses,totalCourses });
    } catch (error: any) {
      console.log("error occured in  course retrieval", error);
      res.status(500).json({ message: error.message });
    }
  }
  async getCategoryWiseCourses(req: Request, res: Response): Promise<void> {
    const { categoryId } = req.params
    const page = parseInt(req.query.page as string) || 1;
    const limit = 8;
  
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
  async approveCourse(req: Request, res: Response): Promise<void> {
    const { courseId } = req.params;
    const { email } = req.body;

    try {
      const updatedCourse = await this.courseUseCase.approveCourse({courseId,email});
      res.status(200).json({ message: "Course approved successfully", updatedCourse });
    } catch (error: any) {
      console.error("Error occurred in approving course:", error);
      res.status(500).json({ message: error.message });
    }
  }
  async rejectCourse(req: Request, res: Response): Promise<void> {
    const { courseId } = req.params;
    const { email } = req.body;

    try {
      await this.courseUseCase.rejectCourse({courseId,email});
      res.status(200).json({ message: "Course rejected successfully" });
    } catch (error: any) {
      console.error("Error occurred in rejecting course:", error);
      res.status(500).json({ message: error.message });
    }
  }

}
