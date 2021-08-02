import classes from "./MyJobs.module.scss";
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import { MdLocationOn as LocationIcon } from "react-icons/md";
import { FaHotjar as HotIcon, FaPoundSign as SalaryIcon } from "react-icons/fa";
import Button from "../../layout/Button/Button";
import axios from "axios";

const MyJobs = (props) => {
  // state

  // context
  const { getJobApplications } = useContext(AuthContext);
  const { userJobApplications } = useContext(AuthContext);

  const { getAdvertisedAndAppliedToJobs } = useContext(AuthContext);
  const { myJobs } = useContext(AuthContext);

  const { daysPostedCalculator } = useContext(AuthContext);
  const { setSelectedJob } = useContext(AuthContext);
  const { loggedInUser } = useContext(AuthContext);

  // methods
  const deleteJobHandler = async (jobId) => {
    try {
      await axios.delete(`http://localhost:5000/jobs/${jobId}`);
      refreshMyJobsHandler();
    } catch (error) {
      alert("Failed");
    }
  };
  const refreshMyJobsHandler = async () => {
    if (loggedInUser) {
      getAdvertisedAndAppliedToJobs(loggedInUser);
    }
  };

  return (
    <>
      <div className={classes["flex-box-container"]}>
        <div className={classes["my-jobs-container"]}>
          <h1>
            <strong>My jobs</strong>
          </h1>
          <p>Your jobs applied to or advertised appear here</p>
          <hr />
          {myJobs && myJobs.length < 1 && (
            <>
              <p>You have not applied to or advertised any jobs 🦗</p>
              <Button class="mini" onClick={refreshMyJobsHandler}>
                Refresh my jobs
              </Button>{" "}
              <br />
              <br />
            </>
          )}

          {myJobs &&
            myJobs.map((job, index) => (
              <div key={index}>
                <div
                  className={`${classes["job-item-container"]} ${
                    job.advertiserEmail === loggedInUser ? "" : classes.applied
                  }`}
                >
                  <div className={classes["job-item"]}>
                    <p>
                      <strong>{job.title}</strong> at
                      <strong> {job.company}</strong>
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
                        <p>
                          {job.advertiserEmail === loggedInUser
                            ? "Advertised"
                            : "Applied to"}{" "}
                          by you{" "}
                          {daysPostedCalculator(job.date) < 1
                            ? "today"
                            : "day(s) ago"}{" "}
                          |{" "}
                          <span class="hot">
                            {job.jobApplications.length} applicant(s)
                          </span>
                        </p>
                      )}
                      {daysPostedCalculator(job.date) > 0 && (
                        <p>
                          {job.advertiserEmail === loggedInUser
                            ? "Advertised"
                            : "Applied to"}{" "}
                          by you{" "}
                          {daysPostedCalculator(job.date) < 1
                            ? "today"
                            : "day(s) ago"}{" "}
                          |{" "}
                          <span className="hot">
                            {job.jobApplications.length} applicant(s)
                          </span>
                        </p>
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
                {loggedInUser === job?.advertiserEmail && (
                  <>
                    <Button
                      onClick={() => deleteJobHandler(job._id)}
                      class="mini danger margin-left apply-now no-transition-transform"
                    >
                      Delete Job
                    </Button>
                    <br />
                  </>
                )}
                <br />
                <br />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default MyJobs;
