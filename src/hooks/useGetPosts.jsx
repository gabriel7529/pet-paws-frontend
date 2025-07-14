import { useEffect, useState } from "react";
import { fetchPost} from "../services/posts.js";

export const useGetPost = (id) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const postData = await fetchPost(id);
        if (postData) {
          setPost(postData);
        } else {
          setError('No post found');
        }
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  return { post, loading, error };
};
