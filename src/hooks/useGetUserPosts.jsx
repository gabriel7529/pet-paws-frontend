import { useEffect, useState } from "react";
import { fetchPostsByUser } from "../services/posts.js";

export const useGetUserPosts = (id) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const posts = await fetchPostsByUser(id);
      setPosts(posts);
    };
    fetchData();
  }, [id]);
  return {posts};
}
