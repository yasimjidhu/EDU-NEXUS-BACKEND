import { Request, Response } from "express";
import { CourseUseCase } from "../../usecases/courseUseCase";
import { ParsedQs } from 'qs';

export class CourseController{
    constructor(private courseUseCase:CourseUseCase){}

    async addCourse(req:Request,res:Response):Promise<void>{
        console.log('request body of ',req.body)
        try{
            const course = await this.courseUseCase.addCourse(req.body)
            if(!course){
                res.status(500).json({ message: 'Error occurred while adding course' });
                return;
            }
            res.status(200).json({ message: 'course added successfully', course });
        } catch (error: any) {
            console.log('error occured in add course',error)
            res.status(500).json({ message: error.message });
        }
    }
    async getAllCourses(req:Request,res:Response):Promise<void>{
        
        try{
            const instructorId = req.query.instructorRef as string
            const allCourses = await this.courseUseCase.getAllCourses(instructorId)
            if(!allCourses){
                res.status(500).json({ message: 'Error occurred while fetching  allCourses' });
                return;
            }
            res.status(200).json({ message: 'course retrieved successfully', courses:allCourses });
        } catch (error: any) {
            console.log('error occured in add course',error)
            res.status(500).json({ message: error.message });
        }
    }
    async getCourse(req:Request,res:Response):Promise<void>{
        
        try{
            const courseId = req.query.courseId as string

            const course = await this.courseUseCase.getCourse(courseId)
            if(!course){
                res.status(500).json({ message: 'Error occurred while fetching  course' });
                return;
            }
            res.status(200).json({ message: 'course retrieved successfully', course:course });
        } catch (error: any) {
            console.log('error occured in add course',error)
            res.status(500).json({ message: error.message });
        }
    }
}