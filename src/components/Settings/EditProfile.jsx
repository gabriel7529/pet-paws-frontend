import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUser } from "../../hooks/useUser";
import Modal from "./Modal";
import FormField from "./ui/FormField";
import Button from "./ui/Button";
import { toast } from "sonner";
import { patchUser } from "../../services/users";
import { useTranslation } from "react-i18next";
import { uploadImageToCloudinary } from "../../services/cloudinary";

const EditProfile = () => {
  const DEFAULT_IMAGE = "/img/users/default.jpg";
  const [previewImage, setPreviewImage] = useState(DEFAULT_IMAGE);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);
  const { t } = useTranslation();
  const { updateUser, data } = useUser();

  const schema = yup.object().shape({
    description: yup.string().required(t("descriptionRequired")),
    gender: yup.string().required(t("genderRequired")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (data) {
      setValue("description", data.description || "");
      setValue("gender", data.gender || "");
      setPreviewImage(data.avatar || DEFAULT_IMAGE);
    }
  }, [data, setValue]);

  const onSubmit = async (formData) => {
    try {
      await patchUser(data.userId, {
        gender: formData.gender,
        description: formData.description,
        avatar: data.avatar,
      });
      updateUser({ gender: formData.gender, description: formData.description });
      toast.success(t("updatedCorrectly"));
    } catch (error) {
      console.error(t("errorUpdating"), error);
      toast.error(t("errorUpdating"));
    }
  };

  const handleDeletePhoto = async () => {
    try {
      await patchUser(data.userId, { avatar: null });
      updateUser({ avatar: null });
      setPreviewImage(DEFAULT_IMAGE);
      setIsModalOpen(false);
      toast.success(t("photoDeleted"));
    } catch (error) {
      console.error(t("errorDeletingPhoto"), error);
      toast.error(t("errorDeletingPhoto"));
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsModalOpen(false);
      setPreviewImage(URL.createObjectURL(file));

      try {
        const cloudinaryImageUrl = await uploadImageToCloudinary(file);
        if (cloudinaryImageUrl) {
          //await patchUser(data.userId, { avatar: cloudinaryImageUrl });
          updateUser({ avatar: cloudinaryImageUrl });
          toast.success(t("photoUpdated"));
        }
      } catch (error) {
        console.error(t("errorUpdatingPhoto"), error);
        toast.error(t("errorUpdatingPhoto"));
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 min-w-64 w-2/4 md:w-96 mx-auto mt-10 bg-white shadow rounded flex flex-col"
      >
        <div className="text-center flex justify-center">
          <div className="flex items-center gap-4 w-full p-4 bg-custom-100 rounded-lg">
            <img
              className="w-14 h-14 rounded-full"
              src={previewImage}
              alt=""
            />
            <div className="font-medium text-custom-250">
              <div className="pl-3">
                {data.name} {data.lastName.split(" ")[0]}
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="font-light"
              >
                {t("settings.user.changePhoto")}
              </button>
            </div>
          </div>
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="flex flex-col bg-custom-200 text-white rounded-2xl">
            <div className="border-b border-white pb-2 text-center">
              {t("settings.user.changePhoto")}
            </div>
            <div className="relative w-full">
              <button
                type="button"
                className="bg-custom-200 w-full text-custom-50 font-semibold py-2 px-4 border-b border-white"
                onClick={() => fileInputRef.current.click()}
              >
                {t("settings.user.uploadPhoto")}
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="absolute top-0 right-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <button
              type="button"
              className="bg-custom-200 hover:bg-red-700 text-custom-400 font-semibold py-2 px-4 hover:text-custom-50 border-b border-white"
              onClick={(e) => {
                e.stopPropagation();
                handleDeletePhoto();
              }}
            >
              {t("settings.user.deletePhoto")}
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-custom-200 text-custom-50 font-semibold py-2 px-4 rounded-b-2xl"
            >
              {t("cancel")}
            </button>
          </div>
        </Modal>

        <FormField
          label={t("description")}
          type="textarea"
          id="description"
          register={register}
          errors={errors}
        />

        <div className="mt-4">
          <label htmlFor="gender" className="block mb-1 text-custom-250">
            {t("gender")}
          </label>
          <select
            id="gender"
            {...register("gender")}
            className="p-2 w-full border-custom-200 text-custom-200 rounded-lg"
          >
            <option value="">{t("gender.choose")}</option>
            <option value="Male">{t("gender.male")}</option>
            <option value="Female">{t("gender.female")}</option>
            <option value="Other">{t("gender.other")}</option>
          </select>
          {errors.gender && (
            <p className="text-custom-250">{errors.gender.message}</p>
          )}
        </div>

        <Button type="submit">{t("save")}</Button>
      </form>
    </>
  );
};

export default EditProfile;
