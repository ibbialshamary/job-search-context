import axios from "axios";
import React, { useState, useEffect, createContext } from "react";

const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [globalResponseStatus, setGlobalResponseStatus] = useState();

  const [loggedIn, setLoggedIn] = useState(undefined);
  const [loggedInUser, setLoggedInUser] = useState(undefined);

  const [allJobs, setAllJobs] = useState(undefined);
  const [filteredJobs, setFilteredJobs] = useState(undefined);

  const [recentJobs, setRecentJobs] = useState(null);
  const [recentJobsCount, setRecentJobsCount] = useState(null);

  const [isProfileSetUp, setIsProfileSetUp] = useState(false);

  const [selectedJob, setSelectedJob] = useState(null);

  const [userJobApplications, setUserJobApplications] = useState([]);
  const [myJobs, setMyJobs] = useState([]);

  const [userDetails, setUserDetails] = useState([]);

  // modal
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [modalName, setModalName] = useState(false);

  // methods

  // methods starting from here work together
  const getJobApplications = async (email) => {
    const jobApplicationsByEmailResponse = await axios.get(
      // `http://localhost:5000/job-application/${email}`
      `https://job-search-context.herokuapp.com/job-application/${email}`
    );
    setUserJobApplications(jobApplicationsByEmailResponse.data);
  };

  const getAdvertisedAndAppliedToJobs = async (email) => {
    if (email) {
      const jobsByReferenceResponse = await axios.get(
        // `http://localhost:5000/jobs/jobs-applied-and-advertised/${email}`
        `https://job-search-context.herokuapp.com/jobs/jobs-applied-and-advertised/${email}`
      );
      setMyJobs(jobsByReferenceResponse.data);
    }
  };
  // methods working together ends here

  const showModal = (modalName) => {
    setModalName(modalName);
    setModalIsVisible(true);
  };

  const hideModal = () => {
    setModalIsVisible(false);
  };

  const getLoggedIn = async () => {
    const loggedInResponse = await axios.get(
      // "http://localhost:5000/authenticate/loggedIn"
      "https://job-search-context.herokuapp.com/authenticate/loggedIn"
    );
    setLoggedIn(loggedInResponse.data.loggedIn);
    setLoggedInUser(loggedInResponse.data.loggedInUser);
    getUserDetails(loggedInUser);
  };

  const getUserDetails = async (email) => {
    if (email) {
      const userDetailsResponse = await axios.get(
        // `http://localhost:5000/authenticate/user-details/${email}`
        `https://job-search-context.herokuapp.com/authenticate/user-details/${email}`
      );
      setUserDetails(userDetailsResponse.data);
    }
  };

  const getAllJobs = async () => {
    // const allJobsResponse = await axios.get("http://localhost:5000/jobs");
    const allJobsResponse = await axios.get("https://job-search-context.herokuapp.com/jobs");
    setAllJobs(allJobsResponse.data);
  };

  const getFilteredJobs = async (location, title) => {
    const filteredJobsResponse = await axios.get(
      // `http://localhost:5000/jobs/filter/${location}/${title}`
      `https://job-search-context.herokuapp.com/jobs/filter/${location}/${title}`
    );
    setFilteredJobs(filteredJobsResponse.data);
  };

  const fetchFilteredJobs = (location, title) => {
    if (!location && !title) {
      // return nothing for better user experience, these strings will be searched on back end but will not match anything
      // could be any string combination that is logical in not returning anything
      getFilteredJobs("returnNothing", "returnNothing");
    } else if (!location) {
      getFilteredJobs("none", title);
    } else if (!title) {
      getFilteredJobs(location, "none");
    } else {
      getFilteredJobs(location, title);
    }
  };

  const dateFormatter = (date) => {
    return date.split("T")[0].replace(/-/g, "/");
  };

  const daysPostedCalculator = (jobDate) => {
    const formattedJobPostedDate = dateFormatter(jobDate);
    const todaysDate = dateFormatter(new Date().toISOString());

    const date1 = new Date(formattedJobPostedDate);
    const date2 = new Date(todaysDate);
    const diffTime = Math.abs(date1 - date2);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getRecentJobs = async () => {
    const recentJobs = await axios.get(
      // "http://localhost:5000/jobs/recent-jobs/recent"
      "https://job-search-context.herokuapp.com/jobs/recent-jobs/recent"
    );
    setRecentJobs(recentJobs.data);
    setRecentJobsCount(recentJobs.data.length);
  };

  useEffect(() => {
    getLoggedIn();
    if (loggedInUser) {
      getAdvertisedAndAppliedToJobs(loggedInUser);
    }
  }, [loggedInUser]);

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        loggedInUser,
        getLoggedIn,
        allJobs,
        getAllJobs,
        filteredJobs,
        getFilteredJobs,
        fetchFilteredJobs,
        daysPostedCalculator,
        getRecentJobs,
        recentJobs,
        recentJobsCount,
        isProfileSetUp,
        selectedJob,
        setSelectedJob,
        getJobApplications,
        userJobApplications,
        getAdvertisedAndAppliedToJobs,
        myJobs,
        globalResponseStatus,
        setGlobalResponseStatus,
        getUserDetails,
        userDetails,
        showModal,
        hideModal,
        modalIsVisible,
        modalName
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
export { AuthContextProvider };
