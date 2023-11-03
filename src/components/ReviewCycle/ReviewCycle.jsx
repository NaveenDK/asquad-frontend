import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

//Styles
import { Container, Accordion, Spinner } from "react-bootstrap";

//Components
import MainLayout from "../MainLayout";
import CycleUsers from "./CycleUsers";

//Custom hook
import { useAdminContext } from "../../hooks/useAdminContext";

//Services
import { putCycle, returnCycleById } from "../../services/cycleServices";

const ReviewCycle = () => {
  const [cycle, setCycle] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);
  const { adminId } = useAdminContext();
  const { cycleId } = useParams();

  const options = { year: "numeric", month: "long", day: "numeric" };

  const returnCycle = useCallback(async () => {
    setLoading(true);

    const response = await returnCycleById(adminId, cycleId);

    setCycle(response);
    setUsers(response.users);
    setLoading(false);
  }, [adminId, cycleId]);

  const putCycleData = useCallback(
    async (cycle) => {
      await putCycle(adminId, cycleId, cycle);
    },
    [adminId, cycleId]
  );

  useEffect(() => {
    returnCycle();
  }, [returnCycle]);

  const handleCheckChange = async (subTaskIndex, goalIndex, userIndex) => {
    const tempUsers = [...users];

    //Subtask
    const subtaskList = tempUsers[userIndex].goals[goalIndex].subTasks;
    const subtask = subtaskList[subTaskIndex];

    if (subtask.done === false) {
      subtask.done = true;
    } else {
      subtask.done = !subtask.done;
    }

    //Calculate progress
    const subtasksCompleted = subtaskList.filter((props) => props.done).length;
    const totalSubTasksOfGoal = subtaskList.length;
    const calculatedProgress = (
      (subtasksCompleted / totalSubTasksOfGoal) *
      100
    ).toFixed(0);

    tempUsers[userIndex].goals[goalIndex].progress = calculatedProgress;

    setUsers(tempUsers);

    await putCycleData(cycle);
  };

  return (
    <>
      <Helmet>
        <title>Review Cycle</title>
        <meta name="description" content="Asquad - accountability made easy" />
      </Helmet>
      <Container>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <Spinner animation="border" />
          </div>
        ) : (
          <>
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
                  cycle.users.map((user, userIndex) => {
                    return (
                      <CycleUsers
                        user={user}
                        userIndex={userIndex}
                        handleCheckChange={handleCheckChange}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                      />
                    );
                  })}
              </Accordion>
            </MainLayout>
          </>
        )}
      </Container>
    </>
  );
};

export default ReviewCycle;
