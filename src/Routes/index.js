import express from "express";
import { newsuploader,newsdisplay,userregister ,userlogin,userlogout,handelinglikes, handelingdislikes, handelcomment, displaycomment, checkauth} from "../Controllers/index.js";
export const router = express.Router();
import { upload } from "../middleware/multer.js";
import verifyjwt from "../middleware/verifyjwt.js";

router.post("/createnews",upload.single("image"),newsuploader);
router.get("/home",newsdisplay);
router.post("/signup",userregister)
router.post("/login",userlogin)
router.get("/logout",verifyjwt,userlogout);
router.patch("/likes",handelinglikes);
router.patch("/dislikes",handelingdislikes);
router.post("/comments",handelcomment);
router.post("/seecomments",displaycomment);
router.get("/checkauth",verifyjwt,checkauth);

