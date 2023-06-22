import React, { Component, useEffect, useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { AdminContext } from "./AdminContext";
//import cycles from '../data/cycles'
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import MainLayout from "./MainLayout";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

import { format, parseISO } from "date-fns";

const apiUrl = process.env.REACT_APP_API_URL;

function Cycle(props) {
  const options = { year: "numeric", month: "long", day: "numeric" };

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col className="col-6">
            {" "}
            <div className="cyclePeriod  ">
              <div className="cycleItem">
                <h5 className="p-2 ">
                  {new Date(props.cycle.startDate).toLocaleDateString(
                    "us-EN",
                    options
                  )}{" "}
                  -{" "}
                  {new Date(props.cycle.endDate).toLocaleDateString(
                    "us-EN",
                    options
                  )}
                </h5>{" "}
              </div>
            </div>
          </Col>
          <Col className="col-2">
            <div className="custom-Button mx-auto">
              {" "}
              <Link to={`/review/${props.cycle._id}`}>Review</Link>{" "}
            </div>
          </Col>
          <Col className="col-2">
            <div className="custom-Button mx-auto">
              <Link
                onClick={() => {
                  props.deleteCycle(props.cycle._id);
                }}
                to={"#"}
              >
                delete
              </Link>{" "}
            </div>
          </Col>

          <Col className="col-2">
            <div className="custom-Button">
              {" "}
              <Link to={`/update/${props.cycle._id}`}>Update Cycle</Link>{" "}
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

const Overview = () => {
  const { adminId } = useContext(AdminContext);
  const [loading, setLoading] = useState(true);
  const [cycles, setCycles] = useState([]);

  const deleteCycle = (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`${apiUrl}/admins/${adminId}/cycles/${id}`, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => console.log(res.data));

    setCycles(cycles.filter((item) => item._id !== id));
  };

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token"); //
    const fetchData = async () => {
      try {
        if (adminId) {
          // Check if adminId is defined
          const response = await axios.get(
            `${apiUrl}/admins/${adminId}/cycles`,
            {
              headers: {
                "x-auth-token": token,
              },
            }
          );

          setCycles(response.data);
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [adminId]);
  const navigate = useNavigate();
  const navigateToCreate = () => {
    // 👇️ navigate to /contacts
    navigate("/create");
  };

  // const cycleList = () => {
  //   if (cycles) {
  //     return cycles.map((currentCycle) => {
  //       return (
  //         <Cycle
  //           adminId={adminId}
  //           cycle={currentCycle}
  //           deleteCycle={deleteCycle}
  //           startDate={currentCycle.startDate}
  //           endDate={currentCycle.endDate}
  //           key={currentCycle._id}
  //         />
  //       );
  //     });
  //   }
  // };

  return (
    <Container>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <MainLayout title="Overview">
            {cycles.map((currentCycle) => (
              <Cycle
                adminId={adminId}
                cycle={currentCycle}
                deleteCycle={deleteCycle}
                startDate={currentCycle.startDate}
                endDate={currentCycle.endDate}
                key={currentCycle._id}
              />
            ))}
            <Row>
              <Col className="d-flex justify-content-center">
                <Button
                  onClick={navigateToCreate}
                  className="align-self-center blackBigBtn"
                >
                  {" "}
                  Create Cycle{" "}
                </Button>{" "}
              </Col>
            </Row>
          </MainLayout>
        </>
      )}
    </Container>
  );
};

export default Overview;
