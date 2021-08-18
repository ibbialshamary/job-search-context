import classes from "./JobSearchResult.module.scss";
import Button from "../../layout/Button/Button";
import FilteredJobItems from "./FilteredJobItems/FilteredJobItems";
import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../../context/AuthContext";

const JobSearchResult = (props) => {
  // context
  const { fetchFilteredJobs } = useContext(AuthContext);
  const { getRecentJobs } = useContext(AuthContext);
  const { getFilteredJobs } = useContext(AuthContext);

  // states
  const [location, setLocation] = useState();
  const [title, setTitle] = useState();
  const [autoUpdateEnabled, setAutoUpdateEnabled] = useState(false);

  // effects
  useEffect(() => {
    const interval = setInterval(() => {
      if (autoUpdateEnabled) {
        getRecentJobs();
        getFilteredJobs("all", "all");
      }
    }, 5000);

    return () => {
      clearTimeout(interval);
    };
  }, [autoUpdateEnabled, getFilteredJobs, getRecentJobs]);

  // methods
  const refreshJobs = () => {
    getRecentJobs();
    getFilteredJobs("all", "all");
  }

  const enableAutoUpdateHandler = () => {
    setAutoUpdateEnabled(true);
  };

  const disableAutoUpdateHandler = () => {
    setAutoUpdateEnabled(false);
  };

  const locationChangeHandler = (e) => {
    setLocation(e.target.value);
  };

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const fetchFilteredJobsNonContext = () => {
    fetchFilteredJobs(location, title);
  };

  return (
    <>
      <div className={classes["job-search-reuslt-page-container"]}>
        <div className={classes["job-search-result-container"]}>
          <br />
          <div className={classes["job-search-container"]}>
            <input
              type="text"
              className="no-border-right"
              placeholder="Location"
              value={location}
              onChange={locationChangeHandler}
            />

            <input
              type="text"
              className="no-border-right no-border-left"
              placeholder="Role Title"
              value={title}
              onChange={titleChangeHandler}
            />
            <Button
              class="mini no-border-left"
              onClick={fetchFilteredJobsNonContext}
            >
              Update Search
            </Button>
          </div>
          <br />
          <div className="update-data-buttons">
            <Button class="mini margin-right-class" onClick={refreshJobs}>
              New jobs may be available. Refresh?
            </Button>
            {autoUpdateEnabled && (
              <Button
                class="mini margin-left-class danger"
                onClick={disableAutoUpdateHandler}
              >
                Disable auto update recent jobs
              </Button>
            )}
            {!autoUpdateEnabled && (
              <Button
                class="mini hot margin-left-class"
                onClick={enableAutoUpdateHandler}
              >
                Enable auto update jobs
              </Button>
            )}
            <br />
            <br />
          </div>
          <FilteredJobItems />
          <br />
        </div>
      </div>
    </>
  );
};

export default JobSearchResult;
