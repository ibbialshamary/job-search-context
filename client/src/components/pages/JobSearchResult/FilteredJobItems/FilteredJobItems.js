import classes from "./FilteredJobItems.module.scss";
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../../../context/AuthContext";
import { MdLocationOn as LocationIcon } from "react-icons/md";
import { FaHotjar as HotIcon, FaPoundSign as SalaryIcon } from "react-icons/fa";
import Button from "../../../layout/Button/Button";
import axios from "axios";
import Modal from "../../../layout/Modal/Modal";
import ApplicationForm from "../../ApplicationForm/ApplicationForm";

const JobItem = () => {
  // state
  const [isFilteredJobsResultEmpty, setIsFilteredJobsResultEmpty] =
    useState(false);
  const [isRecentJobsResultEmpty, setIsRecentJobsResultEmpty] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isStatusSuccessful, setIsStatusSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [requiresUpdating, setRequiresUpdating] = useState(false);

  // context
  const {
    filteredJobs,
    getFilteredJobs,
    getRecentJobs,
    daysPostedCalculator,
    setSelectedJob,
    selectedJob,
    loggedInUser,
    recentJobs,
    getUserDetails,
    userDetails,
    showModal,
    hideModal,
    modalIsVisible,
    modalName,
  } = useContext(AuthContext);

  // effects
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

  useEffect(() => {
    getUserDetails(loggedInUser);
  }, []);

  // methods
  const generateSetUpProfile = async (profileArray) => {
    let profileArrayJobReference;
    if (selectedJob) {
      profileArrayJobReference = {
        ...profileArray,
        jobReference: selectedJob._id,
      };
    }

    setIsLoading(true);
    await axios
      .post(
        // `http://localhost:5000/job-application/${loggedInUser}`,
        `https://job-search-context.herokuapp.com/job-application/${loggedInUser}`,
        profileArrayJobReference
      )
      .then(() => {
        getFilteredJobs("all", "all");
        getRecentJobs();
        setIsStatusSuccessful(true);
        showModal("applyUsingProfile");
        setStatusMessage(
          "Successfully submitted application, jobs have been refreshed"
        );
        setIsLoading(false);
      })
      .catch((err) => {
        setIsStatusSuccessful(true);
        showModal("applyUsingProfile");
        setIsLoading(false);
        setStatusMessage(`Failed to submit application`);
      });
  };

  const applyNowHandler = (job) => {
    // if the selected job has changed, then we can set requires updating
    // this is an alternative to getting the previous state and comparing it to the current selectedJob state
    // will not render as long as the selectedJob has not changed

    if (selectedJob !== job) {
      setRequiresUpdating(true);
      setSelectedJob(job);
    }
  };

  useEffect(() => {
    if (requiresUpdating && selectedJob) {
      console.log("test");
      const userProfile = userDetails.profile[0];
      // if userProfile is valid and there is an applicant property, call the method to use profile
      userProfile && userProfile.applicant
        ? generateSetUpProfile(userDetails.profile[0])
        : showModal("applicationForm");
      // setRequiresUpdating(false);
    }
  }, [selectedJob]);

  const fetchFilteredJobsNonContext = () => {
    getFilteredJobs("all", "all");
    getRecentJobs();
  };

  const deleteJobHandler = async (jobId) => {
    try {
      await axios.delete(`http://localhost:5000/jobs/${jobId}`);
      fetchFilteredJobsNonContext();
    } catch (error) {
      // setStatusMessage(error.response.data.errorMessage);
      // setIsStatusSuccessful(false);
    }
  };

  const filterAllJobs = () => {
    // this will display all results as back end returns all jobs if all, all are sent as arguments
    getFilteredJobs("all", "all");
  };

  return (
    <>
      {modalName === "applicationForm" && <ApplicationForm />}
      {modalName === "applyUsingProfile" && statusMessage && modalIsVisible && (
        <Modal onClose={hideModal}>
          {" "}
          <div className="status-message-container">
            {isStatusSuccessful === true && statusMessage && (
              <p className="status-message success">{statusMessage}</p>
            )}
            {isStatusSuccessful === false && statusMessage && (
              <p className="status-message error">{statusMessage}</p>
            )}
          </div>
          <br />
          <Button onClick={hideModal}>Okay</Button>
        </Modal>
      )}

      <div className="flex-box-container flex-box-container--filtered-jobs">
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
                  <Button
                    onClick={() => deleteJobHandler(job._id)}
                    class="mini danger margin-left apply-now no-transition-transform"
                  >
                    Delete Job
                  </Button>
                )}

                {job?.advertiserEmail !== loggedInUser && (
                  <Button
                    class={
                      "mini apply-now no-transition-transform" +
                      (isLoading ? " is-loading" : "")
                    }
                    onClick={applyNowHandler.bind(this, job)}
                  >
                    {isLoading ? "Submitting..." : "Apply Now"}
                  </Button>
                )}

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
                  {job?.advertiserEmail === loggedInUser && (
                    <Button
                      onClick={() => deleteJobHandler(job._id)}
                      class="mini danger  margin-left apply-now no-transition-transform"
                    >
                      Delete Job
                    </Button>
                  )}
                  {job?.advertiserEmail !== loggedInUser && (
                    <Button
                      class={
                        "mini apply-now no-transition-transform" +
                        (isLoading ? " is-loading" : "")
                      }
                      onClick={applyNowHandler.bind(this, job)}
                    >
                      {isLoading ? "Submitting..." : "Apply Now"}
                    </Button>
                  )}

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
