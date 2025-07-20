import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Crear el contexto
const PetContext = createContext();

// Proveedor del contexto
export const PetProvider = ({ children }) => {
  const [petData, setPetData] = useState(() => {
    const savedData = localStorage.getItem('petData');
    return savedData ?
    JSON.parse(savedData) : {
      id: '',
      name: 'anonimo',
      pet_type: '',
      pet_gender: '',
      pet_description: '',
      pet_size: '',
      pet_age: '',
      date_lost: '',
      reward: '60',
      user_id: 1,
      pictures: []
    };

  });

  useEffect(() => {
    localStorage.setItem('petData', JSON.stringify(petData));
  }, [petData]);

  return (
    <PetContext.Provider value={{ petData, setPetData }}>
      {children}
    </PetContext.Provider>
  );

};

PetProvider.propTypes = {
  children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
  ]).isRequired
};

// Hook para usar el contexto
export const usePetData = () => useContext(PetContext);

