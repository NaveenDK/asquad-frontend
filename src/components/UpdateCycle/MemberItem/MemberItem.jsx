//Styles
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "react-datepicker/dist/react-datepicker.css";

//Components
import GoalItem from "./GoalItem/GoalItem";

const MemberItem = ({ input, index, users, isDesktop, setUsers }) => {
  const changeInputInfo = (event) => {
    const data = [...users];
    data[index][event.target.name] = event.target.value;
    setUsers(data);
  };

  const removeFields = () => {
    let data = [...users];
    data.splice(index, 1);
    setUsers(data);
  };

  const addGoal = () => {
    let newGoal = {
      mainGoal: "",
      progress: 0,
      subTasks: [{ task: "", done: false }],
    };
    const tempUsers = [...users];
    tempUsers[index].goals.push(newGoal);

    setUsers(tempUsers);
  };

  const addSubTask = (i) => {
    let newSubTask = { task: "", done: false };
    const tempUsers = [...users];
    tempUsers[index].goals[i].subTasks.push(newSubTask);
    setUsers(tempUsers);
  };

  const handleAddGoal = (indexObject, event) => {
    const goalsOfUser = users[indexObject].goals;
    const tempUsers = [...users];

    goalsOfUser[indexObject][event.target.name] = event.target.value;
    tempUsers[indexObject].goals = goalsOfUser;
    setUsers(tempUsers);
  };

  const handleAddSubTask = (goalIndex, subTaskIndex, event) => {
    let subTasksOfGoal = [...users[index].goals[goalIndex].subTasks];
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
            onChange={changeInputInfo}
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
            onChange={changeInputInfo}
            className="rounded-3"
          />
        </Col>
      </Row>

      {input.goals.map((goal, index) => {
        return (
          <GoalItem
            index={index}
            goal={goal}
            handleAddGoal={handleAddGoal}
            addSubTask={addSubTask}
            addGoal={addGoal}
            handleAddSubTask={handleAddSubTask}
          />
        );
      })}
    </div>
  );
};
export default MemberItem;
