//Styles
import { Accordion } from "react-bootstrap";

//Components
import CycleGoals from "../CycleGoals";

const CycleUsers = (
  user,
  userIndex,
  handleCheckChange,
  activeIndex,
  setActiveIndex
) => {
  return (
    <div key={userIndex}>
      <Accordion.Item
        eventKey={userIndex}
        active={activeIndex === userIndex}
        onClick={() => setActiveIndex(userIndex)}
      >
        <Accordion.Header>{user.firstName}</Accordion.Header>
        <Accordion.Body>
          {user.goals &&
            user.goals.map((goal, goalIndex) => {
              return (
                <CycleGoals
                  handleCheckChange={handleCheckChange}
                  userIndex={userIndex}
                  goal={goal}
                  goalIndex={goalIndex}
                />
              );
            })}
        </Accordion.Body>
      </Accordion.Item>
    </div>
  );
};

export default CycleUsers;
