import ImageUploader from "../components/PostPet/ImageUploader";
import DescriptionBox from "../components/PostPet/DescriptionBox";
import ActionButton from "../components/PostPet/ActionButton";
import PublishButton from "../components/PostPet/PublishButton";

const NewPostPet = () => {

  return (
    <div className="max-w-[375px] md:max-w-[1440px] mx-auto p-4 bg-white-200 rounded-lg">

      {/* Contenedor para la vista en dispositivos grandes */}
      <div className="flex flex-col md:flex-row justify-between">
        {/* Columna Izquierda - Imagen y Descripción */}
        <div className="md:w-4/5 p-4 flex flex-col ">
          <ImageUploader />
          <DescriptionBox/>

        </div>

      <div className="md:w-1/2 p-4 space-y-4 flex flex-col">
        <ActionButton
          text="Agregar información"
          icon="/src/assets/img/Icons/info.svg"
          redirectTo="/post/info"
        />

        <ActionButton
          text="Agregar ubicación"
          icon="/src/assets/img/Icons/location_pink.svg"
          redirectTo="/post/map"
        />

        <ActionButton
          text="Agregar estado"
          icon={"/src/assets/img/Icons/logo.svg"}
          redirectTo="/post/state"
        />

        <ActionButton
          text="Agregar etiquetas"
          icon={"/src/assets/img/Icons/Tags.svg"}
          redirectTo="/post/tag"
        />
        <PublishButton />

      </div>
    </div>

    </div>
  );
};

export default NewPostPet;
