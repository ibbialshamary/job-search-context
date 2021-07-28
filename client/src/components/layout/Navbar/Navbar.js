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
          <h1 className="logo-underline">Buzzra.</h1>
        </NavLink>
        <Bars />
        <NavMenu>
          {loggedIn === false && (
            <>
              <NavLink to="/preview" activeStyle>
                Preview
              </NavLink>
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
              <NavLink to="/my-jobs" activeStyle>
                My Jobs
              </NavLink>              
              <NavLink to="/profile" activeStyle>
                Profile
              </NavLink>
            </>
          )}
        </NavMenu>
        {loggedIn === true && (
          <>
            <NavBtn>
              <Logout class="mini" />
            </NavBtn>
          </>
        )}

        {loggedIn === false && (
          <>
            <NavBtn>
              <Button
                class="mini"
                onClick={() => history.push("/login")}
              >
                Login
              </Button>
            </NavBtn>
          </>
        )}
      </Nav>
    </>
  );
};

export default Navbar;
