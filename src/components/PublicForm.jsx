import {Button, Modal} from "flowbite-react";
import {useState, useEffect} from "react";
import {useTranslation} from 'react-i18next';
import FormField from "./FormField";
import {createPost, updatePost} from '../services/posts';
import PropTypes from "prop-types";

export function ModalFormulario({post, onClose}) {
  const [step, setStep] = useState(1);
  const {t} = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    tipoAnimal: '',
    genero: '',
    caracteristicas: '',
    tamano: '',
    edad: '',
    diaHora: '',
    contacto: '',
    etiquetas: '',
    foto: null
  });

  useEffect(() => {
    if (post) {
      setFormData({
        name: post.name || '',
        tipoAnimal: post.pet_type || '',
        genero: post.pet_gender === 'male' ? 'macho' : 'hembra',
        caracteristicas: post.pet_description || '',
        tamano: post.pet_size || '',
        edad: post.pet_age === 'young' ? '2' : 'adult',
        diaHora: post.date_lost || '',
        contacto: post.user_id || '',
        etiquetas: post.tags || '',
        foto: post.pictures?.[0]?.url || null
      });
    }
  }, [post]);

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleChange = (e) => {
    const {id, value} = e.target;
    setFormData({...formData, [id]: value});
  };

  const handleFotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({...formData, foto: URL.createObjectURL(file)});
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let dataToSend = {
      name: formData.name,
      pet_type: formData.tipoAnimal,
      pet_gender: formData.genero === "macho" ? "male" : "female",
      pet_description: formData.caracteristicas || "No description provided.",
      pet_size: formData.tamano,
      pet_age: formData.edad <= "2" ? "young" : "adult",
      date_lost: formData.diaHora.split("T")[0],
      reward: `$${formData.recompensa}`,
      user_id: 1,
      pictures: [
        {
          url: formData.foto || "https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?cs=srgb&dl=pexels-pixabay-617278.jpg&fm=jpg"
        }
      ]
    };

    try {
      if (post) {
        dataToSend.id = post.id;
        await updatePost(post.id, dataToSend);
      } else {
        await createPost(dataToSend);
      }
      onClose();
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
    <>
      <Modal show={true} onClose={onClose}>
        <Modal.Header className="bg-custom-100">
          <p className="text-[#DA6274] items-center">
            {post ? t("titleFormEdit") : t("titleFormPublish")}
          </p>
        </Modal.Header>

        <div className="flex w-full justify-center bg-custom-100">
          <ol className="flex items-center min-w-[50%] justify-center">
            <li
              className={`flex w-full items-center ${step >= 1 ? 'text-custom-250' : 'text-gray-500'} after:content-[''] after:w-full after:h-1 after:border-b after:border-custom-250 after:border-4 after:inline-block`}>
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 ${step >= 1 ? 'bg-custom-250' : 'bg-custom-150'} dark:bg-blue-800 shrink-0`}>
                <svg
                  className="text-white x-[25px] h-[25px]"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>dog</title>
                  <path
                    fill="currentColor"
                    d="M18,4C16.29,4 15.25,4.33 14.65,4.61C13.88,4.23 13,4 12,4C11,4 10.12,4.23 9.35,4.61C8.75,4.33 7.71,4 6,4C3,4 1,12 1,14C1,14.83 2.32,15.59 4.14,15.9C4.78,18.14 7.8,19.85 11.5,20V15.72C10.91,15.35 10,14.68 10,14C10,13 12,13 12,13C12,13 14,13 14,14C14,14.68 13.09,15.35 12.5,15.72V20C16.2,19.85 19.22,18.14 19.86,15.9C21.68,15.59 23,14.83 23,14C23,12 21,4 18,4M4.15,13.87C3.65,13.75 3.26,13.61 3,13.5C3.25,10.73 5.2,6.4 6.05,6C6.59,6 7,6.06 7.37,6.11C5.27,8.42 4.44,12.04 4.15,13.87M9,12A1,1 0 0,1 8,11C8,10.46 8.45,10 9,10A1,1 0 0,1 10,11C10,11.56 9.55,12 9,12M15,12A1,1 0 0,1 14,11C14,10.46 14.45,10 15,10A1,1 0 0,1 16,11C16,11.56 15.55,12 15,12M19.85,13.87C19.56,12.04 18.73,8.42 16.63,6.11C17,6.06 17.41,6 17.95,6C18.8,6.4 20.75,10.73 21,13.5C20.75,13.61 20.36,13.75 19.85,13.87Z"/>
                </svg>
              </div>
            </li>

            <li
              className={`flex w-full items-center ${step >= 2 ? 'text-custom-250' : 'text-gray-500'} after:content-[''] after:w-full after:h-1 after:border-b after:border-custom-150 after:border-4 after:inline-block`}>
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 ${step >= 2 ? 'bg-custom-250' : 'bg-custom-150'} dark:bg-gray-700 shrink-0`}>
                <svg className="text-white x-[25px] h-[25px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <title>dog-side</title>
                  <path
                    fill="currentColor"
                    d="M19,3L15,7L18,10L19,9L20,10L22,8L19,5V3M3,7L2,8L5,11V14L4,15V21H6V18L8,15H15V21H17V11L14,8L13,9H5L3,7Z"/>
                </svg>
              </div>
            </li>

            <li className={`flex items-center w-full ${step === 3 ? 'text-custom-250' : 'text-custom-150'}`}>
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 ${step === 3 ? 'bg-custom-250' : 'bg-custom-150'} dark:bg-gray-700 shrink-0`}>
                <svg
                  className="text-white x-[25px] h-[25px]"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>map-legend</title>
                  <path
                    fill="currentColor"
                    d="M9,3L3.36,4.9C3.15,4.97 3,5.15 3,5.38V20.5A0.5,0.5 0 0,0 3.5,21L3.66,20.97L9,18.9L15,21L20.64,19.1C20.85,19.03 21,18.85 21,18.62V3.5A0.5,0.5 0 0,0 20.5,3L20.34,3.03L15,5.1L9,3M8,5.45V17.15L5,18.31V6.46L8,5.45M10,5.47L14,6.87V18.53L10,17.13V5.47M19,5.7V17.54L16,18.55V6.86L19,5.7M7.46,6.3L5.57,6.97V9.12L7.46,8.45V6.3M7.46,9.05L5.57,9.72V11.87L7.46,11.2V9.05M7.46,11.8L5.57,12.47V14.62L7.46,13.95V11.8M7.46,14.55L5.57,15.22V17.37L7.46,16.7V14.55Z"/>
                </svg>
              </div>
            </li>
          </ol>
        </div>

        <Modal.Body className="bg-custom-100">
          {step === 1 && (
            <div>
              <FormField
                label={t("nameLabel")}
                id="name"
                type="text"
                placeholder={t("namePlaceholder")}
                value={formData.name}
                onChange={handleChange}
              />
              <FormField
                label={t("animalTypeLabel")}
                id="tipoAnimal"
                type="text"
                placeholder={t("animalTypePlaceholder")}
                value={formData.tipoAnimal}
                onChange={handleChange}
              />
              <FormField
                label={t("genderLabel")}
                id="genero"
                type="radio"
                options={[
                  {label: t("genderOptionsLabel1"), value: "macho"},
                  {label: t("genderOptionsLabel2"), value: "hembra"}
                ]}
                value={formData.genero}
                onChange={handleChange}
              />
            </div>
          )}

          {step === 2 && (
            <div>
              <FormField
                label={t("sizeLabel")}
                id="tamano"
                type="text"
                placeholder={t("sizePlaceholder")}
                value={formData.tamano}
                onChange={handleChange}
              />
              <FormField
                label={t("ageLabel")}
                id="edad"
                type="number"
                placeholder={t("agePlaceholder")}
                value={formData.edad}
                onChange={handleChange}
              />
              <FormField
                label={t("dayAndTimeLabel")}
                id="diaHora"
                type="datetime-local"
                value={formData.diaHora}
                onChange={handleChange}
              />
              <FormField
                label={t("rewardLabel")}
                id="recompensa"
                type="number"
                placeholder={t("rewardPlaceholder")}
                value={formData.recompensa}
                onChange={handleChange}
              />
            </div>
          )}

          {step === 3 && (
            <div>
              <FormField
                label={t("contactLabel")}
                id="contacto"
                type="text"
                placeholder={t("contactPlaceholder")}
                value={formData.contacto}
                onChange={handleChange}
              />

              <p className="block text-sm font-medium text-gray-900 my-4">
                {t("photoLabel")}
              </p>
              <div className="flex flex-col items-center mt-4">
                <input
                  id="file-input"
                  type="file"
                  onChange={handleFotoChange}
                  style={{display: 'none'}}
                />

                <div className="w-64 h-64 mt-4 bg-[#fca5a5] flex items-center justify-center">
                  {formData.foto ? (
                    <img src={formData.foto} alt="Preview" className="object-cover w-full h-full"/>
                  ) : (
                    <img src="/src/assets/img/petDog.png" alt="Default Preview" className="w-32 h-32 object-cover"/>
                  )}
                </div>
                <br/>
                <label
                  htmlFor="file-input"
                  className="px-4 py-2 bg-[#ff4850] text-white rounded cursor-pointer text-center"
                >
                  {t("submitPhoto")}
                </label>
              </div>
              <FormField
                label={t("tagsLabel")}
                id="etiquetas"
                type="text"
                placeholder={t("tagsPlaceholder")}
                value={formData.etiquetas}
                onChange={handleChange}
              />
            </div>
          )}
        </Modal.Body>

        <Modal.Footer className="flex justify-center gap-8 bg-custom-100">
          {step > 1 && (
            <Button className="bg-custom-150 active:bg-custom-350" onClick={handlePrevStep}>
              {t("previousButton")}
            </Button>
          )}
          {step < 3 ? (
            <Button className="bg-custom-250 active:bg-custom-350" onClick={handleNextStep}>
              {t("nextButton")}
            </Button>
          ) : (
            <Button className="bg-custom-300 active:bg-custom-350" onClick={handleSubmit}>
              {t("submitButton")}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

ModalFormulario.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    pet_type: PropTypes.string.isRequired,
    pet_gender: PropTypes.string.isRequired,
    pet_description: PropTypes.string,
    pet_size: PropTypes.string,
    pet_age: PropTypes.string,
    date_lost: PropTypes.string,
    user_id: PropTypes.number,
    tags: PropTypes.string,
    pictures: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
      })
    ),
  }),
  onClose: PropTypes.func.isRequired,
};

export default ModalFormulario;
