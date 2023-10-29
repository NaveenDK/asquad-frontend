import React, { Component, useEffect, useState, useContext } from "react";
import { Container, Form, Button, Badge } from "react-bootstrap";
import { UserContext } from "../components/UserContext";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const GroupDetails = () => {
  const { userId } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [groupDetails, setGroupDetails] = useState();
  const [isMember, setIsMember] = useState(false);
  const [groupUsers, setGroupUsers] = useState();

  function checkIsMember(userId, groupDetails) {
    console.log("CHECK ISMEMBER");
    console.log(JSON.stringify(groupDetails));
    if (
      groupDetails &&
      groupDetails.users &&
      groupDetails.users.includes(userId)
    ) {
      console.log("setting it true");
      setIsMember(true);
    } else {
      setIsMember(false);
      console.log("do nothing");
    }
  }

  useEffect(() => {
    setLoading(true);
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
          console.log("isMember");
          console.log(isMember);
          checkIsMember(userId, response.data);

          // setGroupDetails(group);
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
  }, [groupId, isMember]);

  const handleJoinLeaveGroup = async (e, userId, groupId, action) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log("did we get user ID");
    console.log(userId);
    console.log("is token in here: ");
    console.log(token);
    setLoading(true);
    if (action === "JOIN") {
      try {
        const res = await axios.put(
          `${apiUrl}/groups/${groupId}/join`,
          { userId },
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
        const updatedGroup = res.data;
        console.log("UpdatedGroup: ");
        console.log(updatedGroup);
        setGroupDetails(updatedGroup);
        setGroupUsers(res.data.users);
        setIsMember(true);
        //checkIsMember(userId, res.data);
      } catch (error) {
        console.log(error);
      } finally {
        if (groupDetails) {
          setLoading(false);
        }
      }
    } else if (action == "LEAVE") {
      try {
        const res = await axios.put(
          `${apiUrl}/groups/${groupId}/leave`,
          { userId },
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
        const updatedGroup = res.data;

        setGroupDetails(updatedGroup);
        setGroupUsers(res.data.users);
        checkIsMember(userId, res.data);
      } catch (error) {
        console.log(error);
      } finally {
        if (groupDetails) {
          setLoading(false);
        }
      }
    }
  };
  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <Container className="parentWrapper">
            <div className="innerWrapper">
              <div></div>
              <div className="general-form-wrapper pt-5">
                <Form className="FormContainer">
                  <h4 style={{ textAlign: "center" }}>
                    {groupDetails.groupname && groupDetails.groupname}
                  </h4>

                  <div>
                    <p>
                      {groupDetails.description && groupDetails.description}
                    </p>
                  </div>
                  <div></div>
                  <div className="buttonWrapper">
                    {isMember ? (
                      <Button
                        onClick={(e) =>
                          handleJoinLeaveGroup(e, userId, groupId, "LEAVE")
                        }
                      >
                        Leave Group
                      </Button>
                    ) : (
                      <Button
                        onClick={(e) =>
                          handleJoinLeaveGroup(e, userId, groupId, "JOIN")
                        }
                        type="button"
                        className="btn btn-outline-dark customWidthBtn"
                        data-mdb-ripple-color="dark"
                      >
                        Join Group
                      </Button>
                    )}
                  </div>
                  <div className="buttonWrapper">
                    <Button
                      onClick={() =>
                        handleJoinLeaveGroup(userId, groupId, "LEAVE")
                      }
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
      )}
    </>
  );
};

export default GroupDetails;
