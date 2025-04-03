import mongoose from "mongoose";
const newsSchema=new mongoose.Schema({
    uploader:{
        type:String,
        required:true
    },
    heading:{
        type:String,
        required:true
    },
    imageurl:{
        type:String,
        required:true
    },
    content:{
        type:String
    },
    like:{
        type:Number,
        default:0

    },
    dislike:{
        type:Number,
        default:0
    }
   
   
},{timestamps:true})
const newsmodel=new mongoose.model("totalnews",newsSchema);
export default newsmodel;