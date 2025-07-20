import { useState, useEffect } from 'react';
import { usePetData } from '../../contexts/post/PetProvider';

const ImageUploader = () => {
  const { petData, setPetData } = usePetData();
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const uploadPresent = "uploadpet";
  const cloudName = "dwkizli4g";

  // Función para convertir la imagen a base64
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPresent); // Cambia esto por tu upload_preset de Cloudinary

    try {
      setUploading(true);
      const res = await fetch (`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {

        method: 'POST',
        body: formData
      });
      const data = await res.json();
      setUploading(false);
      console.log(data.secure_url);
      return data.secure_url;
    } catch (error) {
        setUploading(false);
        console.error('Error al subir la imagen a Cloudinary:', error);
        return null;
    }
  };

  // Cargar la imagen desde petData si existe
  useEffect(() => {
    if (petData.pictures.length > 0) {
      // Muestra la última imagen subida en el contexto petData
      setImagePreview(petData.pictures[petData.pictures.length - 1].url);
    }
  }, [petData]);


  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);

      // Subir la imagen a Cloudinary
      const cloudinaryImageUrl = await uploadImageToCloudinary(file);

      if (cloudinaryImageUrl) {
        // Actualizar las imágenes en el contexto, guardando la imagen en la URL de Cloudinary
        const updatedPetData = {
          ...petData,
          pictures: [...petData.pictures, { id: petData.pictures.length + 1, url: cloudinaryImageUrl }]
        };
        setPetData(updatedPetData);
        localStorage.setItem('petData', JSON.stringify(updatedPetData)); // Guardar en localStorage también
      }


    }
  };

  return (
    <div className="w-full h-full bg-[#ffb0a9] flex items-center justify-center rounded-lg mb-6">
      {uploading ? (
        <p>Subiendo imagen...</p>
      ) : imagePreview ? (
        <img src={imagePreview} alt="Uploaded Preview" className="p-8" />
      ) : (
        <label className="cursor-pointer">
          <img src="/src/assets/img/Icons/Camera.svg" alt="camera" className="p-8" />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
};

export default ImageUploader;
