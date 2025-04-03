import mongoose from "mongoose";
const commentSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    newsid:{
        type:String,
        required:true
    },
    comment:{
        type:String,
    
    }
},{timestamps:true});
const commentmodel=new mongoose.model("comment",commentSchema);
export default commentmodel;