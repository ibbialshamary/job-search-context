import React, { useState, useContext } from "react";
import Router from "./Router";
import axios from "axios";
import { AuthContextProvider } from "./context/AuthContext";
import "./assets/global.scss";
import ForgottenPassword from "./components/auth/ForgottenPassword/ForgottenPassword";
import ApplicationForm from "./components/pages/ApplicationForm/ApplicationForm";

axios.defaults.withCredentials = true;

function App() {
  const [forgottenPasswordIsShown, setForgottenPasswordIsShown] =
    useState(false);
  const [applicationFormIsShwon, setApplicationFormIsShwon] = useState(false);

  const showForgottenPasswordHandler = () => {
    setForgottenPasswordIsShown(true);
  };

  const hideForgottenPasswordHandler = () => {
    setForgottenPasswordIsShown(false);
  };

  const showApplicationFormHandler = () => {
    setApplicationFormIsShwon(true);
  };

  const hideApplicationFormHandler = () => {
    setApplicationFormIsShwon(false);
  };

  return (
    <>
      <AuthContextProvider>
        {forgottenPasswordIsShown && (
          <ForgottenPassword
            onCloseForgotPasswordModal={hideForgottenPasswordHandler}
          />
        )}
        {applicationFormIsShwon && (
          <ApplicationForm
            onCloseApplicationFormModal={hideApplicationFormHandler}
          />
        )}
        <Router
          onOpenForgotPasswordModal={showForgottenPasswordHandler}
          onOpenApplicationFormModal={showApplicationFormHandler}
        />
      </AuthContextProvider>
    </>
  );
}

export default App;
