import axios from "axios";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";

const Logout = (props) => {
  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  const logout = async () => {
    // await axios.get("http://localhost:5000/authenticate/logout");
    await axios.get("https://job-search-context.herokuapp.com/authenticate/logout");
    await getLoggedIn();
    history.push("/login");
  };

  return <button className={props.class} onClick={logout}>Logout</button>;
};

export default Logout;
