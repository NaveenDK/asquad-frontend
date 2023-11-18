import React, { Component, useEffect, useState, useContext } from "react";
import {
  Container,
  Form,
  Stack,
  Button,
  FloatingLabel,
  FormControl,
} from "react-bootstrap";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../components/UserContext";
import Spinner from "react-bootstrap/Spinner";

import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const MyGroup = () => {
  const { userId } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [groupDetails, setGroupDetails] = useState();
  useEffect(() => {
    // setLoading(true);
    const token = localStorage.getItem("token"); //
    const isLoggedIn = Boolean(localStorage.getItem("token"));

    const fetchData = async () => {
      console.log("groupId");
      console.log(groupId);
      try {
        if (groupId && isLoggedIn) {
          // Check if adminId is defined
          const response = await axios.get(`${apiUrl}/groups/${groupId}`, {
            headers: {
              "x-auth-token": token,
            },
          });
          console.log("Response.data:");
          const group = response.data;
          setGroupDetails(group);
          // console.log(groupDetails);
          console.log("groupDetails::");
          console.log(groupDetails);
        } else {
          navigate("/signup");
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const deleteGroup = async (e, groupId, userId) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        `${apiUrl}/groups/delete`,
        {
          groupId,
          userId,
        },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      navigate("/userwelcome");
    } catch (error) {
      console.error(error);
    }
  };

  const navigateToCreate = () => {
    // 👇️ navigate to /contacts
    navigate("create");
  };

  const navigateToCurrentCycles = () => {
    // 👇️ navigate to /contacts
    navigate("currentcycles");
  };
  const navigatetoAddMember = () => {
    navigate("addmember");
  };
  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner animation="border" />
        </div>
      ) : (
        <Container className="parentWrapper">
          <div className="innerWrapper">
            <div></div>
            <div className="general-form-wrapper pt-5">
              <Form className="FormContainer">
                <h4 style={{ textAlign: "center" }}>
                  Group {groupDetails && groupDetails.groupname}{" "}
                </h4>
                <div className="buttonWrapper">
                  <Button
                    onClick={navigateToCreate}
                    type="button"
                    className="btn btn-outline-dark customWidthBtn"
                    data-mdb-ripple-color="dark"
                  >
                    Create Cycle
                  </Button>
                </div>
                <div className="buttonWrapper">
                  {/* <Button
                    type="button"
                    className="btn btn-outline-dark customWidthBtn"
                    data-mdb-ripple-color="dark"
                    onClick={navigatetoAddMember}
                  >
                    Add Members
                  </Button> */}
                </div>
                <div className="buttonWrapper">
                  <Button
                    onClick={navigateToCurrentCycles}
                    type="button"
                    className="btn btn-outline-dark customWidthBtn"
                    data-mdb-ripple-color="dark"
                  >
                    Current Cycles
                  </Button>
                </div>
                <div className="buttonWrapper">
                  <Button
                    type="button warning"
                    className="warning"
                    data-mdb-ripple-color="dark"
                    onClick={(e) => deleteGroup(e, groupId, userId)}
                  >
                    Delete Group
                  </Button>
                </div>
                <br></br>
              </Form>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default MyGroup;
