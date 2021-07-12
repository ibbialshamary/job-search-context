import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import classes from "./Register.module.scss";
import { Link } from "react-router-dom";
import Button from "../layout/Button/Button";
import { useHistory } from "react-router";

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

  const [errorMessage, setErrorMessage] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  // context
  const { getLoggedIn } = useContext(AuthContext);

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
    setVerifyPasswordIsValid(email.includes("@") && e.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(email.includes("@"));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(password.trim().length > 6);
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
        "http://localhost:5000/authenticate/register",
        registerData
      );
      // commented out as user should be redirected to login page rather than be logged in
      // getLoggedIn();
      history.push("/login")
    } catch (error) {
      setErrorMessage(error.response.data.errorMessage);
    }
  };

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity");
      setFormIsValid(
        email.length > 5 && password.length > 5 && verifyPassword.length > 5
      );
    }, 500);

    return () => {
      console.log("Clean up");
      clearTimeout(identifier);
    };
  }, [email, password, verifyPassword]);

  return (
    <div className="flex-box-container">
      <div className={classes["register-container"]}>
        <div className="form-container">
          <div className="titles-container">
            <h1>Sign up</h1>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
          <br />
          <div className="google-register-container">
            <Button class="google-register-button">
              <img
                width="28px"
                src="https://img.icons8.com/color-glass/48/000000/google-logo.png"
                alt="GI |"
              />{" "}
              Sign up with Google
            </Button>
            <br />
            <br />
            <p>or</p>
            <br />
          </div>
          <form onSubmit={register}>
            <div
              className={`${classes.control} ${
                emailIsValid === false ? classes.invalid : ""
              }`}
            >
              <label htmlFor="email">Email Address</label>
              <br />
              <input
                id="email"
                type="email"
                placeholder="Email"
                onChange={emailChangeHandler}
                onBlur={validateEmailHandler}
                value={email}
              />
              <br />
              <br />
            </div>

            <div
              className={`${classes.control} ${
                passwordIsValid === false ? classes.invalid : ""
              }`}
            >
              <label htmlFor="password">Password</label>
              <br />
              <input
                id="password"
                type="password"
                placeholder="Password"
                onChange={passwordChangeHandler}
                onBlur={validatePasswordHandler}
                value={password}
              />
              <br />
              <br />
            </div>

            <div
              className={`${classes.control} ${
                verifyPasswordIsValid === false ? classes.invalid : ""
              }`}
            >
              {" "}
              <label htmlFor="verify-password">Verify Password</label>
              <br />
              <input
                id="verify-password"
                type="password"
                placeholder="Confirm Password"
                onChange={verifyPasswordChangeHandler}
                onBlur={validatePasswordHandler}
                value={verifyPassword}
              />
              <br />
              <br />
            </div>

            <Button type="submit" class={!formIsValid ? "disabled" : null}>
              Join
            </Button>
            <br />
            <br />
            <div className="error-message-container">
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
          </form>
        </div>
      </div>
      <div className="empty-flex-box">
        <div className="titles-container">
          <h1>Basra</h1>
          <p>The Best Job Hunting Service</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
