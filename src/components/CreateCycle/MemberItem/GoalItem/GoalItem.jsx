import { useRef } from "react";

//Styles
import { Col, Row, Button } from "react-bootstrap";

//Components
import SubtaskItem from "../SubtaskItem";

//reducerActions
import { createCycleActions } from "../../../../Reducers/createCycleReducer";

const GoalItem = ({ dispatch, info, goal }) => {
  const goalRef = useRef();

  const changeGoalName = () => {
    const goalTitle = goalRef.current.value;

    dispatch({
      type: createCycleActions.changeGoalName,
      payload: {
        ...info,
        goalTitle: goalTitle,
      },
    });
  };

  const addGoal = () => {
    dispatch({
      type: createCycleActions.createNewGoal,
      payload: { userId: info.userId },
    });
  };

  const addSubTask = () => {
    dispatch({
      type: createCycleActions.createNewSubtask,
      payload: { ...info },
    });
  };

  return (
    <div className="goals-wrapper" key={info.goalId}>
      <label className="boldLabel">Goal Title</label>
      <Row className="justify-content-center">
        <Col className="d-flex align-items-center justify-content-center">
          <input
            ref={goalRef}
            className="mainGoal"
            name="mainGoal"
            placeholder="Main Goal Name"
            value={goal.mainGoal}
            onChange={changeGoalName}
          />
        </Col>

        <label className="boldLabel">Subtasks List</label>
        {goal.subTasks.map((subtask, index) => {
          return (
            <SubtaskItem
              dispatch={dispatch}
              subtask={subtask}
              info={{ ...info, subtaskId: index }}
            />
          );
        })}
      </Row>
      <Row className="justify-content-center gap-4">
        <Button className="w-25 subtask-btn" onClick={addSubTask}>
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
