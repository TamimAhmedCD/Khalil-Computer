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

  // Get the base URL and inject Cloudinary optimization parameters
  // f_auto = auto format (WebP/AVIF for modern browsers)
  // q_auto = auto quality optimization
  // w_500 = max width 500px (perfect for passport photos)
  const originalUrl = response.data.secure_url;
  const optimizedUrl = originalUrl.replace(
    '/upload/',
    '/upload/f_auto,q_auto,w_500/'
  );

  return {
    secure_url: optimizedUrl,
    public_id: response.data.public_id,
  };
};

// Delete image from Cloudinary
export const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return false;

  try {
    // Extract public ID from URL if needed
    let cleanPublicId = publicId;
    if (publicId.includes("/")) {
      // If it's a URL, get the path portion after cloudinary.com
      const urlParts = publicId.split("cloudinary.com/");
      if (urlParts.length > 1) {
        cleanPublicId = urlParts[1];
        // Remove file extension
        cleanPublicId = cleanPublicId.split(".")[0];
      }
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    // Sign the request
    const paramsToSign = {
      timestamp,
      public_id: cleanPublicId,
    };
    const signature = Object.keys(paramsToSign)
      .sort()
      .map((key) => `${key}=${paramsToSign[key]}`)
      .join("&") + apiSecret;

    const response = await axios.delete(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto destroying/${cleanPublicId}`,
      {
        params: {
          api_key: apiKey,
          timestamp,
          signature,
        },
      }
    );

    return response.data.result === "ok" || response.data.result === "not found";
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return false;
  }
};
