import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs";

export const SignUp = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    if (!req.file)
      return next(errorHandler(403, "Profile Pic Must Be Uploaded"));

    if (
      req.file.mimetype === "image/jpeg" ||
      req.file.mimetype === "image/jpg" ||
      req.file.mimetype === "image/png"
    ) {
      const data = await uploadOnCloudinary(req.file.path);
      const findUser = await User.findOne({ email });
      if (findUser)
        return next(errorHandler(403, "Email in Use. User already exists"));

      const hashedPassword = bcryptjs.hashSync(password, 10);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        profilePic:
          data == null
            ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            : data.secure_url,
      });

      await newUser.save();

      fs.unlinkSync(req.file.path);

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;

      res
        .status(201)
        .cookie("access_token", token, { maxAge: 60 * 60 * 24 * 7 * 1000 })
        .json({ success: true, user: rest });
    } else {
      return next(errorHandler(401, "The Profile Pic Must be an image"));
    }
  } catch (error) {
    next(error);
  }
};

export const LogIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const findUser = await User.findOne({ email });
    if (!findUser) return next(errorHandler(403, "User doesn't exist"));

    const validPassword = bcryptjs.compareSync(password, findUser.password);
    if (!validPassword) return next(errorHandler(403, "Invalid Password"));

    const { password: pass, ...rest } = findUser._doc;
    const token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET);

    res
      .status(200)
      .cookie("access_token", token, {
        maxAge: 60 * 60 * 24 * 7 * 1000,
        sameSite: "None",
      })
      .json({ success: true, message: rest });
  } catch (error) {
    next(error);
  }
};
