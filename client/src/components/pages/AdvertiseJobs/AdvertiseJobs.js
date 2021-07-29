import React, { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";
import { useHistory } from "react-router";
import classes from "./AdvertiseJobs.module.scss";
import Button from "../../layout/Button/Button";

const AdvertiseJobs = (props) => {
  // variables
  const history = useHistory();

  // context
  const { loggedInUser } = useContext(AuthContext);
  const { getFilteredJobs } = useContext(AuthContext);
  const { getRecentJobs } = useContext(AuthContext);
  const { getAdvertisedAndAppliedToJobs } = useContext(AuthContext);

  // states
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState();
  const [hours, setHours] = useState();
  const [tags, setTags] = useState();
  const [statusMessage, setStatusMessage] = useState("");
  const [isStatusSuccessful, setIsStatusSuccessful] = useState(false);

  // methods
  const fetchFilteredJobsNonContext = () => {
    getFilteredJobs("all", "all");
    getRecentJobs();
    getAdvertisedAndAppliedToJobs(loggedInUser);
    history.push("/job-search-result");
  };

  const advertiseJobHandler = async (e) => {
    e.preventDefault();

    try {
      const advertiserEmail = loggedInUser;
      const jobData = {
        company,
        title,
        description,
        location,
        salary,
        hours,
        tags,
        advertiserEmail
      };

      await axios.post("http://localhost:5000/jobs", jobData);
      fetchFilteredJobsNonContext();
    } catch (error) {
      setStatusMessage(error.response.data.errorMessage);
      setIsStatusSuccessful(false);
    }
  };

  return (
    <>
      <div className="flex-box-container">
        <div className={classes["advertise-jobs-container"]}>
          <div className="form-container login">
            <div className="titles-container">
              <h1>Advertise a Job</h1>
              <p>Get enough applicants in as little as 2 days</p>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                placeholder="Facebook"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />

              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                placeholder="Software Engineer"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                placeholder="Be apart of the welcoming development team..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                placeholder="Manchester"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

              <label htmlFor="salary">Salary</label>
              <input
                type="text"
                id="salary"
                placeholder="120"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />

              <label htmlFor="hours">Hours</label>
              <input
                type="text"
                id="hours"
                placeholder="36"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />

              <label htmlFor="tags">Tags</label>
              <input
                type="text"
                id="tags"
                placeholder="React, React Native, Node"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
              <br />
              <Button onClick={advertiseJobHandler}>Publish</Button>
              <div className="status-message-container">
                {isStatusSuccessful === false && statusMessage && (
                  <p className="status-message error">{statusMessage}</p>
                )}
                {isStatusSuccessful === true && statusMessage && (
                  <p className="status-message success">{statusMessage}</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvertiseJobs;
