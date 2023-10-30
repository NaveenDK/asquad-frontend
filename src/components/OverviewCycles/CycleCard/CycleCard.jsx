import { Link } from "react-router-dom";

//Styles
import { Card, Col, Row } from "react-bootstrap";

const Cycle = (props) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const isLastCard = props.cycle === props.cycles[props.cycles.length - 1];

  return (
    <Card
      className={`card h-200 custom-style ${isLastCard ? "last-card" : ""}`}
      key={props.key}
    >
      <Card.Body>
        <Row>
          <Col className="col-6 d-flex align-items-center">
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
                </h6>
              </div>
            </div>
          </Col>
          <Col className="col-2 d-flex align-items-center">
            <div className="custom-Button mx-auto">
              <Link to={`/review/${props.cycle._id}`}>
                <img
                  src={process.env.PUBLIC_URL + "/img/review-v1.png"}
                  alt="review"
                />
                review
              </Link>
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
              </Link>
            </div>
          </Col>

          <Col className="col-2  d-flex align-items-center">
            <div className="custom-Button">
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
};

export default Cycle;
