import IAssessment from "../entities/assessment";

export interface AssessmentRepository{
    addAssessment(data:IAssessment):Promise<IAssessment>
    getAssessments(instructorId:string):Promise<IAssessment[]>
    updateAssessment(updateData:Partial<IAssessment>):Promise<IAssessment | null>
    getAssessment(assessmentId:string):Promise<IAssessment | null>
}