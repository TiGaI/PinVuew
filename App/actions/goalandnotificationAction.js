export function getMyGoals(userID) {
    return dispatch => {
        dispatch(fetching());

        fetch('http://localhost:8080/getMyGoals', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                user: userID
              })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                mygoalarray = [...responseJson]
                dispatch(setGoalState(mygoalarray))
                dispatch(doneFetching())
            })
            .catch((err) => {
              console.log('error in getMyGoals -> ', err)
            });
    };
}

export function createGoal(goalObject, mygoalarray) {
    return dispatch => {
        dispatch(fetching());
        console.log(goalObject, ' is the goalObject in goalandnotificationAction')
        fetch('http://localhost:8080/createGoal', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                user: goalObject.userID,
                activityCategory: goalObject.activityCategory,
                activityGoal: goalObject.activityGoal,
                goalTimeFrame: goalObject.goalTimeFrame
              })
            })
            .then((response) => response.json())
            .then((goalObject) => {
                mygoalarray = [...[goalObject], ...mygoalarray]
                dispatch(setGoalState(mygoalarray))
                dispatch(doneFetching())
            })
            .catch((err) => {
              console.log('error in createGoal -> ', err)
            });
    };
}

export function editGoal(goalID, goalObject, mygoalarray) {
    return dispatch => {
        dispatch(fetching());
        console.log(goalID, ' in editGoalAction');
        console.log(goalObject, ' in editGoalAction')
        fetch('http://localhost:8080/editGoal', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                goalID: goalID,
                goalObject: goalObject
              })
            })
            .then((response) => response.json())
            .then((responseJson) => {

                mygoalarray = mygoalarray.map(function(x){
                  if(x._id === goalID){
                    x.user= goalObject.userID;
                    x.activityCategory= goalObject.activityCategory;
                    x.activityGoal= goalObject.activityGoal;
                    x.goalTimeFrame= goalObject.goalTimeFrame;
                  }
                  return x;
                })

                console.log('final edit object: ', mygoalarray)

                dispatch(setGoalState(mygoalarray))
                dispatch(doneFetching())
            })
            .catch((err) => {
              console.log('error in editGoal -> ', err)
            });
    };
}

export function deleteGoal(goalID, mygoalarray) {
    return dispatch => {
        dispatch(fetching());

        fetch('http://localhost:8080/deleteGoal', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                goalID: goalID
              })
            })
            .then((response) => response.json())
            .then((responseJson) => {

                mygoalarray =  mygoalarray.filter(function(x){
                  return x._id !== goalID
                })

                dispatch(setGoalState(mygoalarray))
                dispatch(doneFetching())
            })
            .catch((err) => {
              console.log('error in deleteGoal -> ', err)
            });
    };
}

function setGoalState(myGoals) {
  return {
    type: "SET_GOAL_STATE",
    myGoals: myGoals,
  }
}

function setNotificationState(notifications) {
  return {
    type: "SET_GOAL_STATE",
    notifications: notifications
  }
}

function fetching(){
  return {
    type: "FETCHING_DATA"
  }
}

function doneFetching() {
  return {
    type: "DONE_FETCHING"
  }
}
