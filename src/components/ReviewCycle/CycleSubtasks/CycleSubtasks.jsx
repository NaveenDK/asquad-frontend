import { Form } from "react-bootstrap";

const CycleSubtasks = (
  handleCheckChange,
  userIndex,
  goalIndex,
  subTask,
  subtaskIndex
) => {
  return (
    <Form key={subtaskIndex}>
      <div key={subTask} className="mb-3">
        <Form.Check
          as="input"
          type="checkbox"
          id={subTask.task}
          defaultChecked={subTask.done}
          value={subTask.done}
          label={subTask.task}
          onChange={() => handleCheckChange(subtaskIndex, goalIndex, userIndex)}
        />
      </div>
    </Form>
  );
};

export default CycleSubtasks;
