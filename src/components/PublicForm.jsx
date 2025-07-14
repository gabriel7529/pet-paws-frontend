

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import FormField from "./FormField";

export function ModalFormulario() {


  const [openModal, setOpenModal] = useState(false);
  const [step, setStep] = useState(1);
  const { t } = useTranslation();

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
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };


  const handleFotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({ ...formData, foto: URL.createObjectURL(file) }); // Crear una URL temporal para la imagen
    }
  };

  const handleSubmit = () => {
    // Aquí se enviará el formulario a la API usando fetch
    fetch('http://localhost:8080/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(() => {
      setOpenModal(false);
    })
    .catch(error => {
      console.error('Error al enviar el formulario:', error);
    });
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
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
                { label: t("genderOptionsLabel1"), value: "macho" },
                { label: t("genderOptionsLabel2"), value: "hembra" },
              ]}
              value={formData.genero}
              onChange={handleChange}
            />
          </div>
        );
      case 2:
        return (
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
        );
      case 3:
        return (
          <div>
            <FormField
              label={t("contactLabel")}
              id="contacto"
              type="text"
              placeholder={t("contactPlaceholder")}
              value={formData.contacto}
              onChange={handleChange}
            />

            <p className="block text-sm font-medium text-gray-900 my-4"> {t("photoLabel")}</p>
            <div className="flex flex-col items-center mt-4">
              {/* Input de archivo oculto */}
              <input
                id="file-input"
                type="file"
                onChange={handleFotoChange}
                style={{ display: 'none' }} // Ocultamos el input original
              />


              <div className="w-64 h-64 mt-4 bg-[#fca5a5] flex items-center justify-center">
                {formData.foto ? (
                  <img src={formData.foto} alt="Preview" className="object-cover w-full h-full" />
                ) : (

                  <img src="/src/assets/img/petDog.png" alt="Default Preview" className="w-32 h-32 object-cover" />
                )}
              </div>
              <br></br>
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
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="snap-center">
        <div className="w-40">
        </div>
        <Button className="bg-[#fca5a5] text-black" onClick={() => setOpenModal(true)}>
        {t("functionButton")}
      </Button>
      </div>

      <Modal
        show={openModal}

        onClose={() => setOpenModal(false)}
      >
        <Modal.Header className="bg-[#F5E1DC]"><p className="text-[#DA6274] items-center">{t("titleFormPublish")}</p></Modal.Header>
        <Modal.Body className="bg-[#F5E1DC]">
        {renderStep()}
        </Modal.Body>
        <Modal.Footer className="flex justify-center gap-8 bg-[#F5E1DC]">
          {step > 1 && (
              <Button className="bg-gray-300" onClick={handlePrevStep}>
                {t("previousButton")}
              </Button>
            )}
            {step < 3 ? (
              <Button className="bg-blue-500" onClick={handleNextStep}>
                {t("nextButton")}
              </Button>
            ) : (
              <Button className="bg-green-500" onClick={handleSubmit}>
                {t("submitButton")}
              </Button>
            )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalFormulario;
