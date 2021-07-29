import React, { useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import Button from "../../layout/Button/Button";
import Modal from "../../layout/Modal/Modal";
import classes from "./ApplicationForm.module.scss";
import axios from "axios";
import firebase from "../../../../src/util/firebase"
import { v4 as uuid } from "uuid";

const ApplicationForm = (props) => {
  // context variables
  const { selectedJob } = useContext(AuthContext);
  const { loggedInUser } = useContext(AuthContext);
  const { getAdvertisedAndAppliedToJobs } = useContext(AuthContext);

  // states
  const [nickname, setNickname] = useState();
  const [cv, setCv] = useState();
  const [coverLetter, setCoverLetter] = useState();
  const [location, setLocation] = useState();
  const [urls, setUrls] = useState();

  const [statusMessage, setStatusMessage] = useState("");
  const [isStatusSuccessful, setIsStatusSuccessful] = useState(false);


  // methods
  const nicknameChangeHandler = (e) => {
    setNickname(e.target.value);
    // setPasswordIsValid(email.includes("@") && e.target.value.trim().length > 6);
  };

  const cvChangeHandler = async (e) => {
    const file = e.target.files[0];
    const id = uuid();
    const cvFilesRef = firebase.storage().ref("files").child(id);
    await cvFilesRef.put(file);
    cvFilesRef.getDownloadURL().then((url) => {
      setCv(url);
    });
  };

  const coverLetterChangeHandler = (e) => {
    setCoverLetter(e.target.value);
  };

  const locationChangeHandler = (e) => {
    setLocation(e.target.value);
  };

  const urlsChangeHandler = (e) => {
    setUrls(e.target.value);
  };

  const submitJobApplicationHandler = async (e) => {
    e.preventDefault();
    const jobReference = selectedJob._id;

    let name;
    nickname ? (name = nickname) : (name = loggedInUser);
    const applicant = loggedInUser;

    try {
      const applicationFormData = {
        name,
        applicant,
        cv,
        coverLetter,
        location,
        urls,
        jobReference,
      };

      await axios.post(
        "http://localhost:5000/job-application",
        applicationFormData
      );

      // update my jobs data relevant to my-jobs route
      getAdvertisedAndAppliedToJobs(loggedInUser);
      setIsStatusSuccessful(true);
      setStatusMessage(
        "Successfully submitted application, you may close this form"
      );
    } catch (error) {
      setIsStatusSuccessful(false);
      setStatusMessage(
        "Failed to apply, please make sure you have filled all required fields"
      );
    }
  };

  return (
    <Modal onClose={props.onCloseApplicationFormModal}>
      <div className="form-container">
        <strong>
          <h1>
            Application Form for a {selectedJob.title} at {selectedJob.company}
          </h1>
          <p>
            Since you don't have a profile set up, <br />
            please fill in some of the optional fields and all the required{" "}
            <span className="hot">*</span>
          </p>
        </strong>
        <p></p>
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="use-nickname" value={nickname}>
            Use a nickname?
          </label>
          <input
            id="use-nickname"
            type="text"
            placeholder="Ibbi"
            value={nickname}
            onChange={nicknameChangeHandler}
          />
          <br />

          <label htmlFor="upload-cv">
            CV <span className="hot">*</span>
          </label>
          <input
            id="upload-cv"
            type="file"
            accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="no-resize"
            onChange={cvChangeHandler}
          />
          <br />
          <br />

          <label htmlFor="cover-letter">Cover Letter</label>
          <textarea
            id="cover-letter"
            type="text"
            className="no-resize"
            value={coverLetter}
            onChange={coverLetterChangeHandler}
          />
          <br />
          <br />

          <label htmlFor="location">
            Location <span className="hot">*</span>
          </label>
          <input
            id="location"
            type="text"
            className="no-resize"
            placeholder="Manchester"
            value={location}
            onChange={locationChangeHandler}
          />
          <br />
          <br />

          <label htmlFor="third-party-urls">Third Party URLs</label>
          <input
            id="third-party-urls"
            type="text"
            className="no-resize"
            placeholder="https://github.com/mygithubprofile"
            value={urls}
            onChange={urlsChangeHandler}
          />
          <br />
          <br />

          <Button onClick={submitJobApplicationHandler}>
            Submit Application
          </Button>
          <br />
          <Button class="secondary" onClick={props.onCloseApplicationFormModal}>
            Go Back
          </Button>

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
    </Modal>
  );
};

export default ApplicationForm;
