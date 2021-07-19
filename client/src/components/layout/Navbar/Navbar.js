import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logout from "../../auth/Logout/Logout";
import AuthContext from "../../../context/AuthContext";
import "./Navbar.scss";

const Navbar = () => {
  const { loggedIn } = useContext(AuthContext);
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light" id="navbar">
        <a class="navbar-brand underlined">
          Basra.
        </a>
        <a
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </a>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <div id="items">
            <ul class="navbar-nav">
              {loggedIn === false && (
                <>
                  <li class="nav-item">
                    <Link class="nav-link" to="/register">
                      Register
                    </Link>
                  </li>

                  <li class="nav-item">
                    <Link class="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                </>
              )}
              {loggedIn === true && (
                <>
                  <li class="nav-item">
                    <Link class="nav-link" to="/search-jobs">
                      Search Jobs
                    </Link>
                  </li>

                  <li class="nav-item">
                    <Link class="nav-link" to="/advertise-jobs">
                      Advertise Jobs
                    </Link>
                  </li>

                  {/* <li class="nav-item"><Logout class="nav-link" /></li> */}
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
