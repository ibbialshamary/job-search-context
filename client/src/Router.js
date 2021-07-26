import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login/Login";
import Register from "./components/auth/Register/Register";
import AuthContext from "./context/AuthContext";
import LandingPage from "./components/pages/LandingPage/LandingPage";
import Navbar from "./components/layout/Navbar/Navbar";
import About from "./components/pages/About/About";
import AvailableJobs from "./components/pages/AvailableJobs/AvailableJobs";
import AdvertiseJobs from "./components/pages/AdvertiseJobs/AdvertiseJobs";
import JobSearchResult from "./components/pages/JobSearchResult/JobSearchResult";

const Router = (props) => {
  const { loggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        {loggedIn === false && (
          <>
            <Route exact path="/">
              <About />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <div>
                <Login onClickForgotPassword={props.onOpenForgotPasswordModal} />
              </div>
            </Route>
          </>
        )}
        {loggedIn === true && (
          <>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route path="/search-jobs">
              <LandingPage />
            </Route>
            <Route path="/job-search-result">
              <JobSearchResult onClickApply={props.onOpenApplicationFormModal} />
            </Route>
            <Route path="/available-jobs">
              <AvailableJobs />
            </Route>
            <Route path="/advertise-jobs">
              <AdvertiseJobs />
            </Route>
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
