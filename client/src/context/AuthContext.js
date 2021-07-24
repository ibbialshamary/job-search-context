import axios from "axios";
import React, { useState, useEffect, createContext } from "react";

const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [allJobs, setAllJobs] = useState(undefined);
  const [filteredJobs, setFilteredJobs] = useState(undefined);

  const getLoggedIn = async () => {
    const loggedInResponse = await axios.get(
      "http://localhost:5000/authenticate/loggedIn"
    );
    setLoggedIn(loggedInResponse.data);
  };

  const getAllJobs = async () => {
    const allJobsResponse = await axios.get(
      "http://localhost:5000/jobs"
    );
    setAllJobs(allJobsResponse.data);
  }

  const getFilteredJobs = async (location) => {
    const filteredJobsResponse = await axios.get(
      `http://localhost:5000/jobs/filter/${location}`
    );
    setFilteredJobs(filteredJobsResponse.data);
  }

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn, allJobs, getAllJobs, filteredJobs, getFilteredJobs }}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
export { AuthContextProvider };
