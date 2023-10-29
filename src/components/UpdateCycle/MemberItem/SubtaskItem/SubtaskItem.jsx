import { useRef } from "react";

//Styles
import { Col, Row } from "react-bootstrap";

//Reducer actions
import { updateCycleActions } from "../../../../Reducers/updateCycleReducer";

const SubtaskItem = ({ dispatch, memberInfo }) => {
  const subtaskRef = useRef();

  const changeSubtaskName = () => {
    const subTaskTitle = subtaskRef.current.value;

    dispatch({
      type: updateCycleActions.changeSubtaskName,
      payload: {
        ...memberInfo,
        subTaskTitle: subTaskTitle,
      },
    });
  };

  return (
    <div className="subtask-innerwrapper" key={memberInfo.subtaskId}>
      <Row className="justify-content-center">
        <Col className="d-flex align-items-center justify-content-center">
          <input
            ref={subtaskRef}
            className="subTaskField"
            name="subTask "
            placeholder="Subtask"
            onChange={changeSubtaskName}
          />
        </Col>
      </Row>
    </div>
  );
};

export default SubtaskItem;
