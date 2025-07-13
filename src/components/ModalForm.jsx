

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import FormField from "./FormField";

export function ModalFormulario() {
  const [openModal, setOpenModal] = useState(false);
  const [foto, setFoto] = useState(null);
  const { t } = useTranslation();

  const handleFotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFoto(URL.createObjectURL(file)); // Crear una URL temporal para la imagen
    }
  };

  return (
    <>
      <div className="snap-center">
        <div className="w-40">
        </div>
        <Button className= "bg-[#fca5a5] text-black" onClick={() => setOpenModal(true)}>{t("functionButton")}</Button>
      </div>

      <Modal
        show={openModal}

        onClose={() => setOpenModal(false)}
      >
        <Modal.Header className="bg-[#F5E1DC]"><p className="text-[#DA6274] items-center">{t("titleFormPublish")}</p></Modal.Header>
        <Modal.Body className="bg-[#F5E1DC]">
          <div className="space-y-4 p-2">

            <div className="grid grid-cols-2 gap-4">
            <FormField
              label={t("nameLabel")}
              id="name"
              type="text"
              placeholder={t("namePlaceholder")}
            />
            <FormField
              label={t("animalTypeLabel")}
              id="tipo-animal"
              type="text"
              placeholder={t("animalTypeplaceholder")}
            />
            </div>

            <FormField
              label={t("genderLabel")}
              id="genero"
              type="radio"
              options={[
                { label: t("genderOptionsLabel1") , value: "macho" },
                { label: t("genderOptionsLabel2"), value: "hembra" },
              ]}
            />
            <FormField
              label={t("characteristicsLabel")}
              id="caracteristicas"
              type="textarea"
              placeholder={t("characteristicsPlaceholder")}
            />

            <div className="grid grid-cols-2 gap-4">

            <FormField
              label={t("sizeLabel")}
              id="tamano"
              type="text"
              placeholder={t("sizePlaceholder")}
            />
             <FormField
              label={t("ageLabel")}
              id="edad"
              type="number"
              placeholder={t("agePlaceholder")}
            />
            </div>
            <div className="grid grid-cols-2 gap-4">

            <FormField
                label={t("dayAndTimeLabel")}
                id="dia-hora"
                type="datetime-local"
                placeholder={t("dayAndTimePlaceholder")}
              />
              <FormField
                label={t("rewardLabel")}
                id="recompensa"
                type="number"
                placeholder={t("rewardPlaceholder")}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <FormField
                  label={t("contactLabel")}
                  id="contacto"
                  type="text"
                  placeholder={t("contactPlaceholder")}
                />
                <div className="flex justify-center ">
                  <Button className="bg-[#ff7074] text-black flex items-center justify-center">{t("markLocationButton")}</Button>
                </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">{t("photoLabel")}</label>
              <div className="flex items-center justify-center">
                {foto ? (
                  <img src={foto} alt="Foto" className="w-32 h-32 object-cover border" />
                ) : (
                  <div className="w-32 h-32 flex items-center justify-center bg-gray-200 border">

                  </div>
                )}
              </div>
              <div className="flex justify-center mt-4">
                  <label
                    htmlFor="file-input"
                    className="px-4 py-2 bg-[#ff4850] text-white rounded cursor-pointer text-center"
                  >
                    {t("selectPhotoButton")}
                  </label>
              </div>
              <input
                id="file-input"
                type="file"
                onChange={handleFotoChange}
                style={{ display: 'none' }}
                />
            </div>

            <FormField
              label={t("tagsLabel")}
              id="etiquetas"
              type="text"
              placeholder={t("tagsPlaceholder")}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-center gap-8 bg-[#F5E1DC]">
          <Button onClick={() => setOpenModal(false)} className="bg-[#ffaca4] text-black">{t("BotonPublicar")}</Button>
          <Button onClick={() => setOpenModal(false)} className="bg-[#df1811] text-white">
            {t("BotonDenegar")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalFormulario;
