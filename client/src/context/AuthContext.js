import axios from "axios";
import React, { useState, useEffect, createContext } from "react";

const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(undefined);

  const getLoggedIn = async () => {
    const loggedInResponse = await axios.get(
      "http://localhost:5000/authenticate/loggedIn"
    );
    setLoggedIn(loggedInResponse.data);
  };

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
export { AuthContextProvider };
