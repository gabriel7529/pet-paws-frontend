import { usePetData } from '../hooks/usePetData';
import FormSelect from '../components/PostPet/AddInfo/FormSelect';
import FormField from '../components/FormField';
import ContinueButton from '../components/PostPet/StatePet/ContinueButton';
import { useTranslation } from "react-i18next";


const NewPostAddInfo = () => {
  const { t } = useTranslation();
  const { petData, setPetData } = usePetData();

  const languageMap = {
    petType: {
      'DOG': 'Perro',
      'CAT': 'Gato',
      'BIRD': 'Pájaro',
      'RABBIT': 'Conejo',
      'OTHER': 'Otro',
      'Perro': 'DOG',
      'Gato': 'CAT',
      'Pájaro': 'BIRD',
      'Conejo': 'RABBIT',
      'Otro': 'OTHER',
    },
    gender: {
      'MALE': 'Macho',
      'FEMALE': 'Hembra',
      'Macho': 'MALE',
      'Hembra': 'FEMALE',
    },
    age: {
      'PUPPY': 'Cachorro',
      'YOUNG': 'Joven',
      'ADULT': 'Adulto',
      'SENIOR': 'Anciano',
      'Cachorro': 'PUPPY',
      'Joven': 'YOUNG',
      'Adulto': 'ADULT',
      'Anciano': 'SENIOR',
    },
    size: {
      'SMALL': 'Pequeño',
      'MEDIUM': 'Mediano',
      'LARGE': 'Grande',
      'Pequeño': 'SMALL',
      'Mediano': 'MEDIUM',
      'Grande': 'LARGE',
    },
  };

  const getDisplayValue = (section, value) => {
    return languageMap[section][value] || value;
  };

  const handleSubmit = () => {
    console.log(petData);
  };

  const handleChange = (section, key, value) => {
    const updatedData = {
      ...petData,
      [section]: {
        ...petData[section],
        [key]: value.toUpperCase(),
      },
    };
    setPetData(updatedData);
  };

  return (
    <div className="min-h-screen flex items-start justify-center">
      <form className="bg-white p-6 w-full max-w-md" onSubmit={handleSubmit}>
        <FormField
          label={t("namePet")}
          type="text"
          value={petData.petData.name} // Usamos el valor del contexto
          onChange={(e) => handleChange('petData', 'name', e.target.value)}
          placeholder='Nombre de la mascota'
        />
        <br/>
        <FormSelect
          label={t("speciesPet")}
          value={getDisplayValue('petType', petData.petData.petType)} // Usamos el valor del contexto
          onChange={(e) => {
            const valueMap = {
              'Perro': 'DOG',
              'Gato': 'CAT',
              'Pájaro': 'BIRD',
              'Conejo': 'RABBIT',
              'Otro': 'OTHER',
            };
            handleChange('petData', 'petType', valueMap[e.target.value]);
          }}
          options={['Perro', 'Gato', 'Pájaro', 'Conejo', 'Otro']}
        />

        <FormSelect
          label={t("genderLabel")}
          value={getDisplayValue('gender',petData.petData.gender)} // Usamos el valor del contexto
          onChange={(e) => {
            const valueMap = {
              'Macho': 'MALE',
              'Hembra': 'FEMALE',
            };
            handleChange('petData', 'gender', valueMap[e.target.value]);
          }}
          options={['Macho', 'Hembra']}
        />

        <FormSelect
          label={t("approximateAgePet")}
          value={getDisplayValue('age',petData.petData.age)} // Usamos el valor del contexto
          onChange={(e) => {
            const valueMap = {
              'Cachorro': 'PUPPY',
              'Joven': 'YOUNG',
              'Adulto': 'ADULT',
              'Anciano': 'SENIOR',
            };
            handleChange('petData', 'age', valueMap[e.target.value]);
          }}
          options={['Cachorro', 'Joven', 'Adulto', 'Anciano']}
        />

        <FormSelect
          label={t("sizeLabel")}
          value={getDisplayValue('size',petData.petData.size)} // Usamos el valor del contexto
          onChange={(e) => {
            const valueMap = {
              'Pequeño': 'SMALL',
              'Mediano': 'MEDIUM',
              'Grande': 'LARGE',
            };
            handleChange('petData', 'size', valueMap[e.target.value]);
          }}
          options={['Pequeño', 'Mediano', 'Grande']}
        />

        <FormField
              label={t("approximateDate")}
              type="datetime-local"
              value={petData.date_lost}
              onChange={(e) => handleChange('', 'date_lost', e.target.value)}
        />
        <ContinueButton text="Continuar" onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default NewPostAddInfo;
