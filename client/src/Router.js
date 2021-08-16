import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login/Login";
import Register from "./components/auth/Register/Register";
import AuthContext from "./context/AuthContext";
import LandingPage from "./components/pages/LandingPage/LandingPage";
import Navbar from "./components/layout/Navbar/Navbar";
import About from "./components/pages/About/About";
import AvailableJobs from "./components/pages/MyJobs/MyJobs";
import AdvertiseJobs from "./components/pages/AdvertiseJobs/AdvertiseJobs";
import JobSearchResult from "./components/pages/JobSearchResult/JobSearchResult";
import Profile from "./components/pages/Profile/Profile";

const Router = (props) => {
  const { loggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <div className="disclaimer-container">
        <p>
          Sorry, responsiveness for smaller devices is only available on the
          Redux version of this website
        </p>
      </div>
      <div className="router-container">
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
                  <Login
                    onClickForgotPassword={props.onOpenForgotPasswordModal}
                  />
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
                <JobSearchResult
                  onClickApply={props.onOpenApplicationFormModal}
                />
              </Route>
              <Route path="/advertise-jobs">
                <AdvertiseJobs />
              </Route>
              <Route path="/my-jobs">
                <AvailableJobs />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
            </>
          )}
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Router;
