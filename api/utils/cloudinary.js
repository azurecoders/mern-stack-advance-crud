import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });

export const uploadOnCloudinary = async (path) => {
  try {
    const response = await cloudinary.uploader.upload(path);
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
