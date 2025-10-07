import mongoose from "mongoose";
import { Schema } from "mongoose";

const notesSchema = new Schema({
    owner:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    isDone:{
        type:Boolean,
        default:false
    },
    dueDate:{
        type:Date,
        default:null
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export const Note = mongoose.model("Notes",notesSchema);