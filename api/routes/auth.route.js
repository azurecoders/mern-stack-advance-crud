import express from "express";
import { LogIn, SignUp } from "../controllers/auth.controller.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.post("/signup", upload.single("profilePic"), SignUp);
router.post("/login", LogIn);

export default router;
