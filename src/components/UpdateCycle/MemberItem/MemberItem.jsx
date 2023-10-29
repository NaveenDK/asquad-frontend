//Styles
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "react-datepicker/dist/react-datepicker.css";

//Components
import GoalItem from "./GoalItem/GoalItem";

//Reducer actions
import { updateCycleActions } from "../../../Reducers/updateCycleReducer";

const MemberItem = ({ dispatch, input, index, users, isDesktop, setUsers }) => {
  const changeFirstName = (event) => {
    dispatch({
      type: updateCycleActions.changeMemberName,
      payload: { firstName: event.target.value, id: input._id },
    });
  };

  const changeLastName = (event) => {
    dispatch({
      type: updateCycleActions.changeMemberLastname,
      payload: { lastName: event.target.value, id: input._id },
    });
  };

  const removeFields = () => {
    dispatch({
      type: updateCycleActions.deleteUser,
      payload: { index: index },
    });
  };

  const handleAddSubTask = (goalIndex, subTaskIndex, event) => {
    const subTasksOfGoal = [...users[index].goals[goalIndex].subTasks];
    subTasksOfGoal[subTaskIndex].task = event.target.value;
    const tempUsers = [...users];
    tempUsers[index].goals[goalIndex].subTasks = subTasksOfGoal;
    setUsers(tempUsers);
  };

  return (
    <div className="singleOwnerField" key={index}>
      <Row className={"align-items-center justify-content-end"}>
        <Col xs={5}>
          <Button
            className="btn btn-danger font-weight-bold mt-3"
            onClick={removeFields}
          >
            DELETE MEMBER
          </Button>
        </Col>
      </Row>

      <Col xs={12}>
        <label className="boldLabel">Member Name</label>
      </Col>
      <Row className={"justify-content-center"}>
        <Col
          xs={12}
          md={5}
          className={`${isDesktop ? " justify-content-end" : ""}`}
        >
          <Form.Control
            type="text"
            name="firstName"
            placeholder="First Name"
            value={input.firstName}
            onChange={changeFirstName}
            className="rounded-3"
          />
        </Col>
        <Col
          xs={12}
          md={5}
          className={`${isDesktop ? " justify-content-start" : ""}`}
        >
          <Form.Control
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={input.lastName}
            onChange={changeLastName}
            className="rounded-3"
          />
        </Col>
      </Row>

      {input.goals.map((goal, index) => {
        return (
          <GoalItem
            dispatch={dispatch}
            memberInfo={{ userId: input._id, goalId: goal._id }}
            index={index}
            goal={goal}
            handleAddSubTask={handleAddSubTask}
          />
        );
      })}
    </div>
  );
};
export default MemberItem;
