import { useContext } from 'react';
import { PetContext } from '../contexts/post/PetProvider';

export const usePetData = () => useContext(PetContext);
