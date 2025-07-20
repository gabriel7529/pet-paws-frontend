const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPresent = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPresent);

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    return null;
  }
};

export { uploadImageToCloudinary };
