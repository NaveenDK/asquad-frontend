import { useNavigate } from "react-router-dom";

//Styles
import { Container, Nav, Navbar } from "react-bootstrap";

//Custom hook
import { useAdminContext } from "../hooks/useAdminContext";

function LandingNav() {
  const isLoggedIn = Boolean(localStorage.getItem("token"));
  const navigate = useNavigate();
  const { adminId, setAdminId } = useAdminContext();

  const navigateToHome = () => {
    // 👇️ navigate to /overview
    if (isLoggedIn) {
      navigate("/overview");
    } else if (!isLoggedIn) {
      navigate("/");
    }
  };

  const navigateToCreate = () => {
    // 👇️ navigate to /create
    navigate("/create");
  };
  const navigateToLogin = () => {
    // 👇️ navigate to /login
    navigate("/login");
  };

  const navigateToSignup = () => {
    // 👇️ navigate to /signup
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

  const renderAuthNavLinks = () => {
    if (adminId) {
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
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand onClick={navigateToHome}>ASquad</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">{renderAuthNavLinks()}</Nav>
          <Nav>{renderAuthLinks()}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default LandingNav;
