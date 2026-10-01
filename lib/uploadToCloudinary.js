import axios from "axios";

export const uploadToCloudinary = async (file, folder = "khalilcomputer/students") => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "khalilcomputer");
  formData.append("folder", folder);

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    formData
  );

  return response.data.secure_url;
};
