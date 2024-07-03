import { Schema, model, Document, Types } from "mongoose";

export interface EnrollmentEntity extends Document {
  userId: Types.ObjectId;
  courseId: Types.ObjectId;
  enrolledAt: Date;
  completionStatus: 'enrolled' | 'in-progress' | 'completed';
  progress: {
    completedLessons: Types.ObjectId[];
    completedAssessments: Types.ObjectId[];
    overallCompletionPercentage: number;
  };
}

const enrollmentSchema = new Schema<EnrollmentEntity>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "courses",
    required: true,
  },
  enrolledAt: {
    type: Schema.Types.Date,
    default: Date.now,
  },
  completionStatus: {
    type: String,
    enum: ['enrolled', 'in-progress', 'completed'],
    default: 'enrolled',
  },
  progress: {
    completedLessons: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
    completedAssessments: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
    overallCompletionPercentage: {
      type: Number,
      default: 0,
    },
  },
});

export const Enrollment = model<EnrollmentEntity>("enrollments", enrollmentSchema);
