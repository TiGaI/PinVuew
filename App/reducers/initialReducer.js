export function populatedActivities(state = {
  nav: "ActivitiesPage",
  fetchingData: false,
  populatedActivities: [],
  selectedActivity: [],
  selectedActivityOwner: [],
  notifications: [],
  allUserActivities: [],
  goalsObject: {},
  categories: ['Baseball','Basketball', 'Beach Volleyball' ,'Hiking', 'Running', 'Soccer','Tennis']
}, action) {
    switch (action.type) {
    case 'POPULATED_ACTIVITIES':
        return Object.assign({}, state, {
            populatedActivities: action.populatedActivities,
            category: action.category
        });
    case "FETCHING_DATA":
        return Object.assign({}, state, {
          fetchingData: true
        })
    case "DONE_FETCHING":
          return Object.assign({}, state, {
              fetchingData: false
          })
    case "GET_NOTIFICATIONS":
          return Object.assign({}, state, {
              notifications: action.notifications
          });
    case "SELECT_POINT":
      return Object.assign({}, state, {
        selectedActivity: action.selectedActivity,
        selectedActivityOwner: action.selectedActivityOwner
      })
    case "SELECT_CATEGORY":
        return Object.assign({}, state, {
          category: action.category
        })
    case 'GET_USER_ACTIVITIES':
        return Object.assign([], state, {
          allUserActivities: action.activities
        })
    case 'GET_GOALS_OBJECT':
        return Object.assign({}, state, {
          goalsObject: action.goalsObject
        })


    default:
        return state;
    }
}
