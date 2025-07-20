import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../hooks/useAuth"; // Accede al contexto de autenticación

// Esquema de validación con Yup
const schema = yup.object().shape({
  nombres: yup.string().required("El nombre es obligatorio"),
  apellidos: yup.string().required("El apellido es obligatorio"),
  usuario: yup.string().required("El usuario es obligatorio"),
  correo: yup.string().email("Correo inválido").required("El correo es obligatorio"),
  fechaNacimiento: yup.date().required("La fecha de nacimiento es obligatoria"),
});

const EditDetails = () => {
  const { user, setUser } = useAuth(); // Obtiene y actualiza los datos del usuario
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nombres: user?.nombres || "",
      apellidos: user?.apellidos || "",
      usuario: user?.usuario || "",
      correo: user?.correo || "",
      fechaNacimiento: user?.fechaNacimiento || "",
    },
  });

  const onSubmit = (data) => {
    // Lógica para actualizar los detalles personales del usuario
    console.log("Datos actualizados:", data);
    setUser((prev) => ({ ...prev, ...data }));
    alert("Detalles personales actualizados exitosamente");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 w-2/4 mx-auto mt-10 p-6 bg-white shadow rounded"
    >
      <h2 className="text-2xl font-bold text-center mb-6">Detalles Personales</h2>

      <div>
        <label htmlFor="nombres" className="block mb-1">
          Nombre(s)
        </label>
        <input
          type="text"
          id="nombres"
          {...register("nombres")}
          className="border p-2 w-full rounded"
        />
        {errors.nombres && (
          <p className="text-red-500">{errors.nombres.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="apellidos" className="block mb-1">
          Apellido(s)
        </label>
        <input
          type="text"
          id="apellidos"
          {...register("apellidos")}
          className="border p-2 w-full rounded"
        />
        {errors.apellidos && (
          <p className="text-red-500">{errors.apellidos.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="usuario" className="block mb-1">
          Usuario
        </label>
        <input
          type="text"
          id="usuario"
          {...register("usuario")}
          className="border p-2 w-full rounded"
        />
        {errors.usuario && (
          <p className="text-red-500">{errors.usuario.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="correo" className="block mb-1">
          Correo Electrónico
        </label>
        <input
          type="email"
          id="correo"
          {...register("correo")}
          className="border p-2 w-full rounded"
        />
        {errors.correo && (
          <p className="text-red-500">{errors.correo.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="fechaNacimiento" className="block mb-1">
          Fecha de Nacimiento
        </label>
        <input
          type="date"
          id="fechaNacimiento"
          {...register("fechaNacimiento")}
          className="border p-2 w-full rounded"
        />
        {errors.fechaNacimiento && (
          <p className="text-red-500">{errors.fechaNacimiento.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded w-full mt-4"
      >
        Guardar Cambios
      </button>
    </form>
  );
};

export default EditDetails;
