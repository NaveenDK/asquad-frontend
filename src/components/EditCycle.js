import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";

import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import UserTabs from "./UserTabs";
import MainLayout from "./MainLayout";
import ListGroup from "react-bootstrap/ListGroup";
import ProgressBar from "react-bootstrap/ProgressBar";
import Form from "react-bootstrap/Form";
import { AdminContext } from "./AdminContext";
import { useParams, useNavigate } from "react-router-dom";

const EditCycle = () => {
  const [cycle, setCycle] = useState([]);
  const [users, setUsers] = useState([]);
  const [isChecked, setIsChecked] = useState(true);
  const { adminId } = useContext(AdminContext);
  const { cycleId } = useParams();

  const options = { year: "numeric", month: "long", day: "numeric" };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:5000/admins/${adminId}/cycles/${cycleId}`, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((response) => {
        setCycle(response.data);
        //console.log ("cycles set to : " +  cycle)
        setUsers(response.data.users);
        // setStartDate(new Date(response.data.startDate));
        // setEndDate(new Date(response.data.endDate));
      })
      .catch(function (error) {
        {
        }
        console.log(error);
      });
  }, [adminId, cycleId]);

  // const userList = ()=>{
  //   if(cycle.users){
  //     console.log("cycle list " +JSON.stringify(cycle))
  //     return cycle.users.map(currentUser=>{
  //      return <UserRow  goals={currentUser.goals}firstName={currentUser.firstName} key={currentUser._id} id={currentUser._id}/>})
  //   }
  // }

  const updateProgress = () => {};

  // const saveUserProgress = (userIndex,goalIndex,subTaskIndex)=>{
  //   //let tempUsers=[...users]
  //    console.log (" users[userIndex]._id "+ users[userIndex]._id )
  //    console.log ("goals[goalIndex]._id : "+users[userIndex].goals[goalIndex]._id )
  //    console.log ("users[userIndex].goals[goalIndex].subTasks[subTaskIndex]._id : "+users[userIndex].goals[goalIndex].subTasks[subTaskIndex]._id )
  //   console.log("cycle.users[userIndex].goals " + JSON.stringify(cycle.users[userIndex].goals[goalIndex].subTasks[subTaskIndex].done))

  //   const tempCycle ={
  //     startDate:cycle.startDate,
  //     endDate:cycle.endDate,
  //    users:cycle.users
  //   }

  // axios.post('http://localhost:5000/cycles/update/' + id_cycle  ,tempCycle)
  // .then(res => console.log(res.data));

  // }

  const handleCheckChange = (subTaskIndex, goalIndex, userIndex) => {
    //  console.log("cycle prints: " + JSON.stringify(cycle.users))
    const token = localStorage.getItem("token");

    let tempUsers = [...users];
    console.log("print tempUsers: " + JSON.stringify(tempUsers));
    console.log(
      "whats in: tempUsers[userIndex].goals[goalIndex].subTasks[subTaskIndex]" +
        JSON.stringify(
          tempUsers[userIndex].goals[goalIndex].subTasks[subTaskIndex]
        )
    );
    let totalSubTasksOfGoal =
      tempUsers[userIndex].goals[goalIndex].subTasks.length;

    if (
      tempUsers[userIndex].goals[goalIndex].subTasks[subTaskIndex].done == false
    ) {
      tempUsers[userIndex].goals[goalIndex].subTasks[subTaskIndex].done = true;
    } else {
      tempUsers[userIndex].goals[goalIndex].subTasks[subTaskIndex].done =
        !tempUsers[userIndex].goals[goalIndex].subTasks[subTaskIndex].done;
    }
    let subtasksCompleted = tempUsers[userIndex].goals[
      goalIndex
    ].subTasks.filter((props) => props.done).length;
    // subtasksCompleted =   tempUsers[userIndex].goals[goalIndex].subTasks.filter(props=>props.done).length

    //subtasksCompleted =   tempUsers[userIndex].goals[goalIndex].subTasks.filter(props=>props.done).length
    // console.log(false)

    console.log(
      "we changed the subtask with the name: " +
        tempUsers[userIndex].goals[goalIndex].subTasks[subTaskIndex].task
    );
    console.log(
      "tempUsers[userIndex].goals[goalIndex].subTasks[subTaskIndex].done?" +
        tempUsers[userIndex].goals[goalIndex].subTasks[subTaskIndex].done
    );
    console.log("totalSubTasksOfGoal " + totalSubTasksOfGoal);

    console.log("subtasksCompleted: " + subtasksCompleted);

    let calculatedProgress = (
      (subtasksCompleted / totalSubTasksOfGoal) *
      100
    ).toFixed(2);

    tempUsers[userIndex].goals[goalIndex].progress = calculatedProgress;
    console.log(
      " tempUsers[userIndex].goals[goalIndex].progress: " +
        tempUsers[userIndex].goals[goalIndex].progress
    );

    setUsers(tempUsers);
    const tempCycle = {
      startDate: cycle.startDate,
      endDate: cycle.endDate,
      users: cycle.users,
    };
    //axios.post
    axios
      .put(`http://localhost:5000/admins/${adminId}/cycles/${cycleId}`, cycle, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => console.log("WOW " + res.data));
    // if (isChecked==true){
    //   setIsChecked(false)
    // }
    // if(isChecked==false){
    //   setIsChecked(true)
    // }
    // console.log("I was changed to: "+ isChecked)
    // console.log("My K is : "+ k)

    // console.log("wht is e: "+ JSON.stringify(e.type))
  };

  return (
    <Container>
      <MainLayout
        title="Cycle Period "
        start_date={`${new Date(cycle.startDate).toLocaleDateString(
          "us-EN",
          options
        )}`}
        end_date={` - ${new Date(cycle.endDate).toLocaleDateString(
          "us-EN",
          options
        )}`}
      >
        <Accordion>
          {cycle.users &&
            cycle.users.map((user, i) => {
              return (
                <div key={i}>
                  <Accordion.Item eventKey={i}>
                    <Accordion.Header>{user.firstName}</Accordion.Header>
                    <Accordion.Body>
                      {user.goals &&
                        user.goals.map((goal, j) => {
                          return (
                            <div className="goal-wrapper" key={j}>
                              <Row>
                                <Col>
                                  <p className="main-goal title">
                                    {" "}
                                    {goal.mainGoal}
                                  </p>
                                </Col>
                                <Col>
                                  <ProgressBar
                                    variant="success"
                                    now={goal.progress}
                                    label={`${goal.progress}%`}
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <ListGroup>
                                    {goal.subTasks &&
                                      goal.subTasks.map((subTask, k) => {
                                        return (
                                          // <ListGroup.Item key={k}> {subTask} </ListGroup.Item>
                                          <Form key={k}>
                                            <div key={subTask} className="mb-3">
                                              <Form.Check
                                                as="input"
                                                type="checkbox"
                                                id={subTask.task}
                                                defaultChecked={subTask.done}
                                                value={subTask.done}
                                                label={subTask.task}
                                                onChange={() =>
                                                  handleCheckChange(k, j, i)
                                                }
                                              />
                                            </div>
                                            {/* <Button onClick= {()=>saveUserProgress(i,j,k)}className="blackBigBtn">Save Review</Button> */}
                                            {/* <input type="submit" value="Save Reviewd" className="btn  btn-dark createCycle"/>   */}
                                          </Form>
                                        );
                                      })}
                                  </ListGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col></Col>
                              </Row>
                            </div>
                          );
                        })}
                    </Accordion.Body>
                  </Accordion.Item>
                </div>
              );
            })}
        </Accordion>
      </MainLayout>
    </Container>
  );
};

export default EditCycle;
