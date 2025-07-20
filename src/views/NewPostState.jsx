import { useState } from 'react';
import { usePetData } from '../hooks/usePetData';
import StateOption from '../components/PostPet/StatePet/StateOption';
import ContinueButton from '../components/PostPet/StatePet/ContinueButton';


const NewPostState = () => {

  const { petData, setPetData } = usePetData();
  const petState = petData.petData.state ;
  const [selectedState, setSelectedState] = useState(petState || 'Perdido');
  

  const handleOptionChange = (state) => {
    setSelectedState(state);
  };

  const handleContinue = () => {
    //console.log("Estado seleccionado:", selectedState);
    const updatedPetData = {
      ...petData,
      petData: {
        ...petData.petData,
        state: selectedState,
      },
    };
    setPetData(updatedPetData);
  };

  return (
    <div className="max-w-[375px] mx-auto p-4">
      <p className="text- text-[#FF797D] mb-4">¿Cuál es el estado actual?</p>

      <StateOption
        label="Perdido"
        checked={selectedState === 'Perdido'}
        onChange={() => handleOptionChange('Perdido')}
      />
      <StateOption
        label="Encontrado"
        checked={selectedState === 'Encontrado'}
        onChange={() => handleOptionChange('Encontrado')}
      />
      <StateOption
        label="En Adopción"
        checked={selectedState === 'En Adopción'}
        onChange={() => handleOptionChange('En Adopción')}
      />
      <StateOption
        label="Adoptado"
        checked={selectedState === 'Adoptado'}
        onChange={() => handleOptionChange('Adoptado')}
      />

      <ContinueButton onClick={handleContinue} />
    </div>
  );
};

export default NewPostState;
