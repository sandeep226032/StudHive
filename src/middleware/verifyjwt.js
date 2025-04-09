import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import usermodel from "../models/usermodel.js";

const verifyjwt=async (req,res,next)=>{
    
const token=req.cookies?.accesstoken||req.header("Authorization")?.replace("Bearer ","");
if(!token){
      return res.status(400).json({
        message:"you are not logged in",
        })
}
try {
    const decodedtoken=jwt.verify(token,process.env.ACCESSTOKEN_SECRET)
    await usermodel.findById(decodedtoken._id,{email:1,_id:1}).then((response)=>{
        req.email=response.email;
        req._id=response._id;
        next();
    }).catch((error)=>{
        res.status(401).json({
           message:"Incorrect details"
        })
    })
} catch (error) {
    console.log(error,"error in verfiy jwt");
}


} 
export default verifyjwt;