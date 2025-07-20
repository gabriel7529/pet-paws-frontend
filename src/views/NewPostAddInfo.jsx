import { usePetData } from '../contexts/post/PetProvider';
import FormSelect from '../components/PostPet/AddInfo/FormSelect';
import FormField from '../components/FormField';
import ContinueButton from '../components/PostPet/StatePet/ContinueButton';


const NewPostAddInfo = () => {

  const { petData, setPetData } = usePetData();

  const handleSubmit = () => {
    console.log(petData);
  };

  const handleChange = (key, value) => {
    setPetData({
      ...petData,
      [key]: value,
    });
  };

  return (
    <div className="min-h-screen flex items-start justify-center">
      <form className="bg-white p-6 w-full max-w-md" onSubmit={handleSubmit}>
        <FormField
          label="Nombre"
          type="text"
          value={petData.pet_name} // Usamos el valor del contexto
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder='Nombre de la mascota'
        />
        <FormSelect
          label="Especie"
          value={petData.pet_type} // Usamos el valor del contexto
          onChange={(e) => handleChange('pet_type', e.target.value)}
          options={['Perro', 'Gato', 'Pájaro', 'Conejo', 'Otro']}
        />

        <FormSelect
          label="Sexo"
          value={petData.pet_gender} // Usamos el valor del contexto
          onChange={(e) => handleChange('pet_gender', e.target.value)}
          options={['Macho', 'Hembra']}
        />

        <FormSelect
          label="Edad aproximada"
          value={petData.pet_age} // Usamos el valor del contexto
          onChange={(e) => handleChange('pet_age', e.target.value)}
          options={['Cachorro', 'Joven', 'Adulto', 'Anciano']}
        />

        <FormSelect
          label="Tamaño"
          value={petData.pet_size} // Usamos el valor del contexto
          onChange={(e) => handleChange('pet_size', e.target.value)}
          options={['Pequeño', 'Mediano', 'Grande']}
        />

        <FormField
              label="Fecha aproximada de desaparición o aparición"
              type="datetime-local"
              value={petData.date_lost}
              onChange={(e) => handleChange('date_lost', e.target.value)}
        />
        <ContinueButton text="Continuar" onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default NewPostAddInfo;
