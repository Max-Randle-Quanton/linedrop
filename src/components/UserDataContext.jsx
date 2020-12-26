import React, { useState, createContext } from "react";

export const UserDataContext = createContext();

const UserDataContextProvider = (props) => {
  const [userData, setUserData] = useState({
    loggedIn: false,
  });

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {props.children}
    </UserDataContext.Provider>
  );
};

export default UserDataContextProvider;
