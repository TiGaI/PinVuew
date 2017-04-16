export function settingGoal(state = {
  fetchingData: false,
  myGoals: [],
  notifications: []
}, action) {
    switch (action.type) {
    case "FETCHING_DATA":
        return Object.assign({}, state, {
          fetchingData: true
        });
    case "DONE_FETCHING":
          return Object.assign({}, state, {
              fetchingData: false
          });
    case "SET_GOAL_STATE":
          return Object.assign({}, state, {
              myGoals: action.myGoals
          });
    case "GET_NOTIFICATIONS":
          return Object.assign({}, state, {
              notifications: action.notifications
          });

    default:
        return state;
    }
}
