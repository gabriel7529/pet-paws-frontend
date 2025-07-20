import { createContext } from 'react';

const PlacesContext = createContext({
    isLoading: true,
    userLocation: undefined,
    isLoadingPlaces: false,
    places: [],
});

export default PlacesContext;
