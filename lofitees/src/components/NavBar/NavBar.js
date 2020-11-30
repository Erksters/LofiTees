import React from "react";
import { Navbar, NavDropdown, Nav } from "react-bootstrap";
import { findToken, logoutServer } from "../../api/api";
const NavigationBar = (props) => {
  const handleSignOut = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Token ${findToken}`);
    fetch(logoutServer, {
      method: "POST",
      headers: myHeaders,
    });
    sessionStorage.clear();
    window.location = "/";
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">LofiTees</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">All Shirts</Nav.Link>
          {findToken ? (
            <Nav.Link href="/my_profile">
              Signed In As {sessionStorage.getItem("lofiteesusername")}
            </Nav.Link>
          ) : (
            <Nav.Link href="/login">Sign In</Nav.Link>
          )}
          {!findToken &&
            <Nav.Link href="/sign-up">Sign up</Nav.Link>
          }
          {findToken ? (
            <NavDropdown title="More" id="basic-nav-dropdown">
              <NavDropdown.Item href="/my_profile">
                View My Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleSignOut}>
                Sign Out
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <></>
          )}
          <Nav.Link href="/my_cart">View Cart</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
