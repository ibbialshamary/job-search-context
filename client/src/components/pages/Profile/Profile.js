import React, { useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import Button from "../../layout/Button/Button";
import axios from "axios";

const Profile = () => {
  // context
  const { loggedInUser, setIsStatusSuccessful, setStatusMessage } =
    useContext(AuthContext);

  // states
  const [nickname, setNickname] = useState();
  const [cv, setCv] = useState();
  const [coverLetter, setCoverLetter] = useState();
  const [location, setLocation] = useState();
  const [urls, setUrls] = useState();

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
    <>
      <p>
        Hi there, <span className="hot">{loggedInUser}</span>.
        <br />
        Would you like to set up a profile for easier applications?
      </p>
      <Button onClick={submitProfilePatchHandler}>Update my profile</Button>
    </>
  );
};

export default Profile;
