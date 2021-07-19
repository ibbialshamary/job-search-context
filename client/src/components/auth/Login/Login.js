import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";
import { useHistory } from "react-router";
import classes from "./Login.module.scss";
import { Link } from "react-router-dom";
import Button from "../../layout/Button/Button";
import Navbar from "../../layout/Navbar/Navbar";

const Login = (props) => {
  // variables
  const history = useHistory();

  // states
  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();

  const [password, setPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();

  const [errorMessage, setErrorMessage] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  const [joinButtonText, setJoinButtonText] = useState(
    "Checking form validity"
  );

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

  const validateEmailHandler = () => {
    setEmailIsValid(email.includes("@") && email.trim().length > 6);
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(password.trim().length > 6);
  };

  async function login(e) {
    e.preventDefault();

    try {
      const loginData = {
        email,
        password,
      };

      await axios.post("http://localhost:5000/authenticate/login", loginData);
      getLoggedIn();
      history.push("/");
    } catch (error) {
      setErrorMessage(error.response.data.errorMessage);
    }
  }

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity");
      setFormIsValid(
        email.includes("@") && email.trim().length > 6 && password.length > 6
      );
      if (formIsValid) {
        setJoinButtonText("Join");
      } else {
        setJoinButtonText("Please correct highlighted fields");
      }
    }, 500);

    return () => {
      console.log("Clean up");
      setJoinButtonText("Checking form validity");
      clearTimeout(identifier);
    };
  }, [email, formIsValid, password]);

  return (
    <>
    {/* <Navbar /> */}
    <div className="flex-box-container">
      <div className={classes["login-container"]}>
        <div className="form-container login">
          <div className="titles-container">
            <h1>Login</h1>
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
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
            <br />
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
            <br />
            <Button
              type="submit"
              class={!formIsValid ? "disabled" : null}
              onClick={login}
            >
              {joinButtonText}
            </Button>
            <br />
            <Button class="google-register-button">
              <img
                width="28px"
                src="https://img.icons8.com/color-glass/48/000000/google-logo.png"
                alt="GI |"
              />{" "}
              Login with Google
            </Button>
            <br />
            <Button class="secondary" onClick={props.onClick}>
              Forgotten Password? Reset Here
            </Button>
            <br />

            <div className="error-message-container">
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
