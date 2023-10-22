import React from "react";
import {
  Container,
  Form,
  Stack,
  Button,
  FloatingLabel,
  FormControl,
} from "react-bootstrap";

const MyGroup = () => {
  return (
    <>
      <Container className="parentWrapper">
        <div className="innerWrapper">
          <div></div>
          <div className="general-form-wrapper pt-5">
            <Form className="FormContainer">
              <h4 style={{ textAlign: "center" }}>Group Xs </h4>
              <div className="buttonWrapper">
                <Button
                  type="button"
                  className="btn btn-outline-dark customWidthBtn"
                  data-mdb-ripple-color="dark"
                >
                  Create Cycle
                </Button>
              </div>
              <div className="buttonWrapper">
                <Button
                  type="button"
                  className="btn btn-outline-dark customWidthBtn"
                  data-mdb-ripple-color="dark"
                >
                  Add Members
                </Button>
              </div>
              <div className="buttonWrapper">
                <Button
                  type="button"
                  className="btn btn-outline-dark customWidthBtn"
                  data-mdb-ripple-color="dark"
                >
                  Current Cycles
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

export default MyGroup;
