import React, { useContext } from "react";
import Logout from "../../auth/Logout/Logout";
import AuthContext from "../../../context/AuthContext";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

// this component uses styled components unlike the rest of the app
const Navbar = () => {
  const { loggedIn } = useContext(AuthContext);

  return (
    <>
      <Nav>
        <NavLink to="/">
          <h1>Basra.</h1>
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
              <NavBtnLink to="/">Logout</NavBtnLink>
            </NavBtn>
          </>
        )}

        {loggedIn === false && (
          <>
            <NavBtn>
              <NavBtnLink to="/login">Login</NavBtnLink>
            </NavBtn>
          </>
        )}
      </Nav>
    </>
  );
};

export default Navbar;
