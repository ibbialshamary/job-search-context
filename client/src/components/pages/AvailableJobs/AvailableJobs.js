import React, { useContext } from "react";
import AuthContext from "../../../context/AuthContext";

const AvailableJobs = () => {
  const { availableJobs } = useContext(AuthContext);
  return <>Your available jobs will appear here</>;
};

export default AvailableJobs;
