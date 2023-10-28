import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import React, { Component, useEffect, useState, useContext } from "react";
import { UserContext } from "../components/UserContext";

import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const MyGroups = () => {
  const navigate = useNavigate();

  const [myGroups, setMyGroups] = useState([
    {
      key: "1",
      title: "Productivity",
    },
    {
      key: "2",
      title: "Piano",
    },
    {
      key: "3",
      title: "Nice work",
    },
  ]);

  const { userId } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [userCreatedGroups, setUserCreatedGroups] = useState([]);
  const [userbelongGroups, setUserBelongGroups] = useState([]);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token"); //
    const isLoggedIn = Boolean(localStorage.getItem("token"));
    const fetchData = async () => {
      try {
        if (userId && isLoggedIn) {
          // Check if adminId is defined
          const ucgroupsRes = await axios.get(
            `${apiUrl}/users/${userId}/uc-groups`,
            {
              headers: {
                "x-auth-token": token,
              },
            }
          );

          setUserCreatedGroups(ucgroupsRes.data);

          const userbelongGroupsRes = await axios.get(
            `${apiUrl}/users/${userId}/my-groups`,
            {
              headers: {
                "x-auth-token": token,
              },
            }
          );

          setUserBelongGroups(userbelongGroupsRes.data);
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
    console.log("inOverview");
  }, [userId]);

  return (
    <>
      <h3 className="pt-5" style={{ textAlign: "center" }}>
        My Groups
      </h3>
      <Row className="mainrow">
        <h4 className="pb-4" style={{ textAlign: "center" }}>
          Organizer
        </h4>
        {userCreatedGroups.map((group) => {
          return (
            <Col xs={6} md={4}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      {group.groupname}
                    </Card.Title>
                    <Link to={group._id}>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Button variant="primary">View</Button>
                      </div>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          );
        })}
      </Row>
      <Row className="mainRow">
        <h4 className="pb-4" style={{ textAlign: "center" }}>
          Member
        </h4>
        {userbelongGroups.map((group) => {
          return (
            <Col xs={6} md={4}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      {group.groupname}
                    </Card.Title>
                    <Link to={group._id}>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Button variant="primary">View</Button>
                      </div>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default MyGroups;
