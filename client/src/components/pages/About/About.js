import React, { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import classes from "./About.module.scss";

const About = () => {
  const { loggedIn } = useContext(AuthContext);

  return (
    <>
      <div className="flex-box-container">
        <div className={classes["about-page-container"]}>
          {loggedIn === false && (
            <>
              <p>Unauthorised, please login or register</p>
            </>
          )}
          {loggedIn === true && (
            <>
              <p>About page</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default About;
