import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate, Navigate } from "react-router-dom";
const WelcomeUser = () => {
  const navigate = useNavigate();

  const navigateToMyGroups = () => {
    // 👇️ navigate to /contacts
    navigate("/mygroups");
    //setExpanded(false); //
  };
  const navigateToCreateGroups = () => {
    navigate("/creategroup");
  };

  const navigateToBrowseGroups = () => {
    navigate("/browsegroups");
  };

  return (
    <>
      <Container className="parentWrapper">
        <div className="innerWrapper">
          <div></div>
          <div className="general-form-wrapper pt-5">
            <Form className="FormContainer">
              <h4 style={{ textAlign: "center" }}>Hi, Nick</h4>
              <div className="buttonWrapper">
                <Button
                  type="button"
                  className="btn btn-outline-dark customWidthBtn"
                  data-mdb-ripple-color="dark"
                  onClick={navigateToMyGroups}
                >
                  My Groups
                </Button>
              </div>
              <div className="buttonWrapper">
                <Button
                  type="button"
                  className="btn btn-outline-dark customWidthBtn"
                  data-mdb-ripple-color="dark"
                  onClick={navigateToCreateGroups}
                >
                  Create Groups
                </Button>
              </div>
              <div className="buttonWrapper">
                <Button
                  type="button"
                  className="btn btn-outline-dark customWidthBtn"
                  data-mdb-ripple-color="dark"
                  onClick={navigateToBrowseGroups}
                >
                  Browse Groups
                </Button>
              </div>
              <br></br>
            </Form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default WelcomeUser;
