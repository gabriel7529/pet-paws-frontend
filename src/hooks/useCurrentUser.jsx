import {useEffect, useState} from "react";
import {fetchLoggedUser} from "../services/users.js";

export const useCurrentUser = () => {
  const [current_user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const savedUser = localStorage.getItem("user");

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        try {
          const token = localStorage.getItem("token");
          if (token) {
            const user = await fetchLoggedUser();
            setUser(user);
          } else {
            setUser(false);
          }
        } catch (error) {
          console.error(error);
          setUser(false);
        }
      }
    };

    fetchData();
  }, []);

  return current_user;
};
