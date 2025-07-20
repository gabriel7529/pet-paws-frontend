import { useState, useEffect } from "react";
import {fetchUsers, patchUser} from '../services/users'
const useAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const data = await fetchUsers();
        const sortedData = data.sort((a, b) => a.email.localeCompare(b.email));
        setUsers(sortedData);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllUsers();
  }, []);

  const updateUser = async (id, data) => {
    setUpdateLoading(true);
    try {
      await patchUser(id, data);
      setUsers(users.map((user) => (user.id === id ? { ...user, ...data } : user)));

    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setUpdateLoading(false);
    }
  }

  return { users, loading, error, updateUser, updateLoading};
}

export default useAllUsers;
