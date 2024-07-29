import { Document, Types } from "mongoose";

export interface Lesson {
    _id?:string;
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
    lessons?: Lesson[];
    pricing: Pricing;   
    level?: "beginner" | "intermediate" | "expert";
    language?:string;
    certificationAvailable: boolean;
    enrolledStudentsCount?:number;
    isRequested?: boolean;
    isBlocked?: boolean;
    isPublished?: boolean;
    isRejected?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    trial?: Trial;
}


export default CourseEntity;
