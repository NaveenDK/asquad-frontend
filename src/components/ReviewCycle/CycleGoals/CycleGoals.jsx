//Styles
import { Row, Col, ListGroup, ProgressBar } from "react-bootstrap";

//Components
import CycleSubtasks from "../CycleSubtasks";

const CycleGoals = (handleCheckChange, userIndex, goal, goalIndex) => {
  return (
    <div className="goal-wrapper" key={goalIndex}>
      <Row>
        <Col>
          <p className="main-goal title">{goal.mainGoal}</p>
        </Col>
        <Col>
          <ProgressBar
            variant="success"
            now={goal.progress}
            label={`${goal.progress}%`}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup>
            {goal.subTasks &&
              goal.subTasks.map((subTask, subtaskIndex) => {
                return (
                  <CycleSubtasks
                    handleCheckChange={handleCheckChange}
                    userIndex={userIndex}
                    goalIndex={goalIndex}
                    subTask={subTask}
                    subtaskIndex={subtaskIndex}
                  />
                );
              })}
          </ListGroup>
        </Col>
      </Row>
      <Row>
        <Col></Col>
      </Row>
    </div>
  );
};

export default CycleGoals;
