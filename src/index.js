import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./Routes/index.js";
import connectdb from "./Database/index.js";

const app = express();

const allowedOrigins = [
    "https://680c62df5c16b58045ab44ec--cheery-torte-a4a155.netlify.app",
    "http://localhost:5173" ,
    "https://darling-melomakarona-bf84db.netlify.app"
     // Add localhost for testing
];

// Configure CORS
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Handle preflight requests
app.options("*", cors());

app.use('/', router);
console.log("hello devlper");
connectdb();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running successfully on port ${PORT}`);
});
