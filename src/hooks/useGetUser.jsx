import { useEffect, useState } from "react";
import { fetchUser } from "../services/users.js";

export const useGetUser = (id) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      try {
        setLoading(true);
        const user = await fetchUser(id);
        setUser(user);
      } catch (err) {
        setError("Error al obtener el usuario: " + err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);
  return {user, loading, error};
}
