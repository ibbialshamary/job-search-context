import classes from "./FilteredJobItems.module.scss";
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../../../context/AuthContext";
import { MdLocationOn as LocationIcon } from "react-icons/md";
import { FaHotjar as HotIcon, FaPoundSign as SalaryIcon } from "react-icons/fa";
import Button from "../../../layout/Button/Button";

const JobItem = (props) => {
  // state
  const [autoUpdateEnabled, setAutoUpdateEnabled] = useState(false);
  const [isFilteredJobsResultEmpty, setIsFilteredJobsResultEmpty] =
    useState(false);
  const [isRecentJobsResultEmpty, setIsRecentJobsResultEmpty] = useState(false);

  // context
  const { filteredJobs } = useContext(AuthContext);
  const { getFilteredJobs } = useContext(AuthContext);
  const { daysPostedCalculator } = useContext(AuthContext);
  const { isProfileSetUp } = useContext(AuthContext);
  const { setSelectedJob } = useContext(AuthContext);

  const { getJobApplications } = useContext(AuthContext);
  const { jobApplications } = useContext(AuthContext);

  const { getRecentJobs } = useContext(AuthContext);
  const { recentJobs } = useContext(AuthContext);

  useEffect(() => {
    !filteredJobs || (filteredJobs && filteredJobs.length < 1)
      ? setIsFilteredJobsResultEmpty(true)
      : setIsFilteredJobsResultEmpty(false);
  }, [filteredJobs]);

  useEffect(() => {
    !recentJobs || (recentJobs && recentJobs.length < 1)
      ? setIsRecentJobsResultEmpty(true)
      : setIsRecentJobsResultEmpty(false);
  }, [recentJobs]);

  // methods

  const filterAllJobs = () => {
    // this will display all results as back end returns all jobs if all, all are sent as arguments
    getFilteredJobs("all", "all");
  };

  const enableAutoUpdateHandler = () => {
    setAutoUpdateEnabled(true);
  };

  const disableAutoUpdateHandler = () => {
    setAutoUpdateEnabled(false);
  };

  const applyUsingProfile = () => {
    alert("Applied using profile");
  };

  const applyMethodHandler = (job) => {
    console.log(job);
    // if (!isProfileSetUp) {
    //   // setSelectedJobTitle(title)
    //   props.onOpenApplicationFormModal();
    // } else {
    //   applyUsingProfile();
    // }
  };

  const getJobApplicationsHandler = (reference) => {
    console.log("hello");
  };

  // effects
  useEffect(() => {
    const interval = setInterval(() => {
      if (autoUpdateEnabled) {
        getRecentJobs();
      }
    }, 5000);

    return () => {
      clearTimeout(interval);
    };
  }, [autoUpdateEnabled, getRecentJobs]);

  return (
    <>
      <h1>
        <strong>Jobs filtered just for you</strong>
      </h1>
      <p>
        {!isFilteredJobsResultEmpty
          ? filteredJobs && filteredJobs.length
          : "No"}{" "}
        available job(s)!
      </p>
      <hr />
      {isFilteredJobsResultEmpty && (
        <>
          <p>
            Sorry, no available jobs 🦗, please update your search or
            alternatively:
          </p>
          <Button class="mini" onClick={filterAllJobs}>
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
                  {daysPostedCalculator(job.date) < 1 && (
                    <p>
                      Recently posted |{" "}
                      <span class="hot">
                        {job.jobApplications.length} applicant(s)
                      </span>
                    </p>
                  )}
                  {daysPostedCalculator(job.date) > 0 && (
                    <p>
                      Posted {daysPostedCalculator(job.date)} day(s) ago |{" "}
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
            <Button class="mini danger margin-left apply-now no-transition-transform">
              Delete Job
            </Button>
            <Button
              class="mini margin-right apply-now no-transition-transform"
              onClick={() => {
                setSelectedJob(job);
                props.onOpenApplicationFormModal();
              }}
            >
              Apply Now
            </Button>
            <br />
            <br />
            <br />
          </div>
        ))}

      <h1>
        <strong>Recent new jobs</strong>
      </h1>
      <p>
        {!isRecentJobsResultEmpty ? recentJobs && recentJobs.length : "No"}{" "}
        job(s) added today!
      </p>
      <hr />
      {isRecentJobsResultEmpty && (
        <p>Try enabling auto update recent jobs or refreshing: </p>
      )}

      <Button class="mini margin-right" onClick={getRecentJobs}>
        New recent jobs available. Refresh?
      </Button>
      {autoUpdateEnabled && (
        <Button
          class="mini margin-left danger"
          onClick={disableAutoUpdateHandler}
        >
          Disable auto update recent jobs
        </Button>
      )}
      {!autoUpdateEnabled && (
        <Button class="mini hot margin-left" onClick={enableAutoUpdateHandler}>
          Enable auto update recent jobs
        </Button>
      )}
      <br />
      <br />
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
                      <p>
                        Recently posted |{" "}
                        <span class="hot">
                          {job.jobApplications.length} applicant(s)
                        </span>
                      </p>
                    )}
                    {daysPostedCalculator(job.date) > 0 && (
                      <p>
                        Posted {daysPostedCalculator(job.date)} day(s) ago |{" "}
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
              <Button class="mini danger margin-left apply-now no-transition-transform">
                Delete Job
              </Button>
              <Button
                class="mini margin-right apply-now no-transition-transform"
                onClick={() => {
                  setSelectedJob(job);
                  props.onOpenApplicationFormModal();
                }}
              >
                Apply Now
              </Button>
              <br />
              <br />
              <br />
            </div>
          </div>
        ))}
    </>
  );
};

export default JobItem;
