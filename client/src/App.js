import React, { useState } from "react";
import Router from "./Router";
import axios from "axios";
import { AuthContextProvider } from "./context/AuthContext";
import "./assets/global.scss";
import ForgottenPassword from "./components/auth/ForgottenPassword/ForgottenPassword";
import Navbar from "./components/layout/Navbar/Navbar";

axios.defaults.withCredentials = true;

function App() {
  const [forgottenPasswordIsShown, setForgottenPasswordIsShown] =
    useState(false);

  const showForgottenPasswordHandler = () => {
    setForgottenPasswordIsShown(true);
  };

  const hideForgottenPasswordHandler = () => {
    setForgottenPasswordIsShown(false);
  };

  return (
    <>
      {forgottenPasswordIsShown && (
        <ForgottenPassword onClose={hideForgottenPasswordHandler} />
      )}
      {/* <Navbar /> */}
      <AuthContextProvider>
        <Router onOpen={showForgottenPasswordHandler} />
      </AuthContextProvider>
    </>
  );
}

export default App;
