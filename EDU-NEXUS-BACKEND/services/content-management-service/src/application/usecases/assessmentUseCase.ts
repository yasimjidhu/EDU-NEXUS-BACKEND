// application/use-cases/AddAssessment.ts
import IAssessment from "../../domain/entities/assessment";
import { AssessmentRepository } from "../../domain/repositories/assessmentRepository";

export class AssessmentUseCase {
    private assessmentRepository: AssessmentRepository;

    constructor(assessmentRepository: AssessmentRepository) {
        this.assessmentRepository = assessmentRepository;
    }

    async execute(data: IAssessment): Promise<IAssessment> {
        return this.assessmentRepository.addAssessment(data);
    }
    async getAssessments(instructorId:string):Promise<IAssessment[]>{
        return this.assessmentRepository.getAssessments(instructorId)
    }
    async updateAssessment(updateData:Partial<IAssessment>):Promise<IAssessment|null>{
        return this.assessmentRepository.updateAssessment(updateData)
    }
    async getAssessment(assessmentId:string):Promise<IAssessment |null>{
        return this.assessmentRepository.getAssessment(assessmentId)
    }
}
