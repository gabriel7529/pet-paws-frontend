//useRemoveInterestPost.jsx
import {useCallback, useContext} from 'react';
import {PetContext} from '../contexts/PetContext';
import {deletePost} from "../services/savedPosts";

export const useRemoveInterestPost = () => {
  const {setSavedPosts} = useContext(PetContext);
  return useCallback(async (interestedList) => {
    try {
      if (interestedList.length > 0) {
        for (const post of interestedList) {
          await deletePost(post.id);
        }
        setSavedPosts((prevPosts) => prevPosts.filter((post) => !interestedList.includes(post)));
      }
    } catch (error) {
      console.error('Error al eliminar el post guardado:', error);
    }
  }, [setSavedPosts]);
};
