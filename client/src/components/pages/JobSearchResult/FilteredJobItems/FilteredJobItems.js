import classes from "./FilteredJobItems.module.scss";
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../../../context/AuthContext";
import { MdLocationOn as LocationIcon } from "react-icons/md";
import { FaHotjar as HotIcon, FaPoundSign as SalaryIcon } from "react-icons/fa";
import Button from "../../../layout/Button/Button";
import axios from "axios";

const JobItem = (props) => {
  // state
  const [isFilteredJobsResultEmpty, setIsFilteredJobsResultEmpty] =
    useState(false);
  const [isRecentJobsResultEmpty, setIsRecentJobsResultEmpty] = useState(false);

  // context
  const { filteredJobs } = useContext(AuthContext);
  const { getFilteredJobs } = useContext(AuthContext);
  const { getRecentJobs } = useContext(AuthContext);
  const { daysPostedCalculator } = useContext(AuthContext);
  const { isProfileSetUp } = useContext(AuthContext);
  const { setSelectedJob } = useContext(AuthContext);
  const { loggedInUser } = useContext(AuthContext);

  const { getJobApplications } = useContext(AuthContext);
  const { jobApplications } = useContext(AuthContext);

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
  const fetchFilteredJobsNonContext = () => {
    getFilteredJobs("all", "all");
    getRecentJobs();
  };

  const deleteJobHandler = async (jobId) => {
    try {
      await axios.delete(`http://localhost:5000/jobs/${jobId}`);
      fetchFilteredJobsNonContext();
    } catch (error) {
      alert("Failed");
      // setStatusMessage(error.response.data.errorMessage);
      // setIsStatusSuccessful(false);
    }
  }

  const filterAllJobs = () => {
    // this will display all results as back end returns all jobs if all, all are sent as arguments
    getFilteredJobs("all", "all");
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

  return (
    <>
      <div className="flex-box-container">
        <div className="filtered-jobs-container margin-left">
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
                {loggedInUser === job?.advertiserEmail && (
                  <Button onClick={() => deleteJobHandler(job._id)} class="mini danger apply-now no-transition-transform">
                    Delete Job
                  </Button>
                )}

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
        </div>

        <div className="recent-jobs-container margin-right">
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
                  {loggedInUser === job?.advertiserEmail && (
                    <Button onClick={() => deleteJobHandler(job._id)} class="mini danger apply-now no-transition-transform">
                      Delete Job
                    </Button>
                  )}
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
        </div>
      </div>
    </>
  );
};

export default JobItem;
