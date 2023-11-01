import { useContext, useEffect, useReducer, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

//Context
import { AdminContext } from "../../context/AdminContext";

//Styles
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

//Components
import MainLayout from "../MainLayout";
import MemberItem from "./MemberItem";

//Services
import { createCycle } from "../../services/cycleServices";

//Reducer
import createCycleReducer, {
  createCycleActions,
} from "../../Reducers/createCycleReducer";

const initState = [
  {
    firstName: "",
    lastName: "",
    goals: [
      { mainGoal: "", progress: 0, subTasks: [{ task: "", done: false }] },
    ],
  },
];

const CreateCycleNew = () => {
  const [state, dispatch] = useReducer(createCycleReducer, initState);

  const { adminId } = useContext(AdminContext);

  const [isDesktop, setIsDesktop] = useState(false);
  const [startDate, setStartDate] = useState(""); // empty startDate set when we start initially
  const [endDate, setEndDate] = useState(""); // empty endDate set when we start initially

  const navigate = useNavigate();

  const createCycleInfo = async (data) => {
    await createCycle(adminId, data);
    navigate(`/overview`);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768); // Adjust the breakpoint value as needed
    };

    // Add event listener on component mount
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    //Validate no empty tasks
    await dispatch({ type: createCycleActions.submitChanges });

    const cycle = {
      startDate: startDate,
      endDate: endDate,
      users: state,
    };

    //Create cycle info
    createCycleInfo(cycle);
  };

  const onChangeStartDate = (date) => {
    setStartDate(date);
  };
  const onChangeEndDate = (date) => {
    setEndDate(date);
  };

  const createNewUserField = () => {
    dispatch({ type: createCycleActions.createNewUser });
  };

  return (
    <>
      <Helmet>
        <title> Update Cycle </title>
        <meta name="description" content="Asquad - accountability made easy" />
      </Helmet>
      <Container>
        <MainLayout title="Create Cycle">
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
              {state.map((user, index) => {
                //initially we are mappin through the empty users array and creating one field in the return section
                return (
                  <MemberItem
                    dispatch={dispatch}
                    input={user}
                    userIndex={index}
                    isDesktop={isDesktop}
                  />
                );
              })}
              <div className="plusMember">
                <button
                  onClick={createNewUserField}
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
                value="Create"
                className="btn  btn-dark createCycle"
              />
            </div>
          </form>
        </MainLayout>
      </Container>
    </>
  );
};

export default CreateCycleNew;
