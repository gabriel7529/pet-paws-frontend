// SavePost.jsx
import {useContext, useEffect, useState} from "react";
import {PetContext} from "../../contexts/PetContext.js";
import {useSaveInterestPost} from "../../hooks/useSaveInterestPost.jsx";
import {useRemoveInterestPost} from "../../hooks/useRemoveInterestPost.jsx";
import PropTypes from "prop-types";
import useSavedPosts from "../../hooks/useSavedPosts.jsx";

const SavePost = ({post, pos_x, pos_y}) => {
  const {current_user} = useContext(PetContext);
  const {saved_posts} = useSavedPosts();
  const [isSaved, setIsSaved] = useState(false);
  const saveInterestPost = useSaveInterestPost();
  const removeInterestPost = useRemoveInterestPost();

  useEffect(() => {
    if (Array.isArray(saved_posts)) {
      const isAlreadySaved = saved_posts.some(
        (savedPost) => Number(savedPost.postId) === Number(post.id)
      );
      setIsSaved(isAlreadySaved);
    }
  }, [saved_posts, post]);

  const handleSavePostClick = () => {
    if (current_user && post.id) {
      if (isSaved) {
        let postsToDelete = saved_posts.filter((savedPost) => savedPost.postId === post.id);
        removeInterestPost(postsToDelete);
      } else {
        saveInterestPost(post.id);
      }
    } else {
      console.error("Usuario o ID de post no disponibles.");
    }
  };

  const inlineStyles = {
    bottom: `${pos_x}px`,
    right: `${pos_y}px`,
  };

  const classes = `absolute bg-transparent z-5 w-[35px] hover:cursor-pointer`;

  return (
    <div
      className={classes}
      style={inlineStyles}
      onClick={handleSavePostClick}
    >
      <svg className="text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>bookmark-outline</title>
        {isSaved ? (
          <path
            fill="currentColor"
            d="M17,3H7A2,2 0 0,0 5,5V21L12,18L19,21V5C19,3.89 18.1,3 17,3Z"
          />
        ) : (
          <path
            fill="currentColor"
            d="M17,18L12,15.82L7,18V5H17M17,3H7A2,2 0 0,0 5,5V21L12,18L19,21V5C19,3.89 18.1,3 17,3Z"
          />
        )}
      </svg>
    </div>
  );
};

SavePost.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    pet_type: PropTypes.string,
    pet_gender: PropTypes.string,
    pet_description: PropTypes.string,
    pet_size: PropTypes.string,
    pet_age: PropTypes.string,
    date_lost: PropTypes.string,
    contacto: PropTypes.string,
    tags: PropTypes.string,
    pictures: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
      })
    ),
  }).isRequired,
  pos_x: PropTypes.number,
  pos_y: PropTypes.number,
};

export default SavePost;
