import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";

export const updateProfile = async (req, res, next) => {
  const { profilePic, name, phone } = req.body;
  try {
    if (req.user.id !== req.params.id)
      return next(errorHandler(403, "Please login with your own account"));

    const updateUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          profilePic,
          name,
          phone,
        },
      },
      { new: true }
    );

    // const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    // });

    const { password: pass, ...rest } = updateUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
