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
import { Helmet } from "react-helmet-async";
import { format, parseISO } from "date-fns";

const apiUrl = process.env.REACT_APP_API_URL;

function Cycle(props) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const isLastCard = props.cycle === props.cycles[props.cycles.length - 1];

  return (
    <Card
      className={`card h-200 custom-style ${isLastCard ? "last-card" : ""}`}
    >
      <Card.Body>
        <Row>
          <Col className="col-6 d-flex align-items-center">
            {" "}
            <div className="cyclePeriod   d-flex align-items-center">
              <div className="cycleItem  d-flex align-items-center">
                <h6 className="p-2  d-flex align-items-center">
                  {new Date(props.cycle.startDate).toLocaleDateString(
                    "us-EN",
                    options
                  )}{" "}
                  -{" "}
                  {new Date(props.cycle.endDate).toLocaleDateString(
                    "us-EN",
                    options
                  )}
                </h6>{" "}
              </div>
            </div>
          </Col>
          <Col className="col-2 d-flex align-items-center">
            <div className="custom-Button mx-auto">
              {" "}
              <Link to={`/review/${props.cycle._id}`}>
                <img
                  src={process.env.PUBLIC_URL + "/img/review-v1.png"}
                  alt="review"
                />
                review
              </Link>{" "}
            </div>
          </Col>
          <Col className="col-2  d-flex align-items-center">
            <div className="custom-Button mx-auto">
              <Link to={`/update/${props.cycle._id}`}>
                <img
                  src={process.env.PUBLIC_URL + "/img/edit-v1.png"}
                  alt="update"
                />
                update
              </Link>{" "}
            </div>
          </Col>

          <Col className="col-2  d-flex align-items-center">
            <div className="custom-Button">
              {" "}
              <Link
                onClick={() => {
                  props.deleteCycle(props.cycle._id);
                }}
                to={"#"}
              >
                <img
                  src={process.env.PUBLIC_URL + "/img/delete-v1.png"}
                  alt="delete"
                />
                delete
              </Link>
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
    console.log("inOverview");
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
    <>
      <Helmet>
        <title>Overview </title>
        <meta name="description" content="Asquad - accountability made easy" />
      </Helmet>
      <Container>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <Spinner animation="border" />
          </div>
        ) : (
          <>
            <MainLayout title="Overview">
              {cycles.length === 0 ? ( // Check if cycles.length is zero
                <Row className="d-flex justify-content-center align-items-center ">
                  <div className="d-flex justify-content-center wrapper-empty">
                    <div className="text-empty">
                      {" "}
                      No Cycles found, click below to start adding
                    </div>
                  </div>
                </Row>
              ) : (
                <>
                  {cycles.map((currentCycle) => (
                    <Cycle
                      adminId={adminId}
                      cycle={currentCycle}
                      deleteCycle={deleteCycle}
                      startDate={currentCycle.startDate}
                      endDate={currentCycle.endDate}
                      key={currentCycle._id}
                      cycles={cycles}
                    />
                  ))}
                </>
              )}
              <Row>
                <Col className="d-flex justify-content-center">
                  <Button
                    onClick={navigateToCreate}
                    className="align-self-center blackBigBtn"
                  >
                    Create Cycle
                  </Button>
                </Col>
              </Row>
            </MainLayout>
          </>
        )}
      </Container>
    </>
  );
};

export default Overview;
