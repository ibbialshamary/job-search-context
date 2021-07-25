import classes from "./JobSearchResult.module.scss";
import Button from "../../layout/Button/Button";
import FilteredJobItems from "./FilteredJobItems/FilteredJobItems";
import React, { useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";

const JobSearchResult = () => {
  // context
  const { getFilteredJobs } = useContext(AuthContext);

  // states
  const [location, setLocation] = useState(null);

  // methods
  const locationChangeHandler = (e) => {
    setLocation(e.target.value);
  };

  const fetchFilteredJobs = () => {
    !location ? getFilteredJobs("none") : getFilteredJobs(location);
  };

  return (
    <>
      <div className="flex-box-container">
        <div className={classes["job-search-reuslt-page-container"]}>
          <div>
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
                placeholder="Role Title"
              />
              <Button
                class="mini-button no-border-left"
                onClick={fetchFilteredJobs}
              >
                Update Search
              </Button>
            </div>
            <br />
            <FilteredJobItems />
            <br />
          </div>
        </div>
      </div>
    </>
  );
};

export default JobSearchResult;
