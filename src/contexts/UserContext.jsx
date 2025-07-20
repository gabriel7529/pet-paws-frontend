import {createContext,   useEffect,  useState } from "react";
import {PropTypes} from 'prop-types';

export const UserContext = createContext();

const getInitialState = () => {
  const currentUser = sessionStorage.getItem("currentUser");
  return currentUser ? JSON.parse(currentUser) : null;
}

export const UserProvider = ({ children }) => {
  const [data,  setData] = useState(getInitialState);

  useEffect(() => {
    sessionStorage.setItem("currentUser", JSON.stringify(data));
  }, [data]);

  const updateUser = (newData) => {
    setData((prevData) => ({ ...prevData, ...newData }));
  };

  const login = (user) => {
    console.log(user);
  }

  const logout = () => {
    setData(null);
  }

  return (
    <UserContext.Provider value={{ data, setData, updateUser, login, logout}}>
      {children}
    </UserContext.Provider>
  );
}
UserProvider.propTypes = {
  children: PropTypes.node.isRequired
}
