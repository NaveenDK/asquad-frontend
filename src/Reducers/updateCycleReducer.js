export const updateCycleActions = {
  setUsers: "SET_USERS",
  changeMemberName: "CHANGE_MEMBER_NAME",
  changeMemberLastname: "CHANGE_MEMBER_LAST_NAME",
  createNewUser: "CREATE_NEW_USER_FIELD",
  deleteUser: "DELETE_USER_FIELD",
  createNewGoal: "CREATE_NEW_GOAL_FIELD",
  changeGoalName: "CHANGE_GOAL_NAME",
  createNewSubtask: "CREATE_NEW_SUBTASK_FIELD",
  changeSubtaskName: "CHANGE_SUBTASK_NAME",
};

const updateCycleReducer = (state, action) => {
  //SET USERS
  if (action.type === updateCycleActions.setUsers) {
    const users = action.payload.users;
    return users;
  }

  //CHANGE FIRSTNAME
  if (action.type === updateCycleActions.changeMemberName) {
    const id = action.payload.id;
    const firstName = action.payload.firstName;

    const newState = state.map((user) => {
      if (user._id === id) {
        user.firstName = firstName;
      }

      return user;
    });

    return newState;
  }

  //CHANGE LASTNAME
  if (action.type === updateCycleActions.changeMemberLastname) {
    const id = action.payload.id;
    const lastName = action.payload.lastName;

    const newState = state.map((user) => {
      if (user._id === id) {
        user.lastName = lastName;
      }

      return user;
    });

    return newState;
  }

  //CREATE NEW USER
  if (action.type === updateCycleActions.createNewUser) {
    let newfield = {
      firstName: "",
      lastName: "",
      goals: [
        { mainGoal: "", progress: 0, subTasks: [{ task: "", done: false }] },
      ],
    };

    return [...state, newfield];
  }

  //DELETE NEW USER
  if (action.type === updateCycleActions.deleteUser) {
    const userIndex = action.payload.index;
    const newState = [...state].filter((ele, index) => userIndex !== index);

    return newState;
  }

  //CREATE NEW GOAL
  if (action.type === updateCycleActions.createNewGoal) {
    const userId = action.payload.id;
    const newGoal = {
      mainGoal: "",
      progress: 0,
      subTasks: [{ task: "", done: false }],
    };

    const newState = [...state];

    newState.forEach((user) => {
      if (user._id === userId) {
        user.goals.push(newGoal);
      }
    });

    return newState;
  }

  //CHANGE GOAL NAME
  if (action.type === updateCycleActions.changeGoalName) {
    const userId = action.payload.userId;
    const goalId = action.payload.goalId;
    const goalTitle = action.payload.goalTitle;

    const newState = [...state];

    newState.map((user) => {
      if (user._id === userId) {
        user.goals.map((goal) => {
          if (goal._id === goalId) {
            goal.mainGoal = goalTitle;
          }

          return goal;
        });
      }

      return user;
    });

    return newState;
  }

  //CREATE NEW SUBTASK
  if (action.type === updateCycleActions.createNewSubtask) {
    const userId = action.payload.id;
    const goalId = action.payload.goalId;
    const newSubTask = { task: "", done: false };

    const newState = [...state];

    newState.map((user) => {
      if (user._id === userId) {
        user.goals.map((goal) => {
          if (goal._id === goalId) {
            goal.subTasks.push(newSubTask);
          }

          return goal;
        });
      }

      return user;
    });

    return newState;
  }

  //CHANGE SUBTASK NAME
  if (action.type === updateCycleActions.changeSubtaskName) {
    const userId = action.payload.userId;
    const goalId = action.payload.goalId;
    const subTaskId = action.payload.subtaskId;
    const subTaskTitle = action.payload.subTaskTitle;

    const newState = [...state];

    newState.map((user) => {
      if (user._id === userId) {
        user.goals.map((goal) => {
          if (goal._id === goalId) {
            goal.subTasks.map((subtask) => {
              if (subtask._id === subTaskId) {
                subtask.task = subTaskTitle;
              }

              return subtask;
            });
          }

          return goal;
        });
      }

      return user;
    });

    return newState;
  }
};

export default updateCycleReducer;
