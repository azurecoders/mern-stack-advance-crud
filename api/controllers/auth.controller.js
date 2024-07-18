import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
export const SignUp = async (req, res, next) => {
  console.log(req.body);
  const { name, email, password } = req.body;

  try {
    const findUser = await User.findOne({ email });
    if (findUser)
      return next(errorHandler(403, "Email in Use. User already exists"));

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();

    const { password: pass, ...rest } = newUser._doc;

    res.status(201).json({ success: true, user: rest });
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

    res.status(200).json({ success: true, message: rest });
  } catch (error) {
    next(error);
  }
};
