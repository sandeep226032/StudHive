import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./Routes/index.js";
import connectdb from "./Database/index.js";

const app = express();

// Configure CORS
app.use(cors({
    origin: "https://studhive.netlify.app/",
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', router);

connectdb();

app.listen(process.env.PORT, () => {
    console.log(`Server running successfully on port ${process.env.PORT}`);
});




 