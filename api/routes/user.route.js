import express from "express";
import { verifyUser } from "../middlewares/verifyUser.js";
import { updateProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.put("/update/:id", verifyUser, updateProfile);

export default router;
