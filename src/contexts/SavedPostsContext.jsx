// contexts/SavedPostsContext.jsx
import {createContext, useEffect, useState} from "react";
import {fetchSavedPosts} from "../services/savedPosts.js";
import {useCurrentUser} from "../hooks/useCurrentUser.jsx";
import PropTypes from 'prop-types';

const SavedPostsContext = createContext();

export const SavedPostsProvider = ({children}) => {
  const current_user = useCurrentUser();
  const [saved_posts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (current_user && current_user?.id) {
        const posts = await fetchSavedPosts();
        setSavedPosts(posts);
      }
      setLoading(false);
    };
    fetchData();
  }, [current_user]);

  return (
    <SavedPostsContext.Provider value={{saved_posts, setSavedPosts, loading}}>
      {children}
    </SavedPostsContext.Provider>
  );
};

SavedPostsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SavedPostsContext;
