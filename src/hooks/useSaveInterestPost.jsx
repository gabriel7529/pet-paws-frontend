// useSaveInterestPost.jsx
import {useContext} from 'react';
import {PetContext} from '../contexts/PetContext';
import {savePost} from "../services/savedPosts";

export const useSaveInterestPost = () => {
  const {setSavedPosts} = useContext(PetContext);

  return async (postId) => {
    try {
      const newSavedPost = await savePost(postId);

      setSavedPosts((prevPosts) => [...prevPosts, newSavedPost]);
    } catch (error) {
      console.error("Error al guardar el post:", error);
    }
  };
};
