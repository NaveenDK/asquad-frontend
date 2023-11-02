import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

//Styles
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";

//Custom Hook
import { useAdminContext } from "../../hooks/useAdminContext";

//Components
import MainLayout from "../MainLayout";
import CycleCard from "./CycleCard";

//Services
import { deleteCycle, fetchAllCycles } from "../../services/cycleServices";

//Utils
import { getToken } from "../../utils/Token/tokenUtils";

const Overview = () => {
  const { adminId } = useAdminContext();
  const [loading, setLoading] = useState(true);
  const [cycles, setCycles] = useState([]);

  const navigate = useNavigate();
  const navigateToCreate = () => {
    navigate("/create");
  };

  const deleteCycleHandler = async (cycleId) => {
    await deleteCycle(adminId, cycleId);
    setCycles(cycles.filter((item) => item._id !== cycleId));
  };

  const fetchCycles = useCallback(async () => {
    const isLoggedIn = Boolean(getToken());
    setLoading(true);

    if (adminId && isLoggedIn) {
      const response = await fetchAllCycles(adminId);
      setCycles(response);
    } else {
      navigate("/signup");
    }

    setLoading(false);
  }, [adminId, navigate]);

  useEffect(() => {
    fetchCycles();
  }, [fetchCycles, adminId, navigate]);

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
              {cycles?.length === 0 ? ( // Check if cycles.length is zero
                <Row className="d-flex justify-content-center align-items-center ">
                  <div className="d-flex justify-content-center wrapper-empty">
                    <div className="text-empty">
                      No Cycles found, click below to start adding
                    </div>
                  </div>
                </Row>
              ) : (
                <>
                  {cycles?.map((currentCycle) => (
                    <CycleCard
                      adminId={adminId}
                      cycle={currentCycle}
                      deleteCycle={deleteCycleHandler}
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
