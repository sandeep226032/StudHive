import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const userschema=new mongoose.Schema({
      username:{
        type:String,
        required:true,
        unique:true
      },
      phonenumber:{
        type:String,
        required:true,
        validate:{
            validator:function(value){
                return value.length==10
            },
            message:"phone number must contain 10 digits"
        }
         },
      email:{
        type:String,
        required:true,
        unique:true,
        match:[/^[a-zA-Z]+_[0-9]{6}@(saitm\.org|saitm\.ac\.in)$/,"please enter a valid email"]
      },
      password:{
        type:String,
        required:true,
        minlength:[6,"password must have six characters"]
      }
},{timestamps:true})
userschema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
   this.password =  await bcrypt.hash(this.password,10);
   console.log(this.password,"hello");
     next();
})
userschema.methods.ispasswordcorrect=async function(password){
     return await bcrypt.compare(password,this.password);
}
userschema.methods.generateaccesstoken=function(){
   return jwt.sign({
         _id:this._id,
         email:this.email,
         username:this.username
    },process.env.ACCESSTOKEN_SECRET,
    {
        expiresIn:process.env.ACCESSROKEN_EXPIRY
    }
)
}
const usermodel=new mongoose.model("user",userschema);
export default usermodel;