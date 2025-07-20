import { formatData } from '../../helpers/formatPostData';
import { usePetData } from '../../hooks/usePetData';
import { createPost } from '../../services/posts';
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const PublishButton = () => {
  const { petData, setPetData } = usePetData();
  const { t } = useTranslation();


  const user = JSON.parse(localStorage.getItem('user'));

  const handlePublish = async () => {
    try {
      const response = await createPost(petData);
      //console.log('PetData:', petData);
      console.log('Post creado:', response);
      toast.success('Publicación creada con éxito');
      //Limpia el context Pet
      setPetData({});
      //Se inserta la plantilla del context
      setPetData(formatData(user));
    } catch (error) {
      console.error('Error al crear el post:', error);
      toast.error('Error al crear la publicación');
    }
  };


  return (
    <div className="mt-4">
    <button onClick={handlePublish} className="w-full py-2 bg-[#FF797D] text-white rounded-lg text-lg font-semibold">
      {t("BotonPublicar")}
    </button>
  </div>
  );
};

export default PublishButton;
