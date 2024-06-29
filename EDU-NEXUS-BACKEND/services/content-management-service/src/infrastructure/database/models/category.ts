import mongoose, { model } from "mongoose";
import { CategoryEntity } from "../../../domain/entities/category";

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    isBlocked:{
        type:Boolean,
        required:false,
        default:false
    }
})

export const Category = model<CategoryEntity>("cateogories",categorySchema)