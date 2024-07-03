import mongoose from 'mongoose';

const assessmentSchema = new mongoose.Schema({
  total_score: {
    type: Number,
    required: true
  },
  passing_score: {
    type: Number,
    required: true
  },
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  lesson_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  assessment_type: {
    type: String,
    required: true
  },
  questions: [{
    answer: {
      type: String,
      required: true
    },
    mark: {
      type: Number,
      required: true
    },
    options: {
      type: [String], 
      required: true
    },
    question: {
      type: String,
      required: true
    }
  }]
});

export const Assessment = mongoose.model('assessments', assessmentSchema);
