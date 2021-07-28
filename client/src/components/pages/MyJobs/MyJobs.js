import React, { useContext } from "react";
import AuthContext from "../../../context/AuthContext";

const MyJobs = () => {
  const { myJobs } = useContext(AuthContext);
  return <>Your jobs will appear here</>;
};

export default MyJobs;
