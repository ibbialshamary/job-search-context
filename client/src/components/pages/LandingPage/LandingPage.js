import React, { useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import Button from "../../layout/Button/Button";
import classes from "./LandingPage.module.scss";
import { useHistory } from "react-router";

const LandingPage = () => {
  // states
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");

  const history = useHistory();
  
  // context
  const { fetchFilteredJobs } = useContext(AuthContext);
  const { getAllJobs } = useContext(AuthContext);
  const { getRecentJobs } = useContext(AuthContext);

  // methods
  const locationChangeHandler = (e) => {
    setLocation(e.target.value);
  };

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const fetchFilteredJobsNonContext = () => {
    fetchFilteredJobs(location, title);
    getRecentJobs();
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
                value={title}
                onChange={titleChangeHandler}
              />
              <Button
                class="mini no-border-left"
                onClick={fetchFilteredJobsNonContext}
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
