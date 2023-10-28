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

  const handleJoinGroup = async (userId, groupId) => {
    const token = localStorage.getItem("token");
    console.log("is token in here: ");
    console.log(token);
    try {
      const res = await axios.post(
        `${apiUrl}/groups/${groupId}/join?userId=${userId}`,
        {},
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      const updatedGroup = res.data;
      setGroupDetails(updatedGroup);
    } catch (error) {
      console.log(error);
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
                    {groupDetails && groupDetails.groupname}
                  </h4>

                  <div>
                    <p>{groupDetails && groupDetails.description}</p>
                  </div>
                  <div>
                    <h6>
                      {groupDetails &&
                        groupDetails.categories[0].map((e) => (
                          <Badge>{e.label}</Badge>
                        ))}

                      <p> {groupDetails.categories[0].label} </p>
                      <p></p>
                    </h6>
                  </div>
                  <div className="buttonWrapper">
                    {!groupDetails.users.includes(userId) &&
                    groupDetails.creatorId != userId ? (
                      <Button
                        onClick={() => handleJoinGroup(userId, groupId)}
                        type="button"
                        className="btn btn-outline-dark customWidthBtn"
                        data-mdb-ripple-color="dark"
                      >
                        Join Group
                      </Button>
                    ) : (
                      <p>You are already in this group</p>
                    )}
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
      )}
    </>
  );
};

export default GroupDetails;
