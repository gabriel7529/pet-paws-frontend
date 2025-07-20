import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [selectedSection, setSelectedSection] = useState('settings.user.edit');

  return (
    <ConfigContext.Provider value={{ selectedSection, setSelectedSection }}>
      {children}
    </ConfigContext.Provider>
  );
}

ConfigProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

