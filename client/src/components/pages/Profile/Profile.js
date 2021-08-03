import React, { useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import Button from "../../layout/Button/Button";
import axios from "axios";
import { v4 as uuid } from "uuid";
import firebase from "../../../util/firebase";
import classes from "./Profile.module.scss";

const Profile = () => {
  // context
  const { loggedInUser } = useContext(AuthContext);

  // states
  const [nickname, setNickname] = useState("");
  const [cv, setCv] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [location, setLocation] = useState("");
  const [urls, setUrls] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isStatusSuccessful, setIsStatusSuccessful] = useState(false);

  const [uploadStatusMessage, setUploadStatusMessage] = useState("");
  const [isUploadStatusSuccessful, setIsUploadStatusSuccessful] =
    useState(undefined);

  const clearUploadStatus = () => {
    setUploadStatusMessage("");
    setIsUploadStatusSuccessful(undefined);
  };

  const nicknameChangeHandler = (e) => {
    setNickname(e.target.value);
    // setPasswordIsValid(email.includes("@") && e.target.value.trim().length > 6);
  };

  const cvChangeHandler = async (e) => {
    clearUploadStatus();
    setUploadStatusMessage("Uploading CV...");
    const file = e.target.files[0];
    const id = uuid();
    const cvFilesRef = firebase.storage().ref("files").child(id);
    await cvFilesRef.put(file);
    cvFilesRef
      .getDownloadURL()
      .then((url) => {
        setCv(url);
        setIsUploadStatusSuccessful(true);
        setUploadStatusMessage(`Successfully uploaded CV`);
      })
      .catch((err) => {
        setIsUploadStatusSuccessful(false);
        setUploadStatusMessage(`${err}`);
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

  const submitProfilePatchHandler = async (e) => {
    e.preventDefault();

    let name;
    nickname ? (name = nickname) : (name = loggedInUser);
    const applicant = loggedInUser;

    try {
      const profile = {
        name,
        applicant,
        cv,
        coverLetter,
        location,
        urls,
      };

      await axios.patch(
        `http://localhost:5000/authenticate/users/${loggedInUser}`,
        profile
      );

      setIsStatusSuccessful(true);
      setStatusMessage(
        "Successfully updated profile"
      );
    } catch (error) {
      setIsStatusSuccessful(false);
      setStatusMessage(
        "Failed to update profile, please make sure you have filled all required fields"
      );
    }
  };

  return (
    <>
      <div className="flex-box-container">
        <div className={classes["profile-set-up-container"]}>
        <div className="form-container profile-setu-up">
          <div className="titles-container">
            <h1>Set Up Profile</h1>
            <p>
              Hi there, <span className="hot">{loggedInUser}</span>.
              <br />
              Would you like to set up a profile for easier applications?
            </p>
          </div>

          <div className="form-container">
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

              <Button onClick={submitProfilePatchHandler}>
                Update my profile
              </Button>
              <br />

              <div className="file-upload status-message-container">
                {isUploadStatusSuccessful === true && uploadStatusMessage && (
                  <p className="file-upload status-message success">
                    {uploadStatusMessage}
                  </p>
                )}
                {isUploadStatusSuccessful === undefined &&
                  uploadStatusMessage && (
                    <p className="file-upload status-message pending">
                      {uploadStatusMessage}
                    </p>
                  )}
                {isUploadStatusSuccessful === false && uploadStatusMessage && (
                  <p className="file-upload status-message success">
                    {uploadStatusMessage}
                  </p>
                )}
              </div>
              <div className="status-message-container">
                {isStatusSuccessful === true && statusMessage && (
                  <p className="status-message success">{statusMessage}</p>
                )}
                {isStatusSuccessful === false && statusMessage && (
                  <p className="status-message error">{statusMessage}</p>
                )}
              </div>
            </form>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
