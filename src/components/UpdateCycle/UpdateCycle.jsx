import {
  useCallback,
  useContext,
  useEffect,
  useState,
  useReducer,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
import { putCycle, returnCycleById } from "../../services/cycleServices";

//Reducer
import updateCycleReducer, {
  updateCycleActions,
} from "../../Reducers/updateCycleReducer";

const UpdateCycle = () => {
  const [state, dispatch] = useReducer(updateCycleReducer, {});

  const { adminId } = useContext(AdminContext);
  const { cycleId } = useParams();

  const [users, setUsers] = useState([]);
  const [isDesktop, setIsDesktop] = useState(false);
  const [startDate, setStartDate] = useState(); // empty startDate set when we start initially
  const [endDate, setEndDate] = useState(); // empty endDate set when we start initially

  const navigate = useNavigate();

  const fetchCycleInfo = useCallback(async () => {
    const data = await returnCycleById(adminId, cycleId);

    dispatch({
      type: updateCycleActions.setUsers,
      payload: { users: data.users },
    });

    setStartDate(new Date(data.startDate));
    setEndDate(new Date(data.endDate));
  }, [adminId, cycleId]);

  const putCycleInfo = async (data) => {
    await putCycle(adminId, cycleId, data);
    navigate(`/review/${cycleId}`);
  };

  useEffect(() => {
    //Fetch cycle info
    fetchCycleInfo();

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768); // Adjust the breakpoint value as needed
    };

    // Add event listener on component mount
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [cycleId, adminId, fetchCycleInfo]);

  const onSubmit = (e) => {
    e.preventDefault();
    const cycle = {
      startDate: startDate,
      endDate: endDate,
      users: state,
    };

    //Put cycle info
    putCycleInfo(cycle);
  };

  const onChangeStartDate = (date) => {
    setStartDate(date);
  };
  const onChangeEndDate = (date) => {
    setEndDate(date);
  };

  const createNewUserField = () => {
    dispatch({ type: updateCycleActions.createNewUser });
  };

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
              {state.length >= 0 &&
                state.map((user, index) => {
                  //initially we are mappin through the empty users array and creating one field in the return section
                  return (
                    <MemberItem
                      dispatch={dispatch}
                      input={user}
                      index={index}
                      users={state}
                      isDesktop={isDesktop}
                      setUsers={setUsers}
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
