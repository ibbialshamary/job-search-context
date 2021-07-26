import classes from "./JobSearchResult.module.scss";
import Button from "../../layout/Button/Button";
import FilteredJobItems from "./FilteredJobItems/FilteredJobItems";
import React, { useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";

const JobSearchResult = (props) => {
  // context
  const { fetchFilteredJobs } = useContext(AuthContext);

  // states
  const [location, setLocation] = useState();
  const [title, setTitle] = useState();

  // methods
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
            <FilteredJobItems onOpenApplicationFormModal={props.onClickApply} />
            <br />
          </div>
        </div>
      </div>
    </>
  );
};

export default JobSearchResult;
