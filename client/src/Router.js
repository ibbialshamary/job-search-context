import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login/Login";
import Register from "./components/auth/Register/Register";
import Logout from "./components/auth/Logout/Logout";
// import Navbar from "./components/layout/Navbar/Navbar";
import AuthContext from "./context/AuthContext";
import LandingPage from "./components/pages/LandingPage/LandingPage";

const Router = (props) => {
  const { loggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        {loggedIn === false && (
          <>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <div>
                <Login onClick={props.onOpen} />
              </div>
            </Route>
          </>
        )}
        {loggedIn === true && (
          <>
            <Route path="/customer">
              <div>Customers</div>
            </Route>
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
};

export default Router;