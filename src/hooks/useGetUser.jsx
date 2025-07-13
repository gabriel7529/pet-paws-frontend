import { useEffect, useState } from "react";
import { fetchUser } from "../services/users.js";

export const useGetUser = (id) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const user = await fetchUser(id);
      setUser(user);
    };
    fetchData();
  }, [id]);
  return {user};
}
