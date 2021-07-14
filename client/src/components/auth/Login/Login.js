import React, { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";
import { useHistory } from "react-router";
import classes from "./Login.module.scss";
import { Link } from "react-router-dom";
import Button from "../../layout/Button/Button";

const Login = (props) => {
  // variables
  const history = useHistory();

  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { getLoggedIn } = useContext(AuthContext);

  // methods
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

  return (
    <div className="flex-box-container">
      <div className={classes["login-container"]}>
        <div className="form-container">
          <div className="titles-container">
            <h1>Login</h1>
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
            <br />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
            <br />
            <Button type="submit" onClick={login}>Login</Button>
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
            <Button class="secondary" onClick={props.onClick}>Forgotten Password? Reset Here</Button>
            <br />

            <div className="error-message-container">
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
