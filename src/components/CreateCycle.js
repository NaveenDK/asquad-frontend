import React, { Component, useEffect, useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { AdminContext } from "./AdminContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Label from "react-bootstrap/FormLabel";
import MainLayout from "./MainLayout";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";

const apiUrl = process.env.REACT_APP_API_URL;

const CreateCycle = () => {
  const navigate = useNavigate();
  const { adminId } = useContext(AdminContext);

  const [users, setUsers] = useState([
    {
      firstName: "",
      lastName: "",
      goals: [
        { mainGoal: "", progress: 0, subTasks: [{ task: "", done: false }] },
      ],
    },
  ]);
  //empty users array set when we start

  const [gaols, setGoals] = useState([""]);
  const [subTasks, setsubTasks] = useState([""]);

  const [startDate, setStartDate] = useState(new Date()); // empty startDate set when we start initially
  const [endDate, setEndDate] = useState(new Date()); // empty endDate set when we start initially

  const onSubmit = (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    const cycle = {
      startDate: startDate,
      endDate: endDate,
      users: users,
    };

    //axios.post
    axios.post(`${apiUrl}/admins/${adminId}`, cycle, {
      headers: {
        "x-auth-token": token,
      },
    });

    navigate("/overview");

    //window.location = '/'
  };

  const handleAddMore = (index, event) => {
    let data = [...users];
    data[index][event.target.name] = event.target.value;

    setUsers(data); //[{firstName:"fn", lastName:"ln"},{firstName:}]}
  };

  const handleAddGoal = (index, goalIndex, event) => {
    let goalsOfUser = [...users[index].goals];
    goalsOfUser[goalIndex][event.target.name] = event.target.value;

    const tempUsers = [...users];
    tempUsers[index].goals = goalsOfUser;
    setUsers(tempUsers);
  };

  const handleAddSubTask = (index, goalIndex, subTaskIndex, event) => {
    // let goalsOfUser=[...users[index].goals]
    // goalsOfUser[goalIndex][event.target.name]=event.target.value

    let subTasksOfGoal = [...users[index].goals[goalIndex].subTasks];
    subTasksOfGoal[subTaskIndex].task = event.target.value;

    const tempUsers = [...users];
    tempUsers[index].goals[goalIndex].subTasks = subTasksOfGoal;
    setUsers(tempUsers);

    // const tempUsers = [...users]
    // tempUsers[index].goals = goalsOfUser;
    // setUsers(tempUsers)
  };
  const onChangeStartDate = (date) => {
    setStartDate(date);
  };
  const onChangeEndDate = (date) => {
    setEndDate(date);
  };

  const addFields = () => {
    let newfield = {
      firstName: "",
      lastName: "",
      goals: [
        { mainGoal: "", progress: 0, subTasks: [{ task: "", done: false }] },
      ],
    };

    setUsers([...users, newfield]);
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
    <Container>
      <MainLayout title="Create Cycle">
        <form className="cycleForm" onSubmit={onSubmit}>
          <div className="form-group dateFields">
            <label className="boldLabel">Select Dates</label>
            <Row>
              <Col>
                <label>Start Date: </label>
                <DatePicker selected={startDate} onChange={onChangeStartDate} />
              </Col>
              <Col>
                {" "}
                <label>End Date: </label>
                <DatePicker selected={endDate} onChange={onChangeEndDate} />
              </Col>
            </Row>
          </div>
          <div className="form-group ownerFields">
            <label className="boldLabel">Add Member</label>
            {users.map((input, index) => {
              //initially we are mappin through the empty users array and creating one field in the return section
              return (
                <div className="singleOwnerField" key={index}>
                  <Row>
                    <Col>
                      <input
                        name="firstName"
                        placeholder="First Name"
                        value={input.firstName}
                        onChange={(event) => handleAddMore(index, event)}
                      />
                    </Col>
                    <Col>
                      <input
                        name="lastName"
                        placeholder="Last Name"
                        value={input.lastName}
                        onChange={(event) => handleAddMore(index, event)}
                      />
                    </Col>

                    <Col>
                      <button
                        className="btn btn-danger minusMember"
                        onClick={() => removeFields(index)}
                      >
                        - Member
                      </button>
                    </Col>
                  </Row>

                  {input.goals.map((goal, i) => {
                    return (
                      <div className="goals-wrapper" key={i}>
                        <label className="boldLabel">Add Goal</label>
                        <Row>
                          <Col>
                            <input
                              name="mainGoal"
                              placeholder="Main Goal Name"
                              value={goal.mainGoal}
                              onChange={(event) =>
                                handleAddGoal(index, i, event)
                              }
                            />
                          </Col>
                          <div className="subtasks-outerwrapper">
                            <label className="boldLabel">Add SubTasks</label>
                            {goal.subTasks.map((sb, j) => {
                              return (
                                <div className="subtask-innerwrapper" key={j}>
                                  <Row>
                                    <Col className="subtask-div">
                                      <input
                                        name="subTask"
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
                          </div>
                        </Row>
                        <Button
                          className="subtask-btn"
                          onClick={() => addSubTask(index, i)}
                        >
                          {" "}
                          + subtask{" "}
                        </Button>
                      </div>
                    );
                  })}
                  <Button onClick={() => addGoal(index)}> + goal </Button>
                </div>
              );
            })}
            <div className="plusMember">
              <button
                onClick={addFields}
                type="button"
                className="btn btn-dark plusMember"
              >
                {" "}
                + Member
              </button>
            </div>
          </div>

          <div className="form-group btnSection">
            <input
              type="submit"
              value="Create Cycle"
              className="btn  btn-dark createCycle"
            />
          </div>
        </form>
      </MainLayout>
    </Container>
  );
};

export default CreateCycle;