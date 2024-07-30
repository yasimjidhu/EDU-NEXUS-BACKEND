
interface Question {
  answer: string;
  mark: number;
  options: string[];
  question: string;
}

interface IAssessment  {
  _id?:string;
  title:string;
  total_score: number;
  passing_score: number;
  course_id: string;
  instructor_id:string;
  assessment_type: string;
  questions: Question[];
}

export default IAssessment;
