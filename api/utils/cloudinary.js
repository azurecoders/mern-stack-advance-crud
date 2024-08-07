import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });

cloudinary.config({
  cloud_name: "dcax8bt4n",
  api_key: "666583154966611",
  api_secret: "gDpGcA-4Bvkio-5HVStWguQh7N4",
});

export const uploadOnCloudinary = async (path) => {
  try {
    const response = await cloudinary.uploader.upload(path);
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
