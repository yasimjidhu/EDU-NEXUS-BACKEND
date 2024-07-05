import IAssessment from "../../domain/entities/assessment";
import { Assessment } from "../database/models/assessments";
import { AssessmentRepository } from "../../domain/repositories/assessmentRepository";

export class AssessmentRepositoryImpl implements AssessmentRepository{
    async addAssessment(data: IAssessment): Promise<IAssessment> {
        const assessmentData = {
            title:data.title,
            total_score: data.total_score,
            passing_score: data.passing_score,
            course_id: data.course_id,
            instructor_id:data.instructor_id,
            assessment_type: data.assessment_type,
            questions: data.questions
        };
        const newAssessment = new Assessment(assessmentData);
        await newAssessment.save();
        return newAssessment.toObject() as IAssessment;
    }
    async getAssessments(instructorId: string): Promise<IAssessment[]> {
        try {
          const assessments = await Assessment.find({ instructor_id: instructorId }).lean().exec();
          return assessments.map(assessment => ({
            ...assessment,
            _id: assessment._id.toString(),
            course_id: assessment.course_id.toString(),
            instructor_id: assessment.instructor_id.toString(),
          })) as IAssessment[];
        } catch (error: any) {
          throw new Error(`Failed to fetch assessments: ${error.message}`);
        }
    }
    async  updateAssessment( updateData: Partial<IAssessment>): Promise<IAssessment | null> {
        try {
            const assessment = await Assessment.findOneAndUpdate(
                { _id: updateData._id },
                { $set: updateData },
                { new: true, runValidators: true }
            );
    
            if (!assessment) {
                throw new Error('Assessment not found');
            }
    
            return assessment.toObject();
        } catch (error: any) {
            throw new Error(`Failed to update assessment: ${error.message}`);
        }
    }
    async getAssessment(assessmentId: string): Promise<IAssessment | null> {
        try {
            const assessment = await Assessment.findOne({ _id: assessmentId }).lean().exec();
            console.log('assessment got',assessment)
            if (!assessment) {
                throw new Error('Assessment not found');
            }
            return {
                ...assessment,
                _id: assessment._id.toString(),
                course_id: assessment.course_id.toString(),
                instructor_id: assessment.instructor_id.toString()
            };
        } catch (error: any) {
            throw new Error(`Failed to fetch assessment: ${error.message}`);
        }
    }
    
    
}