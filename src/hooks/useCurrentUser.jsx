import { useEffect, useState } from "react"

export const useCurrentUser=()=>{
  const [current_user,setUser]=useState({});

  useEffect(()=>{
    setUser(
      {
        id:1,
        name:"Jhon",
        lastname:"Doe",
        picture:"user.png"
      }
    );
  },[]);

  return current_user;
};
