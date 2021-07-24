import classes from "./FilteredJobItems.module.scss";
import React, { useContext } from "react";
import AuthContext from "../../../../context/AuthContext";
import { MdLocationOn as LocationIcon } from "react-icons/md";
import { FaHotjar as HotIcon, FaPoundSign as SalaryIcon } from "react-icons/fa";
const JobItem = () => {
  const { filteredJobs } = useContext(AuthContext);

  return (
    <>
      <h1>
        <strong>Jobs filtered just for you</strong>
      </h1>
      <p>{filteredJobs && filteredJobs.length} available jobs!</p>
      <hr />
      {filteredJobs &&
        filteredJobs.map((job, index) => (
          <div>
            <div className={classes["job-item-container"]}>
              <div className={classes["job-item"]}>
                <p>
                  <strong>{job.company}</strong> is looking for a{" "}
                  <strong>{job.title}</strong>
                  <HotIcon className={classes.icon} />
                  <div className={classes["salary-location"]}>
                    <div className={classes.salary}>
                      <SalaryIcon /> | {job.salary},000
                    </div>
                    <div className={classes.location}>
                      <LocationIcon /> | {job.location}
                    </div>
                  </div>
                  <p>Posted 2 days ago</p>
                  <br />
                  <div className="tags-container">
                    <p className="tag-item">Node</p>
                    <p className="tag-item">React</p>
                  </div>
                </p>
              </div>
            </div>
            <br />
          </div>
        ))}
    </>
  );
};

export default JobItem;
