import { useEffect, useState } from "react"
import {fetchUser} from "../services/users.js";

export const useCurrentUser=()=>{
  const [current_user,setUser]=useState({});

  useEffect(()=>{
    const fetchData = async () => {
      const user = await fetchUser(1);
      setUser(user);
    };
    fetchData();
  },[]);

  return current_user;
};
