import classes from "./FilteredJobItems.module.scss";
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../../../context/AuthContext";
import { MdLocationOn as LocationIcon } from "react-icons/md";
import { FaHotjar as HotIcon, FaPoundSign as SalaryIcon } from "react-icons/fa";
import Button from "../../../layout/Button/Button";

const JobItem = () => {
  // context
  const { filteredJobs } = useContext(AuthContext);
  const { getFilteredJobs } = useContext(AuthContext);
  const { getAllJobs } = useContext(AuthContext);
  const { daysPostedCalculator } = useContext(AuthContext);

  const { recentJobs } = useContext(AuthContext);

  //methods
  const filterAllJobs = () => {
    getFilteredJobs("all");
  };

  // effects
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Test");
    }, 6000);

    return () => {
      clearTimeout(interval);
    };
  }, []);

  return (
    <>
      <h1>
        <strong>Jobs filtered just for you</strong>
      </h1>
      <p>{filteredJobs && filteredJobs.length} available jobs!</p>
      <hr />
      {filteredJobs && filteredJobs.length < 1 && (
        <>
          <p>
            Sorry, no available jobs 🦗, please update your search or
            alternatively:
          </p>
          <Button class="mini-button" onClick={filterAllJobs}>
            View all jobs
          </Button>
        </>
      )}
      {filteredJobs &&
        filteredJobs.map((job, index) => (
          <div key={index}>
            <div className={classes["job-item-container"]}>
              <div className={classes["job-item"]}>
                <p>
                  <strong>{job.company}</strong> is looking for a{" "}
                  <strong>{job.title}</strong>
                  {daysPostedCalculator(job.date) < 1 && (
                    <HotIcon className={classes.icon} />
                  )}
                  <div className={classes["salary-location"]}>
                    <div className={classes.salary}>
                      <SalaryIcon /> | {job.salary},000
                    </div>
                    <div className={classes.location}>
                      <LocationIcon /> | {job.location}
                    </div>
                  </div>
                  {daysPostedCalculator(job.date) < 1 && <p>Recently posted</p>}
                  {daysPostedCalculator(job.date) > 0 && (
                    <p>Posted {daysPostedCalculator(job.date)} day(s) ago</p>
                  )}
                  <br />
                  {job.tags
                    .trim()
                    .split(",")
                    .map((tag, index) => (
                      <div className="tags-container" key={index}>
                        <p className="tag-item">{tag}</p>
                      </div>
                    ))}
                </p>
              </div>
            </div>
            <br />
          </div>
        ))}

      <h1>
        <strong>Recent new jobs</strong>
      </h1>
      <hr />
      <p>{recentJobs && recentJobs.length} job(s) added today!</p>
      {recentJobs &&
        recentJobs.map((job, index) => (
          <div>
            <div key={index}>
              <div className={classes["job-item-container"]}>
                <div className={classes["job-item"]}>
                  <p>
                    <strong>{job.company}</strong> is looking for a{" "}
                    <strong>{job.title}</strong>
                    {daysPostedCalculator(job.date) < 1 && (
                      <HotIcon className={classes.icon} />
                    )}
                    <div className={classes["salary-location"]}>
                      <div className={classes.salary}>
                        <SalaryIcon /> | {job.salary},000
                      </div>
                      <div className={classes.location}>
                        <LocationIcon /> | {job.location}
                      </div>
                    </div>
                    {daysPostedCalculator(job.date) < 1 && (
                      <p>Recently posted</p>
                    )}
                    {daysPostedCalculator(job.date) > 0 && (
                      <p>Posted {daysPostedCalculator(job.date)} day(s) ago</p>
                    )}
                    <br />
                    {job.tags
                      .trim()
                      .split(",")
                      .map((tag, index) => (
                        <div className="tags-container" key={index}>
                          <p className="tag-item">{tag}</p>
                        </div>
                      ))}
                  </p>
                </div>
              </div>
              <br />
            </div>
          </div>
        ))}
      <Button class="mini-button" onClick={getAllJobs}>
        New recent jobs available. Refresh?
      </Button>
      <br />
    </>
  );
};

export default JobItem;
