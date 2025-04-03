import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const connectdb = async()=>{
    try {
        await mongoose.connect(process.env.DB_URL,{dbName: 'SaitmnewsDatabse'}).then((response)=>{
            console.log("database connected succesfully");
        })
    } catch (error) {
        console.log(error,"error in connecting database");
    }
}
export default connectdb;