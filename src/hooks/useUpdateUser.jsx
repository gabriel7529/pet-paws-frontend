import { useState } from "react";
import { patchUser, updateUser } from "../services/users.js"; // Importa ambas funciones

export const useUpdateUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveUser = async (id, userData, method = "PATCH") => {
    setIsLoading(true);
    setError(null);
    try {
      let updatedUser;
      if (method === "PUT") {
        updatedUser = await updateUser(id, userData);
      } else {
        updatedUser = await patchUser(id, userData);
      }
      return updatedUser;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { saveUser, isLoading, error };
};
