import React, { useContext } from "react";
import Logout from "../../auth/Logout/Logout";
import AuthContext from "../../../context/AuthContext";
import Button from "../Button/Button";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";
import { useHistory } from "react-router-dom";

// this component uses styled components unlike the rest of the app
const Navbar = () => {
  const { loggedIn } = useContext(AuthContext);
  const history = useHistory();

  return (
    <>
      <Nav>
        <NavLink to="/">
          {/* <img src={require('../../images/logo.svg')} alt="" /> */}
          <h1 className="navbar-h1">Basra.</h1>
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/about" activeStyle>
            About
          </NavLink>
          {loggedIn === false && (
            <>
              <NavLink to="/register" activeStyle>
                Register
              </NavLink>
            </>
          )}

          {loggedIn === true && (
            <>
              <NavLink to="/search-jobs" activeStyle>
                Search Jobs
              </NavLink>
              <NavLink to="/advertise-jobs" activeStyle>
                Advertise Jobs
              </NavLink>
            </>
          )}
        </NavMenu>
        {loggedIn === true && (
          <>
            <NavBtn>
              <Logout class="navbar-button" />
            </NavBtn>
          </>
        )}

        {loggedIn === false && (
          <>
            <NavBtn>
              <Button class="navbar-button" onClick={() => history.push('/login')}>Login</Button>
            </NavBtn>
          </>
        )}
      </Nav>
    </>
  );
};

export default Navbar;
