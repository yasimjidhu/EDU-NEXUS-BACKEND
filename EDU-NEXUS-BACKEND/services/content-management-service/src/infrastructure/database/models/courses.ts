import { Schema, model, Types } from "mongoose";
import CourseEntity from "../../../domain/entities/course";

const lessonSchema = new Schema({
    lessonNumber: {
        type: String,
        required: false,    
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    video: {
        type: String,
    required: true
    },
    duration: {
        type: String,
    },
    attachments: {
        title: String,
        url: String
    },

});

const trialSchema = new Schema({
    video: {
        type: String
    }
});

const courseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    instructorRef: {
        type: Types.ObjectId,
        required: true
    },
    categoryRef: {
        type: Types.ObjectId,
        required: true
    },
    language: {
        type: String,
        default: "english"
    },
    certificationAvailable:{
        type:Boolean,
        default:false
    },
    lessons: [lessonSchema],
    trial: trialSchema,
    pricing: {
        type: {
            type: String,
            enum: ["free", "paid"],
            default: "free"
        },
        amount: {
            type: Number,
            default: 0
        }
    },
    // level: {
    //     type: String,
    //     enum: ["beginner","intermediate", "expert"]
    // },
    isRequested: {
        type: Boolean,
        default: true
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    isRejected: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

courseSchema.pre("save", function (next) {
    if (this.isModified("lessons")) {
      this.lessons.forEach((lesson, index) => {
        lesson.lessonNumber = (index + 1).toString();
      });
    }
    next();
  });

export const Course = model<CourseEntity>("courses", courseSchema);