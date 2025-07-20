// useSavedPosts.jsx

import {useContext} from "react";
import SavedPostsContext from "../contexts/SavedPostsContext.jsx";

const useSavedPosts = () => useContext(SavedPostsContext);

export default useSavedPosts;
