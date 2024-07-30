import express, { application } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((error) => console.log(error));

const app = express();

app.use(express.json());
app.use("/uploads", express.static("uploads/"));
app.use(cookieParser());

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server is Working on PORT ${PORT}`));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.use((err, req, res, next) => {
  const message = err.message || "Something went wrong";
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({ success: false, message });
});
