import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { formatData } from '../../helpers/formatPostData';

// Crear el contexto
export const PetContext = createContext();

// Proveedor del contexto
export const PetProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [petData, setPetData] = useState(
    formatData(user)
  );
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


