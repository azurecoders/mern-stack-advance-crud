import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs";

// const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
//   new: true,
// });

export const updateProfile = async (req, res, next) => {
  const { name, phone } = req.body;
  try {
    if (req.user.id !== req.params.id)
      return next(errorHandler(403, "Please login with your own account"));

    if (req.file) {
      if (
        req.file.mimetype === "image/jpeg" ||
        req.file.mimetype === "image/jpg" ||
        req.file.mimetype === "image/png"
      ) {
        const data = await uploadOnCloudinary(req.file.path);
        const updateUser = await User.findByIdAndUpdate(
          req.user.id,
          {
            $set: {
              profilePic: data.secure_url,
              name,
              phone,
            },
          },
          { new: true }
        );

        fs.unlinkSync(req.file.path);

        const { password: pass, ...rest } = updateUser._doc;
        res.status(200).json(rest);
      } else {
        return next(errorHandler(401, "The Profile Pic Must Be an Image"));
      }
    } else {
      const updateUser = await User.findByIdAndUpdate(
        req.user.id,
        {
          $set: {
            name,
            phone,
          },
        },
        { new: true }
      );

      const { password: pass, ...rest } = updateUser._doc;

      res.status(200).json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const UpdatePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (req.user.id !== req.params.id)
      return next(errorHandler(401, "Please login with your own account"));

    const findUser = await User.findById(req.params.id);
    if (!findUser) return next(errorHandler(403, "User not found"));

    const validatePassword = bcryptjs.compareSync(
      oldPassword,
      findUser.password
    );

    if (!validatePassword)
      return next(errorHandler(401, "Password doesn't match"));

    const hashedPassword = bcryptjs.hashSync(newPassword, 10);

    await User.findByIdAndUpdate(req.params.id, {
      $set: {
        password: hashedPassword,
      },
    });

    res.json({ success: true, message: "Password changed successfuly" });
  } catch (error) {
    next(error);
  }
};
