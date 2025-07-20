import { PropTypes } from "prop-types";
import { useForm } from "react-hook-form";

const EditPost = ({ post, onClose, handleSaveClick}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post.title,
      author: post.user?.email,
      petName: post.pet.name,
      petType: post.pet.petType,
      postDescription: post.description,
      createdAt: post.createdAt,
      postUpdatedAt: post.updatedAt,
      petSize: post.pet.size,
      state: post.state,
      validated: post.pet.validated ? "true" : "false",
    },
  });

  const onSubmit = async (data) => {
    data.validated = data.validated === "true";

    const postData = {
      title: data.title,
      description: data.postDescription,
      state: data.state
    }

    await handleSaveClick(post.id, {postData});
    onClose();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div className="flex">
          <label htmlFor="title" className="p-2 w-1/3">
            Título
          </label>
          <input
            id="title"
            {...register("title", { required: "Title is required" })}
            className="border p-2 w-full"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>
        {/* Author */}
        <div className="flex">
          <label htmlFor="author" className="p-2 w-1/3">
            Autor
          </label>
          <input
            id="author"
            {...register("author", { required: "Author is required" })}
            className="border p-2 w-full bg-gray-200"
            disabled
          />
          {errors.author && (
            <p className="text-red-500">{errors.author.message}</p>
          )}
        </div>
        {/* Pet name */}
        <div className="flex">
          <label htmlFor="petName" className="p-2 w-1/3">
            Nombre de mascota
          </label>
          <input
            id="petName"
            {...register("petName", { required: "Pet name is required" })}
            className="border p-2 w-full"
          />
          {errors.petName && (
            <p className="text-red-500">{errors.petName.message}</p>
          )}
        </div>
        {/* Pet type */}
        <div className="flex">
          <label htmlFor="petType" className="p-2 w-1/3">
            Tipo de mascota
          </label>
          <select
            id="petType"
            {...register("petType", { required: "Pet type is required" })}
            className="border p-2 w-full"
          >
            <option value="DOG">Perro</option>
            <option value="CAT">Gato</option>

            <option value="BIRD">Ave</option>
            <option value="RABBIT">Conejo</option>
            <option value="OTHER">Otro</option>
          </select>
          {errors.petType && (
            <p className="text-red-500">{errors.petType.message}</p>
          )}
        </div>
        {/* Description */}
        <div className="flex">
          <label htmlFor="postDescription" className="p-2 w-1/3">
            Descripción
          </label>
          <textarea
            id="postDescription"
            {...register("postDescription", {
              required: "Description is required",
            })}
            className="border p-2 w-full"
          />
          {errors.postDescription && (
            <p className="text-red-500">{errors.postDescription.message}</p>
          )}
        </div>
        {/* Created at */}
        <div className="flex">
          <label htmlFor="createdAt" className="p-2 w-1/3">
            Creado
          </label>
          <input
            id="createdAt"
            {...register("createdAt", { required: "Created at is required" })}
            className="border p-2 w-full bg-gray-200"
            disabled
          />
          {errors.createdAt && (
            <p className="text-red-500">{errors.createdAt.message}</p>
          )}
        </div>
        {/* Updated at */}
        <div className="flex">
          <label htmlFor="postUpdatedAt" className="p-2 w-1/3">
            Actualizado
          </label>
          <input
            id="postUpdatedAt"
            {...register("postUpdatedAt", {
              required: "Updated at is required",
            })}
            className="border p-2 w-full bg-gray-200"
            disabled
          />
          {errors.postUpdatedAt && (
            <p className="text-red-500">{errors.postUpdatedAt.message}</p>
          )}
        </div>
        {/* Pet size */}
        <div className="flex">
          <label htmlFor="petSize" className="p-2 w-1/3">
            Tamaño de mascota
          </label>
          <select
            id="petSize"
            {...register("petSize", { required: "Pet size is required" })}
            className="border p-2 w-full"
          >
            <option value="SMALL">Pequeño</option>
            <option value="MEDIUM">Mediano</option>
            <option value="LARGE">Grande</option>
          </select>
          {errors.petSize && (
            <p className="text-red-500">{errors.petSize.message}</p>
          )}
        </div>
        {/* State */}
        <div className="flex">
          <label htmlFor="state" className="p-2 w-1/3">
            Estado
          </label>
          <select
            id="state"
            {...register("state", { required: "State is required" })}
            className="border p-2 w-full"
          >
            <option value="LOST">Perdido</option>
            <option value="FOUND">Encontrado</option>
            <option value="ADOPTION">En adopción</option>
            <option value="ADOPTED">Adoptado</option>

          </select>
          {errors.state && (
            <p className="text-red-500">{errors.state.message}</p>
          )}
        </div>
        {/* Validated */}
        <div className="flex">
          <label htmlFor="validated" className="p-2 w-1/3">
            Validado
          </label>
          <select id="validated" {...register("validated")} className="border p-2 w-full">
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded-md"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

EditPost.propTypes = {
  post: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  handleSaveClick: PropTypes.func.isRequired,
};

export default EditPost;
