import Container from "react-bootstrap/Container";
import React, { Component, useEffect, useState, useContext } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { AdminContext } from "./AdminContext";
import NavDropdown from "react-bootstrap/NavDropdown";
import {
  Routes,
  Route,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";

function OurNavbar() {
  const navigate = useNavigate();
  const { adminId, setAdminId } = useContext(AdminContext);

  // const location = useLocation();
  // const adminId = location.pathname.split("/")[1];
  const navigateToHome = () => {
    // 👇️ navigate to /contacts
    navigate("/overview");
  };

  const navigateToCreate = () => {
    // 👇️ navigate to /contacts
    navigate("/create");
  };
  const navigateToLogin = () => {
    // 👇️ navigate to /contacts
    navigate("/login");
  };

  const navigateToSignup = () => {
    // 👇️ navigate to /contacts
    navigate("/signup");
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminId");
    setAdminId();
    navigateToLogin();
  };

  const renderAuthLinks = () => {
    if (adminId) {
      // User is logged in
      return <Nav.Link onClick={logout}>Logout</Nav.Link>;
    } else {
      // User is logged out
      return (
        <>
          <Nav.Link onClick={navigateToSignup}>Signup</Nav.Link>
          <Nav.Link onClick={navigateToLogin}>Login</Nav.Link>
        </>
      );
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand onClick={navigateToHome}>ASquad</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={navigateToHome}>Overview</Nav.Link>
            <Nav.Link onClick={navigateToCreate}>Create Cycle</Nav.Link>
            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav>{renderAuthLinks()}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default OurNavbar;
