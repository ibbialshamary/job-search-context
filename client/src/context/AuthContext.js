import axios from "axios";
import React, { useState, useEffect, createContext } from "react";

const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [allJobs, setAllJobs] = useState(undefined);
  const [filteredJobs, setFilteredJobs] = useState(undefined);
  const [recentJobs, setRecentJobs] = useState(null);
  const [recentJobsCount, setRecentJobsCount] = useState(null);

  // methods
  const getLoggedIn = async () => {
    const loggedInResponse = await axios.get(
      "http://localhost:5000/authenticate/loggedIn"
    );
    setLoggedIn(loggedInResponse.data);
  };

  const getAllJobs = async () => {
    const allJobsResponse = await axios.get("http://localhost:5000/jobs");
    setAllJobs(allJobsResponse.data);
  };

  const getFilteredJobs = async (location, title) => {
    const filteredJobsResponse = await axios.get(
      `http://localhost:5000/jobs/filter/${location}/${title}`
    );
    setFilteredJobs(filteredJobsResponse.data);
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
    const recentJobs = await axios.get("http://localhost:5000/jobs/recent");
    setRecentJobs(recentJobs.data);
    setRecentJobsCount(recentJobs.data.length);
  };

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        getLoggedIn,
        allJobs,
        getAllJobs,
        filteredJobs,
        getFilteredJobs,
        daysPostedCalculator,
        getRecentJobs,
        recentJobs,
        recentJobsCount
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
export { AuthContextProvider };
