import { response } from "express";
import { uploaderclodinary } from "../Utils/cloudinary.js";
import newsmodel from "../models/newsmodel.js";
import usermodel from "../models/usermodel.js";
import commentmodel from "../models/commentmodel.js";
import fs from "fs";

export const newsuploader = (req,res) => {
    const news = req.body;
    const filepath= req.file.path;
    const uploader=news.uploader;
    
    if(news==null||filepath==""||uploader==""){
        res.status(500).json({
            message:"fill information correctly"
        })
    }
    const heading=news.heading;
    const content=news.content;
   
     uploaderclodinary(filepath).then((response)=>{
        console.log(response);
        fs.unlinkSync(filepath);
       const imageurl=response;
        newsmodel.create({heading:heading,imageurl:imageurl,content:content,uploader:uploader}).then((response)=>{
            console.log(response);
            res.status(200).json({
                message:"News uploaded succesfully"
            })
        }).catch((error)=>{
                console.log(error);
                res.status(500).json({
                 message:"news not uploaded due to some internal issue"
                })
         
        })
     })
   console.log(filepath);
    console.log(news);
    
}
export const newsdisplay= async(req,res)=>{
    await  newsmodel.find().then((data)=>{
        console.log(data);
        res.json({
            message:"ok",
            data:data
        })
     })
  
}

export const userregister=async(req,res)=>{
      const {username,phonenumber,email,password}=req.body;
      if(username==""||phonenumber==""||email==""||password==""){
        res.status(400).json({
            message:"please fill information correctly"
        })
      }
    try {
         const result= await usermodel.findOne({email:email})
         if(!result){
            const newuser=new usermodel({
                username:username,
                phonenumber:phonenumber,
                email:email,
                password:password
            }) 
            await newuser.save().then((response)=>{
                console.log(response);
                res.status(200).json({
                    message:"Registered succesfully"
                   })
            })
            .catch((error)=>{
            console.log(error,"error in save method");
            res.status(500).json({
                message:"server error"
            })
         
           })
      }else{
        res.status(401).json({
            message:"please enter another mail.these mail is already used"
         })
      }
         
    } catch (error) {
        console.log(error,"error in user register method");
        res.status(500).json({
            message:"server error"
        })
    }
    }
 
    
export const userlogin=async (req,res)=>{
    const {email,password}=req.body;
    if(email==""||password==""){
        res.status(400).json({
            message:"please fill information correctly"
        })
    }
    try {
       const user= await usermodel.findOne({email:email})
       if(user){
          const valid=await user.ispasswordcorrect(password).catch((error)=>{
            res.status(500).json({
                message:"server error"
            })
          })
          console.log(valid);
          if(valid){
                 const accesstoken =user.generateaccesstoken();
                 const options={
                    httponly:false,
                    secure:false,
                    
                 }
                 res.status(200).cookie("accesstoken",accesstoken,options).json({
                    message:"logged in succesfully",
                    userdata:user,
                 })

          }else{
            res.status(401).json({
                message:"please enter correct password"
             })
          }
       }else{
        res.status(401).json({
            message:"please sign up first then log in"
         })
       }
    } catch (error) {
        console.log(error,"error in user register method");
        res.status(500).json({
            message:"server error"
        })
    }

}

export const userlogout=async (req,res)=>{
    
 res.status(200).clearCookie("accesstoken",{ sameSite:'None'}).json({
    message:"Logged out successfully"
 })
    
}
export const handelinglikes=async(req,res)=>{
    const _id=req.body._id;
    const likes=req.body.likes;
    try {
        const updatedata=await newsmodel.findByIdAndUpdate(_id,{like:likes},{new:true});
        console.log(updatedata);
        res.status(200).json({
            message:"ok",
            like:updatedata.like
        });
    } catch (error) {
        console.log("error in handeling likes",error);
    }
}
export const handelingdislikes=async(req,res)=>{
    const _id=req.body._id;
    const dislikes=req.body.dislikes;
    try {
        const updatedata=await newsmodel.findByIdAndUpdate(_id,{dislike:dislikes},{new:true});
        console.log(updatedata);
        res.status(200).json({
            message:"ok",
            like:updatedata.dislike
        });
    } catch (error) {
        console.log("error in handeling likes",error);
    }
}
export const handelcomment=async (req,res)=>{
     const {username,newsid,comment}=req.body;
     if(username==""||newsid==""||comment==""){
        res.status(400).json({
            message:"user not logged in"
        })
     }
     
     try {
      const result=  await commentmodel.create({username:username,newsid:newsid,comment:comment});
      console.log(result);
      res.status(200).json({
        message:"ok"
      })
     } catch (error) {
        console.log("error in handelling comments",error);
     }

}
export const displaycomment=async (req,res)=>{
     const {newsid}=req.body;
     if(newsid==""){
         res.status(400).json({
            message:"internal probelm",
         })
     }
    
    try {
        const result= await commentmodel.find({newsid:newsid});
        res.status(200).json({
            message:"ok",
            data:result
        })
    } catch (error) {
        console.log("error in displaycomment",error);
    }
    
}
