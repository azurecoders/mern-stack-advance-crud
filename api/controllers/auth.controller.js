import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const SignUp = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const findUser = await User.findOne({ email });
    if (findUser)
      return next(errorHandler(403, "Email in Use. User already exists"));

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = newUser._doc;

    res
      .status(201)
      .cookie("access_token", token, { maxAge: 60 * 60 * 24 * 7 * 1000 })
      .json({ success: true, user: rest });
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
