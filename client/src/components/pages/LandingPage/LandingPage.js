import React from "react";
import Button from "../../layout/Button/Button";
import classes from "./LandingPage.module.scss";

const LandingPage = () => {
  return (
    <>
      <div className="flex-box-container">
        <div className={classes["landing-page-container"]}>
          <div>
            <h1>
              Find your dream <br />
              job with <span className="logo-underline">Buzzra.</span>
            </h1>
            <p>
              Get your dream job by giving this service,
              <br /> the employers and your self a chance.
            </p>
            <br />

            <div className={classes["job-search-container"]}>
              <input
                type="text"
                className="mini-input no-border-right"
                placeholder="Location"
              />
              <input
                type="text"
                className="no-border-right no-border-left"
                placeholder="Enter a role name or keyword"
              />
              <Button class="mini-button no-border-left">Explore Now</Button>
            </div><br />
            <p><strong>Popular searches this week: </strong> None to be populated</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
