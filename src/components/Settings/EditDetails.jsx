import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUser } from "../../hooks/useUser";
import { useEffect } from "react";
import FormField from "./ui/FormField";
import Button from "./ui/Button";
import Title from "./ui/Title";
import { patchUser } from "../../services/users";
import {toast} from 'sonner';
import { useTranslation } from "react-i18next";

const formatDateForInput = (isoString) => {
  const date = new Date(isoString);
  return date.toISOString().substring(0, 10);
};

const formatDateForApi = (dateString) => {
  const date = new Date(dateString).toISOString()
  return date;
};

const schema = yup.object().shape({
  name: yup.string().required("El nombre es obligatorio"),
  lastName: yup.string().required("El apellido es obligatorio"),
  account: yup.string().required("El account es obligatorio"),
  email: yup.string().email("Correo inválido").required("El email es obligatorio"),
  birthDate: yup.date().required("La fecha de nacimiento es obligatoria"),
});

const EditDetails = () => {
  const { t } = useTranslation();
  const {updateUser, data} = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(schema),

  });

  useEffect(() => {
    if (data && data.name) {
      setValue("name", data.name);
    }
    if (data && data.lastName) {
      setValue("lastName", data.lastName);
    }
    if (data && data.account) {
      setValue("account", data.account);
    }
    if (data && data.email) {
      setValue("email", data.email);
    }
    if (data && data.birthDate) {
      setValue("birthDate", formatDateForInput(data.birthDate));
    }
  }, [data, setValue]);

  const onSubmit =async (formData) => {
    const formatted = {...formData, birthDate: formatDateForApi(formData.birthDate)}
    try{
      updateUser(formatted  );
      await patchUser(data.userId, formatted);
      toast.success("Detalles actualizados");
    }
    catch (error) {
      console.error("Error updating details", error);
      toast.error("Error al actualizar los detalles");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 min-w-64 w-2/4 md:w-96 mx-auto mt-10 bg-white shadow rounded flex flex-col"
    >
      <Title text={t("settings.user.details")} />
      <FormField id="name" type="text" label={t("name")} register={register} errors={errors} />
      <FormField id="lastName" type="text" label= {t("lastName")} register={register} errors={errors} />
      <FormField id="account" type="text" label={t("username")} register={register} errors={errors} />
      {/*<FormField id="email" type="email" label="Correo Electrónico" register={register} errors={errors} />*/}
      <FormField id="birthDate" type="date" label={t("birthdate")} register={register} errors={errors} />
      <Button type="submit" >{t("save")}</Button>
    </form>
  );
};

export default EditDetails;
