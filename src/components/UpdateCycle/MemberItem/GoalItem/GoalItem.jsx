import { useRef } from "react";

//Styles
import { Col, Row, Button } from "react-bootstrap";

//Components
import SubtaskItem from "../SubtaskItem";

//reducerActions
import { updateCycleActions } from "../../../../Reducers/updateCycleReducer";

const GoalItem = ({ dispatch, memberInfo, goal }) => {
  const goalRef = useRef();

  const changeGoalName = () => {
    const goalTitle = goalRef.current.value;

    dispatch({
      type: updateCycleActions.changeGoalName,
      payload: {
        ...memberInfo,
        goalTitle: goalTitle,
      },
    });
  };

  const addGoal = () => {
    dispatch({
      type: updateCycleActions.createNewGoal,
      payload: { id: memberInfo.userId },
    });
  };

  const addSubTask = () => {
    dispatch({
      type: updateCycleActions.createNewSubtask,
      payload: { id: memberInfo.userId, goalId: memberInfo.goalId },
    });
  };

  return (
    <div className="goals-wrapper" key={memberInfo.goalId}>
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
        {goal.subTasks.map((subtask) => {
          return (
            <SubtaskItem
              dispatch={dispatch}
              subtask={subtask}
              memberInfo={{ ...memberInfo, subtaskId: subtask._id }}
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
