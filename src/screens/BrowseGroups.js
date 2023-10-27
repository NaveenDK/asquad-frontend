import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React, { Component, useEffect, useState, useContext } from "react";
import { UserContext } from "../components/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;
const BrowseGroups = () => {
  const navigate = useNavigate();

  const { userId } = useContext(UserContext);
  const [allGroups, setAllGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token"); //
    const isLoggedIn = Boolean(localStorage.getItem("token"));
    const fetchData = async () => {
      try {
        if (userId && isLoggedIn) {
          // Check if adminId is defined
          const response = await axios.get(`${apiUrl}/groups`);

          setAllGroups(response.data);
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
    //  console.log("inOverview");
  }, [userId]);

  return (
    <>
      <h3 className="pt-5" style={{ textAlign: "center" }}>
        Browse Groups
      </h3>
      <Row className="mainrow">
        {allGroups.map((group) => {
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
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Button variant="primary">Join</Button>
                    </div>
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

export default BrowseGroups;
