import { useState, useEffect } from "react";
import { fetchPosts, updatePost as patchPost } from "../services/posts";
import { fetchUser } from "../services/users";

const useAllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const data = await fetchPosts();

        const postsWithUser = await Promise.all(
          data.map(async (post) => {
            post.user = await fetchUser(post.userId);
            post.createdAt = new Date(post.createdAt).toLocaleString();
            post.updatedAt = new Date(post.updatedAt).toLocaleString();
            return post;
          })
        );

        postsWithUser.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
        setPosts(postsWithUser);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPosts();
  }, []);

  const updatePost = async (id, data) => {
    setUpdateLoading(true);
    try {
      await patchPost(id, data);
      const {postData} = data
      setPosts(
        posts.map((post) => (post.id === id ? { ...post, ...postData } : post))
      )
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setUpdateLoading(false);
    }
  }

  return { posts, loading, error, updatePost, updateLoading };
};

export default useAllPosts;
