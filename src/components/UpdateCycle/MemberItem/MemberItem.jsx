import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "react-datepicker/dist/react-datepicker.css";

export const MemberItem = ({ input, index, users, isDesktop, setUsers }) => {
  const handleAddMore = (index, event) => {
    let data = [...users];
    data[index][event.target.name] = event.target.value;

    setUsers(data); //[{firstName:"fn", lastName:"ln"},{firstName:}]}
  };

  const handleAddGoal = (index, goalIndex, event) => {
    let goalsOfUser = [...users[index].goals];
    goalsOfUser[goalIndex][event.target.name] = event.target.value;

    //console.log("printing goalsOfUser: " + JSON.stringify(goalsOfUser))

    console.log("users" + JSON.stringify(users));
    const tempUsers = [...users];
    tempUsers[index].goals = goalsOfUser;
    setUsers(tempUsers);
  };

  const handleAddSubTask = (index, goalIndex, subTaskIndex, event) => {
    let subTasksOfGoal = [...users[index].goals[goalIndex].subTasks];
    subTasksOfGoal[subTaskIndex].task = event.target.value;
    console.log("printing subTasksOfGoal: " + JSON.stringify(subTasksOfGoal));
    const tempUsers = [...users];
    tempUsers[index].goals[goalIndex].subTasks = subTasksOfGoal;
    setUsers(tempUsers);
    console.log("users" + JSON.stringify(users));
  };

  const addGoal = (index) => {
    let newGoal = {
      mainGoal: "",
      progress: 0,
      subTasks: [{ task: "", done: false }],
    };
    const tempUsers = [...users];
    tempUsers[index].goals.push(newGoal);

    setUsers(tempUsers);
  };

  const addSubTask = (index, i) => {
    console.log("add subtask clicked");
    let newSubTask = { task: "", done: false };
    const tempUsers = [...users];
    tempUsers[index].goals[i].subTasks.push(newSubTask);
    setUsers(tempUsers);
  };

  const removeFields = (index) => {
    let data = [...users];
    data.splice(index, 1);
    setUsers(data);
  };

  return (
    <div className="singleOwnerField" key={index}>
      <Row className={"align-items-center justify-content-end"}>
        <Col xs={5}>
          <Button
            className="btn btn-danger font-weight-bold mt-3"
            onClick={() => removeFields(index)}
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
            onChange={(event) => handleAddMore(index, event)}
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
            onChange={(event) => handleAddMore(index, event)}
            className="rounded-3"
          />
        </Col>
      </Row>

      {input.goals.map((goal, i) => {
        return (
          <div className="goals-wrapper" key={i}>
            <label className="boldLabel">Goal Title</label>
            <Row className="justify-content-center">
              <Col className="d-flex align-items-center justify-content-center">
                <input
                  className="mainGoal"
                  name="mainGoal"
                  placeholder="Main Goal Name"
                  value={goal.mainGoal}
                  onChange={(event) => handleAddGoal(index, i, event)}
                />
              </Col>

              <label className="boldLabel">Subtasks List</label>
              {goal.subTasks.map((sb, j) => {
                return (
                  <div className="subtask-innerwrapper" key={j}>
                    <Row className="justify-content-center">
                      <Col className="d-flex align-items-center justify-content-center">
                        <input
                          className="subTaskField"
                          name="subTask "
                          placeholder="Subtask"
                          value={sb.task}
                          onChange={(event) =>
                            handleAddSubTask(index, i, j, event)
                          }
                        />
                      </Col>
                    </Row>
                  </div>
                );
              })}
            </Row>
            <Row className="justify-content-center gap-4">
              <Button
                className="w-25 subtask-btn"
                onClick={() => addSubTask(index, i)}
              >
                Add Subtask
              </Button>
              <Button onClick={() => addGoal(index)} className="w-25 goal-btn">
                Add Goal
              </Button>
            </Row>
          </div>
        );
      })}
    </div>
  );
};
