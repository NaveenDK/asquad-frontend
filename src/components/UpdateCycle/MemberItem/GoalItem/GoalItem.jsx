import { Col, Row, Button } from "react-bootstrap";

//Components
import SubtaskItem from "../SubtaskItem";

const GoalItem = ({
  index,
  goal,
  handleAddGoal,
  addSubTask,
  addGoal,
  handleAddSubTask,
}) => {
  const indexGoals = goal._id;

  return (
    <div className="goals-wrapper" key={indexGoals}>
      <label className="boldLabel">Goal Title</label>
      <Row className="justify-content-center">
        <Col className="d-flex align-items-center justify-content-center">
          <input
            className="mainGoal"
            name="mainGoal"
            placeholder="Main Goal Name"
            value={goal.mainGoal}
            onChange={(event) => handleAddGoal(index, event)}
          />
        </Col>

        <label className="boldLabel">Subtasks List</label>
        {goal.subTasks.map((subtask) => {
          return (
            <SubtaskItem
              handleAddSubTask={handleAddSubTask}
              subtask={subtask}
              indexGoals={indexGoals}
            />
          );
        })}
      </Row>
      <Row className="justify-content-center gap-4">
        <Button
          className="w-25 subtask-btn"
          onClick={() => addSubTask(indexGoals)}
        >
          Add Subtask
        </Button>
        <Button onClick={addGoal} className="w-25 goal-btn">
          Add Goal
        </Button>
      </Row>
    </div>
  );
};

export default GoalItem;
