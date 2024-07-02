import { Document, Types } from "mongoose";

interface Lesson {
    lessonNumber: string;
    title: string;
    description: string;
    video: string;
    duration?: string;
    attachments:Attachments[]
}



interface Pricing {
    type: "free" | "paid";
    amount: number;
}

interface Attachments {
    title?: string;
    url?: string;
}

interface Trial {
    video?: string;
}

interface CourseEntity extends Document {
    courseId?:string;
    title: string;
    description: string;
    thumbnail: string;
    instructorRef: Types.ObjectId;
    category: string;
    categoryRef: Types.ObjectId;
    lessons: Lesson[];
    pricing: Pricing;
    level?: "beginner" | "intermediate" | "expert";
    certificationAvailable: boolean;
    isRequested: boolean;
    isBlocked: boolean;
    isPublished: boolean;
    isRejected: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    language?: string;
    trial?: Trial;
}


export default CourseEntity;
