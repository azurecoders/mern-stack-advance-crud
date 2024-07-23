import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  const access_token = req.cookies.access_token;
  //   const { access_token } = req.cookies;

  if (!access_token) return next(errorHandler(403, "UnAuthorized"));

  jwt.verify(access_token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Forbidden"));

    req.user = user;
    next();
  });
};
