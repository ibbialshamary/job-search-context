import React, { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { useHistory } from "react-router";
const Login = () => {
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
        password
      };

      await axios.post(
        "http://localhost:5000/authenticate/login",
        loginData
      );
      getLoggedIn();
      history.push("/")
    } catch (error) {
      setErrorMessage(error.response.data.errorMessage);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={login}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
        <button type="submit">Login</button>
        {errorMessage && (
          <div>
            <p>{errorMessage}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
