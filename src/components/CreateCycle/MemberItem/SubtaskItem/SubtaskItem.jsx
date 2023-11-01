import { useRef } from "react";

//Styles
import { Col, Row, Button } from "react-bootstrap";

//Reducer actions
import { createCycleActions } from "../../../../Reducers/createCycleReducer";

const SubtaskItem = ({ dispatch, info, subtask }) => {
  const subtaskRef = useRef();

  const changeSubtaskName = () => {
    const subTaskTitle = subtaskRef.current.value;

    dispatch({
      type: createCycleActions.changeSubtaskName,
      payload: {
        ...info,
        subTaskTitle: subTaskTitle,
      },
    });
  };

  const deleteSubtask = () => {
    dispatch({
      type: createCycleActions.deleteSubtask,
      payload: {
        ...info,
      },
    });
  };

  return (
    <div className="subtask-innerwrapper" key={info.subtaskId}>
      <Row className="justify-content-center">
        <Col
          xs={7}
          className="d-flex align-items-center justify-content-center"
        >
          <input
            ref={subtaskRef}
            className="subTaskField"
            name="subTask "
            placeholder="Subtask"
            value={subtask.task}
            onChange={changeSubtaskName}
          />
        </Col>

        <Col
          xs={1}
          className="d-flex align-items-center justify-content-center"
        >
          <Button
            onClick={deleteSubtask}
            className="btn btn-danger font-weight-bold mt-3"
          >
            Delete
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default SubtaskItem;
