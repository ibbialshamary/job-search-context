import React, { useState, useEffect } from "react";
import axios from "axios";
// import AuthContext from "../../../context/AuthContext";
import classes from "./Register.module.scss";
import { Link } from "react-router-dom";
import Button from "../../layout/Button/Button";
import { useHistory } from "react-router";
import { CgProfile as ProfileIcon } from "react-icons/cg";
import { HiSwitchHorizontal as SwitchIcon } from "react-icons/hi";
import { AiOutlineForm as FormFillIcon } from "react-icons/ai";
import { FaUmbrellaBeach as RelaxIcon } from "react-icons/fa";

// reducer methods
// const emailReducer = () => {};

const Register = () => {
  // variables
  const history = useHistory();

  // states
  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();

  const [password, setPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();

  const [verifyPassword, setVerifyPassword] = useState("");
  const [verifyPasswordIsValid, setVerifyPasswordIsValid] = useState("");

  const [statusMessage, setStatusMessage] = useState("");
  const [isStatusSuccessful, setIsStatusSuccessful] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  // methods
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
    setEmailIsValid(e.target.value.includes("@") && password.trim().length > 6);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
    setPasswordIsValid(email.includes("@") && e.target.value.trim().length > 6);
  };

  const verifyPasswordChangeHandler = (e) => {
    setVerifyPassword(e.target.value);
    setVerifyPasswordIsValid(
      email.includes("@") && e.target.value.trim().length > 6
    );
  };

  const validateEmailHandler = () => {
    setEmailIsValid(email.includes("@") && email.trim().length > 6);
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(password.trim().length > 6);
  };

  const validateVerifyPasswordHandler = () => {
    setVerifyPasswordIsValid(verifyPassword.trim().length > 6);
  };

  const register = async (e) => {
    e.preventDefault();

    try {
      const registerData = {
        email,
        password,
        verifyPassword,
      };

      await axios.post(
        // "http://localhost:5000/authenticate/register",
        "https://job-search-context.herokuapp.com/authenticate/register",
        registerData
      );
      // commented out as user should be redirected to login page rather than be logged in
      // getLoggedIn();
      history.push("/login");
    } catch (error) {
      setIsStatusSuccessful(false);
      setStatusMessage(error.response.data.errorMessage);
    }
  };

  useEffect(() => {
    const identifier = setTimeout(() => {
      // console.log("Checking form validity");
      setFormIsValid(
        email.includes("@") &&
          email.trim().length > 6 &&
          password.length > 6 &&
          verifyPassword.length > 6
      );
      if (formIsValid) {
        // setJoinButtonText("Join");
      } else {
        // setJoinButtonText("Please correct highlighted fields");
      }
    }, 500);

    return () => {
      // console.log("Clean up");
      // setJoinButtonText("Checking form validity");
      clearTimeout(identifier);
    };
  }, [email, formIsValid, password, verifyPassword]);

  return (
    <div className="flex-box-container">
      <div className={classes["register-container"]}>
        <div className="form-container">
          <div className="titles-container">
            <h1>Register</h1>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>

          {/* <div className="google-register-container">
            <Button class="google-register-button">
              <img
                width="28px"
                src="https://img.icons8.com/color-glass/48/000000/google-logo.png"
                alt="GI |"
              />{" "}
              Sign up with Google
            </Button>

            <p>or</p>
          </div> */}
          <form onSubmit={(e) => e.preventDefault()}>
            <div
              className={`${classes.control} ${
                emailIsValid === false ? classes.invalid : ""
              }`}
            >
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                onChange={emailChangeHandler}
                onBlur={validateEmailHandler}
                value={email}
              />
            </div>

            <div
              className={`${classes.control} ${
                passwordIsValid === false ? classes.invalid : ""
              }`}
            >
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                onChange={passwordChangeHandler}
                onBlur={validatePasswordHandler}
                value={password}
              />
            </div>

            <div
              className={`${classes.control} ${
                verifyPasswordIsValid === false ? classes.invalid : ""
              }`}
            >
              {" "}
              <label htmlFor="verify-password">Verify Password</label>
              <input
                id="verify-password"
                type="password"
                placeholder="Confirm Password"
                onChange={verifyPasswordChangeHandler}
                onBlur={validateVerifyPasswordHandler}
                value={verifyPassword}
              />
            </div>

            <Button
              type="submit"
              class={!formIsValid ? "disabled" : null}
              onClick={register}
            >
              Join
            </Button>

            <div className="status-message-container">
              {isStatusSuccessful === false && statusMessage && <p className="status-message error">{statusMessage}</p>}
              {isStatusSuccessful === true && statusMessage && <p className="status-message success">{statusMessage}</p>}
            </div>
          </form>
        </div>
      </div>

      <div
        className={classes["welcome-message-container"]}
        id="welcomeMessageFlexBox"
      >
        <div className={classes["titles-container"]}>
          {/* <h1 className={classes["logo"]}>Buzzra.</h1>
          <p>The Best Job Hunting Service</p>
          <br /> */}
          <h1>How it works?</h1><br />
          <div className="how-it-works-container">
            <div>
              <ProfileIcon className="icon one" />
              Join us
            </div>
            <div>
              <SwitchIcon className="icon two" />
              Switch between job-hunter and recruiter
            </div>
            <div>
              <FormFillIcon className="icon three" />
              Fill in quick preferences
            </div>

            <div>
              <RelaxIcon className="icon four" />
              Sit back, relax and let us find your best job
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
