export const createCycleActions = {
  changeMemberName: "CHANGE_MEMBER_NAME",
  changeMemberLastname: "CHANGE_MEMBER_LAST_NAME",
  createNewUser: "CREATE_NEW_USER_FIELD",
  deleteUser: "DELETE_USER_FIELD",
  createNewGoal: "CREATE_NEW_GOAL_FIELD",
  changeGoalName: "CHANGE_GOAL_NAME",
  createNewSubtask: "CREATE_NEW_SUBTASK_FIELD",
  changeSubtaskName: "CHANGE_SUBTASK_NAME",
  deleteSubtask: "DELETE_SUBTASK",
  submitChanges: "SUBMIT_CHANGES",
};

const createCycleReducer = (state, action) => {
  //CHANGE FIRSTNAME
  if (action.type === createCycleActions.changeMemberName) {
    const id = action.payload.id;
    const firstName = action.payload.firstName;

    const newState = state.map((user, index) => {
      if (index === id) {
        user.firstName = firstName;
      }

      return user;
    });

    return newState;
  }

  //CHANGE LASTNAME
  if (action.type === createCycleActions.changeMemberLastname) {
    const id = action.payload.id;
    const lastName = action.payload.lastName;

    const newState = state.map((user, index) => {
      if (index === id) {
        user.lastName = lastName;
      }

      return user;
    });

    return newState;
  }

  //CREATE NEW USER
  if (action.type === createCycleActions.createNewUser) {
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
  if (action.type === createCycleActions.deleteUser) {
    const userId = action.payload.id;
    const newState = [...state].filter(
      (user, indexUser) => indexUser !== userId
    );

    return newState;
  }

  //CREATE NEW GOAL
  if (action.type === createCycleActions.createNewGoal) {
    const userId = action.payload.userId;
    const newGoal = {
      mainGoal: "",
      progress: 0,
      subTasks: [{ task: "", done: false }],
    };

    const newState = [...state];

    newState.forEach((user, userIndex) => {
      if (userIndex === userId) {
        user.goals.push(newGoal);
      }
    });

    return newState;
  }

  //CHANGE GOAL NAME
  if (action.type === createCycleActions.changeGoalName) {
    const userId = action.payload.userId;
    const goalId = action.payload.goalId;
    const goalTitle = action.payload.goalTitle;

    const newState = [...state];

    newState.map((user, indexUser) => {
      if (indexUser === userId) {
        user.goals.map((goal, indexGoal) => {
          if (indexGoal === goalId) {
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
  if (action.type === createCycleActions.createNewSubtask) {
    const userId = action.payload.userId;
    const goalId = action.payload.goalId;
    const newSubTask = { task: "", done: false };

    const newState = [...state];

    newState.map((user, indexUser) => {
      if (indexUser === userId) {
        user.goals.map((goal, indexGoal) => {
          if (indexGoal === goalId) {
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
  if (action.type === createCycleActions.changeSubtaskName) {
    const userId = action.payload.userId;
    const goalId = action.payload.goalId;
    const subTaskId = action.payload.subtaskId;
    const subTaskTitle = action.payload.subTaskTitle;

    const newState = [...state];

    newState.map((user, indexUser) => {
      if (indexUser === userId) {
        user.goals = user.goals.map((goal, indexGoal) => {
          if (indexGoal === goalId) {
            goal.subTasks = goal.subTasks.map((subtask, indexSubtask) => {
              if (indexSubtask === subTaskId) {
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

  //DELETE SUBTASK
  if (action.type === createCycleActions.deleteSubtask) {
    const userId = action.payload.userId;
    const goalId = action.payload.goalId;
    const subTaskId = action.payload.subtaskId;

    const newState = [...state];

    newState.map((user, indexUser) => {
      if (indexUser === userId) {
        user.goals = user.goals.map((goal, indexGoal) => {
          if (indexGoal === goalId) {
            goal.subTasks = goal.subTasks.filter(
              (subtask, indexSubtask) => indexSubtask !== subTaskId
            );
          }

          return goal;
        });
      }

      return user;
    });

    return newState;
  }

  //SUBMIT CHANGES
  if (action.type === createCycleActions.submitChanges) {
    const newState = [...state];

    newState.map((user) => {
      user.goals = user.goals.map((goal) => {
        goal.subTasks = goal.subTasks.filter(
          (subtask) => subtask.task.length > 0
        );
        return goal;
      });

      return user;
    });

    return newState;
  }
};

export default createCycleReducer;
