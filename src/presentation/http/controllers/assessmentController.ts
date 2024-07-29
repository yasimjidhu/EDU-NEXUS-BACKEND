import { Request, Response } from 'express';
import { AssessmentUseCase } from '../../../application/usecases/assessmentUseCase';

export class AssessmentController {
    
    constructor(private assessmentUseCase: AssessmentUseCase) {}

    public addAssessment = async (req: Request, res: Response): Promise<void> => {
        try {
            const assessmentData = req.body;
            const newAssessment = await this.assessmentUseCase.execute(assessmentData)
            res.status(201).json(newAssessment);
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    };
    public getAssessments = async (req: Request, res: Response): Promise<void> => {
        try {
            const instructorId = req.params.instructorId as string
            const assessments = await this.assessmentUseCase.getAssessments(instructorId)
            res.status(201).json({assessments:assessments});
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    };
    public updateAssessment = async (req: Request, res: Response): Promise<void> => {
        try {
            const assessments = await this.assessmentUseCase.updateAssessment(req.body)
            res.status(201).json({assessments:assessments});
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    };
    public getAssessment = async (req: Request, res: Response): Promise<void> => {
        try {
            console.log('get assessment reached in backend',req.params.assessmentId as string)
            const assessmentId = req.params.assessmentId as string
            const assessment = await this.assessmentUseCase.getAssessment(assessmentId)
            res.status(201).json({assessment:assessment});
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    };
}
