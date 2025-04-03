import { v2 as cloudinary } from 'cloudinary';
import { error } from 'console';
import { response } from 'express';
import fs from "fs";
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key:process.env.CLOUD_APIKEY , 
    api_secret:process.env.CLOUD_SECRT, // Click 'View API Keys' above to copy your API secret
});
export const uploaderclodinary = async  (localpath)=> {
  try {
   let imageurl="";
     if(!localpath)return null;
     await cloudinary.uploader.upload(localpath,{
        resource_type:'image'
     }).then((response)=>{
      console.log("file is uploaded on cloudinary",response.url);
      imageurl= response.url;
      
     }).catch((error)=>{
        console.log(error);
        fs.unlinkSync(localpath);
     })
     return imageurl;
  } catch (error) {
    console.log(error,"error in uploadercloudinary method");
  }


}