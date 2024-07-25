import express from "express";
import { verifyUser } from "../middlewares/verifyUser.js";
import {
  UpdatePassword,
  updateProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.put("/update/:id", verifyUser, updateProfile);
router.put("/update/password/:id", verifyUser, UpdatePassword);

export default router;
