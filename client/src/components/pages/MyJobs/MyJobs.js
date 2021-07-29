import classes from "./MyJobs.module.scss";
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import { MdLocationOn as LocationIcon } from "react-icons/md";
import { FaHotjar as HotIcon, FaPoundSign as SalaryIcon } from "react-icons/fa";
import Button from "../../layout/Button/Button";
import axios from "axios";

const MyJobs = (props) => {
  // state
  const [isMyJobsEmpty, setIsMyJobsEmpty] = useState();

  // context
  const { getJobApplications } = useContext(AuthContext);
  const { userJobApplications } = useContext(AuthContext);

  const { getAdvertisedAndAppliedToJobs } = useContext(AuthContext);
  const { myJobs } = useContext(AuthContext);

  const { daysPostedCalculator } = useContext(AuthContext);
  const { setSelectedJob } = useContext(AuthContext);
  const { loggedInUser } = useContext(AuthContext);

  // methods
  const refreshMyJobsHandler = async () => {
    getAdvertisedAndAppliedToJobs(loggedInUser);
    if (myJobs.length < 1) {
      setIsMyJobsEmpty(true);
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
          {isMyJobsEmpty && (
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
                <div className={classes["job-item-container"]}>
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
                          by you {daysPostedCalculator(job.date)} day(s) ago |{" "}
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
                          by you {daysPostedCalculator(job.date)} day(s) ago |{" "}
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
