import React, { useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import Button from "../../layout/Button/Button";
import classes from "./LandingPage.module.scss";
import { useHistory } from "react-router";

const LandingPage = () => {
  const [location, setLocation] = useState("");

  const history = useHistory();
  const { getFilteredJobs } = useContext(AuthContext);

  // methods
  const locationChangeHandler = (e) => {
    setLocation(e.target.value);
  };

  const fetchFilteredJobs = () => {
    getFilteredJobs(location);
    history.push("/job-search-result");
  };

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
                value={location}
                onChange={locationChangeHandler}
              />
              <input
                type="text"
                className="no-border-right no-border-left"
                placeholder="Enter a role name or keyword"
              />
              <Button
                class="mini-button no-border-left"
                onClick={fetchFilteredJobs}
              >
                Explore Now
              </Button>
            </div>
            <br />
            <p>
              <strong>Popular searches this week: </strong> None to be populated
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
