import Container from "react-bootstrap/Container";
import React, { Component, useEffect, useState, useContext } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { UserContext } from "./UserContext";
import NavDropdown from "react-bootstrap/NavDropdown";
import {
  Routes,
  Route,
  useNavigate,
  useParams,
  useLocation,
  Link,
} from "react-router-dom";

function OurNavbar() {
  const isLoggedIn = Boolean(localStorage.getItem("token"));
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, setUserId, userName } = useContext(UserContext);
  const [expanded, setExpanded] = useState(false);

  // const location = useLocation();
  // const adminId = location.pathname.split("/")[1];
  const navigateToHome = () => {
    // 👇️ navigate to /contacts
    if (isLoggedIn) {
      navigate("/overview");
    } else if (!isLoggedIn) {
      navigate("/signup");
    }
    setExpanded(false); //
  };

  const navigateToCreate = () => {
    // 👇️ navigate to /contacts
    navigate("/create");
    setExpanded(false); //
  };
  const navigateToLogin = () => {
    // 👇️ navigate to /contacts
    navigate("/login");
    setExpanded(false); //
  };

  const navigateToSignup = () => {
    // 👇️ navigate to /contacts
    navigate("/signup");
    setExpanded(false); //
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUserId();
    navigateToLogin();
  };

  const renderAuthLinks = () => {
    if (userId) {
      return (
        <NavDropdown
          title={<span className="nav-dropdown-name">{userName}</span>}
          id="basic-nav-dropdown"
          align="end"
        >
          <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
        </NavDropdown>
      );
    } else {
      return (
        <>
          <Nav.Link as={Link} to={"/signup"}>
            Signup
          </Nav.Link>
          <Nav.Link as={Link} to={"/login"}>
            Login
          </Nav.Link>
        </>
      );
    }
  };

  const renderAuthNavLinks = () => {
    console.log(location.pathname);
    if (userId) {
      // User is logged in
      return (
        <>
          <Nav.Link onClick={navigateToHome}>Overview</Nav.Link>
          <Nav.Link onClick={navigateToCreate}>Create Cycle</Nav.Link>
        </>
      );
    } else {
      // User is logged out
      return <></>;
    }
  };
  return (
    <Navbar
      collapseOnSelect
      expanded={expanded}
      onToggle={(expanded) => setExpanded(expanded)}
      expand="lg"
      bg="light"
      variant="light"
    >
      <Container>
        <Navbar.Brand onClick={navigateToHome}>
          {" "}
          <img
            src={process.env.PUBLIC_URL + "/img/asquad-h-logo.png"}
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav activeKey={location.pathname} className="me-auto">
            {renderAuthNavLinks()}
          </Nav>
          <Nav activeKey={location.pathname} className="shift">
            {renderAuthLinks()}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default OurNavbar;
