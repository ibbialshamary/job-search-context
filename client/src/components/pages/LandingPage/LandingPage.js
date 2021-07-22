import React from "react";
import Logout from "../../auth/Logout/Logout";
import Navbar from "../../layout/Navbar/Navbar";
import classes from "./LandingPage.module.scss";

const LandingPage = () => {
  return (
    <>
      <div className="flex-box-container">
        <div className={classes["landing-page-container"]}>
          <div>
            <p>Welcome to my world.</p>
            <Logout />
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
