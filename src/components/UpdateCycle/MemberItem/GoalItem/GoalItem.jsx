import { Col, Row, Button } from "react-bootstrap";

//Components
import SubtaskItem from "../SubtaskItem";

const GoalItem = ({
  dispatch,
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
            onChange={(event) => handleAddGoal(index)}
          />
        </Col>

        <label className="boldLabel">Subtasks List</label>
        {goal.subTasks.map((subtask, index) => {
          return (
            <SubtaskItem
              index={index}
              handleAddSubTask={handleAddSubTask}
              subtask={subtask}
              indexGoals={index}
            />
          );
        })}
      </Row>
      <Row className="justify-content-center gap-4">
        <Button className="w-25 subtask-btn" onClick={() => addSubTask(index)}>
          Add Subtask
        </Button>
        <Button onClick={() => addGoal(indexGoals)} className="w-25 goal-btn">
          Add Goal
        </Button>
      </Row>
    </div>
  );
};

export default GoalItem;
