import { Col, Row } from "react-bootstrap";

const SubtaskItem = ({ index, handleAddSubTask, indexGoals, subtask }) => {
  const indexSubtask = subtask._id;
  return (
    <div className="subtask-innerwrapper" key={indexSubtask}>
      <Row className="justify-content-center">
        <Col className="d-flex align-items-center justify-content-center">
          <input
            className="subTaskField"
            name="subTask "
            placeholder="Subtask"
            value={subtask.task}
            onChange={(event) => handleAddSubTask(indexGoals, index, event)}
          />
        </Col>
      </Row>
    </div>
  );
};

export default SubtaskItem;
