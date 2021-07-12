import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
// import Navbar from "./components/layout/Navbar/Navbar";
import AuthContext from "./context/AuthContext";

const Router = () => {
  const { loggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Switch>
        <Route exact path="/">
          <div>Home</div>
        </Route>
        {loggedIn === false && (
          <>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <div>
                <Login />
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
