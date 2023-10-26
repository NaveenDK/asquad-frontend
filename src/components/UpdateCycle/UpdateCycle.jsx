import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { AdminContext } from "../AdminContext";
import MainLayout from "../MainLayout";
import { MemberItem } from "./MemberItem/MemberItem";

const apiUrl = process.env.REACT_APP_API_URL;

const UpdateCycle = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isDesktop, setIsDesktop] = useState(false);

  // const [cycle, setCycle] = useState([]);
  //empty users array set when we start

  const { adminId } = useContext(AdminContext);
  const { cycleId } = useParams();

  const [startDate, setStartDate] = useState(); // empty startDate set when we start initially
  const [endDate, setEndDate] = useState(); // empty endDate set when we start initially

  useEffect(() => {
    console.log("UpdateCycle");
    const token = localStorage.getItem("token");
    axios
      .get(`${apiUrl}/admins/${adminId}/cycles/${cycleId}`, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((response) => {
        // setCycle(response.data);
        //console.log ("cycles set to : " +  cycle)
        setUsers(response.data.users);
        setStartDate(new Date(response.data.startDate));
        setEndDate(new Date(response.data.endDate));
      })
      .catch(function (error) {
        console.log(error);
      });

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768); // Adjust the breakpoint value as needed
    };

    // Add event listener on component mount
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [cycleId, adminId]);
  const onSubmit = (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    const cycle = {
      startDate: startDate,
      endDate: endDate,
      users: users,
    };

    //axios.post
    axios.put(`${apiUrl}/admins/${adminId}/cycles/${cycleId}`, cycle, {
      headers: {
        "x-auth-token": token,
      },
    });
    console.log("adminId" + adminId);
    //window.location = '/'
    navigate("/overview");
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

  console.log(users);

  return (
    <>
      <Helmet>
        <title> Update Cycle </title>
        <meta name="description" content="Asquad - accountability made easy" />
      </Helmet>
      <Container>
        <MainLayout title="Update Cycle">
          <form className="cycleForm" onSubmit={onSubmit}>
            <div className="form-group dateFields">
              <label className="boldLabel">Select Dates</label>
              <Row>
                <Col
                  xs={12}
                  md={6}
                  className={`${
                    isDesktop ? "justify-content-end" : "mobile-date"
                  }`}
                >
                  <p>Start date</p>
                  <DatePicker
                    selected={startDate}
                    onChange={onChangeStartDate}
                    className="rounded-3 custom-datepicker-left"
                    placeholderText={"Start date"}
                  />
                </Col>
                <Col
                  xs={12}
                  md={6}
                  className={`${
                    isDesktop ? "justify-content-start" : "mobile-date"
                  }`}
                >
                  <p>End date</p>
                  <DatePicker
                    selected={endDate}
                    onChange={onChangeEndDate}
                    className="rounded-3 custom-datepicker-right"
                    placeholderText={"End date"}
                  />
                </Col>
              </Row>
            </div>
            <div className="form-group ownerFields">
              {users.map((input, index) => {
                //initially we are mappin through the empty users array and creating one field in the return section
                return (
                  <MemberItem
                    input={input}
                    index={index}
                    users={users}
                    isDesktop={isDesktop}
                    setUsers={setUsers}
                  />
                );
              })}
              <div className="plusMember">
                <button
                  onClick={addFields}
                  type="button"
                  className="btn btn-dark plusMember"
                >
                  Add Member
                </button>
              </div>
            </div>

            <div className="form-group btnSection">
              <input
                type="submit"
                value="Update"
                className="btn  btn-dark createCycle"
              />
            </div>
          </form>
        </MainLayout>
      </Container>
    </>
  );
};

export default UpdateCycle;
