import { useEffect, useReducer } from 'react';
import  PlacesContext  from './PlacesContext';
import  PlacesReducer  from './PlacesReducer';
import { getUserLocation }  from '../../helpers/getUserLocation'
import PropTypes from 'prop-types';



const INITIAL_STATE = {
    isLoading: true,
    userLocation: undefined,
    isLoadingPlaces: false,
    places: [],
};

const PlacesProvider = ({ children }) => {
    const [state, dispatch] = useReducer(PlacesReducer, INITIAL_STATE);

    // Obtener la ubicación del usuario
    useEffect(() => {
        getUserLocation()
            .then(lngLat => dispatch({ type: 'setUserLocation', payload: lngLat }))
            .catch(() => {
                console.error("Error al obtener la ubicación del usuario");
                dispatch({ type: 'setUserLocation', payload: null }); // En caso de error
            });
    }, []);

    return (
        <PlacesContext.Provider value={{ ...state }}>
            {children}
        </PlacesContext.Provider>
    );
};

// Definición de PropTypes
PlacesProvider.propTypes = {
  children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
  ]).isRequired
};

export default PlacesProvider;
