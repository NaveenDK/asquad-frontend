import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
const MyGroups = () => {
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

  return (
    <>
      <h3 className="pt-5" style={{ textAlign: "center" }}>
        My Groups
      </h3>
      <Row className="mainrow">
        {myGroups.map((group) => {
          return (
            <Col xs={6} md={4}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      {group.title}
                    </Card.Title>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Button variant="primary">View</Button>
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

export default MyGroups;
