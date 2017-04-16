import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk'
import {
  AsyncStorage
} from 'react-native'

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

const facebookParams = 'id,name,email,picture.width(100).height(100), gender, age_range, about';

export function getGraphData(userID, myActivity) {
  console.log('GET INSIDE ACTION GET GRAPH DATA', userID, myActivity)
    return dispatch => {
        dispatch(attempt());

          fetch('http://localhost:8080/getSortandGroupActivity', {
              method: 'POST',
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                userID: userID,
                myActivity: myActivity
              })
            })
            .then((response) => response.json())
            .then((responseJson) => {

                var userObject = Object.assign({}, responseJson);
                console.log('GET INSIDE ACTION IN RESPONSE GET GRAPH DATA',userObject )
                dispatch(addUser(userObject));
            })
            .catch((err) => {
              console.log('error: ', err)
            });

        }
      // ).catch((err) => {
      //       dispatch(errors(err));
      // });
    };


function getInfo() {
    return new Promise((resolve, reject) => {

      const profileInfoCallback = (error, profileInfo) => {
        if (error) reject(error);
        resolve(profileInfo);
      };

      const profileInfoRequest =
        new GraphRequest(
          '/me',
          {
            parameters: {
              fields: {
                string: facebookParams,
              },
            },
          },
          profileInfoCallback
        );

      new GraphRequestManager().addRequest(profileInfoRequest).start();

    });
}

export function googleLogin(){

  return dispatch => {
      dispatch(attempt());

      GoogleSignin.signIn().then((user) => {

            console.log('this is user in google login: ', user)

            var mongooseId = '';
            fetch('http://localhost:8080/googleAuth', {
                method: 'POST',
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  result: user
                })
              })
              .then((response) => response.json())
              .then((responseJson) => {

                  mongooseId = responseJson._id
                  var userObject = Object.assign({}, responseJson);

                  console.log("user information from facebook: ", userObject)

                  dispatch(loggedin());
                  dispatch(addUser(userObject));
              })
              .catch((err) => {
                console.log('error: ', err)
              });


        })
        .catch((err) => {
          console.log('WRONG SIGNIN', err);
        })
        .done();
      };

}


function facebookLogin() {
  return new Promise((resolve, reject) => {
    LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends', 'user_about_me'])
    .then(function(result) {
        if (result.isCancelled) {
          alert('Login cancelled');
        } else {
              getInfo().then((userDetails) => {
                resolve(userDetails);
              }).catch((requestError) => {
                reject(requestError);
              });
        }
      },
      function(error) {

        alert('Login fail with error: ' + error);
        reject(error);
      }
    );
  });
}

export function login() {
    return dispatch => {
        dispatch(attempt());

        facebookLogin().then((result) => {
          var mongooseId = '';
          fetch('http://localhost:8080/facebookAuth', {
              method: 'POST',
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                result: result
              })
            })
            .then((response) => response.json())
            .then((responseJson) => {

                mongooseId = responseJson._id
                var userObject = Object.assign({}, responseJson);
                userObject["picture.width"] = result.picture.data.width;
                userObject["picture.height"] = result.picture.data.height;

                console.log("user information from facebook: ", userObject)

                dispatch(loggedin());
                dispatch(addUser(userObject));
            })
            .catch((err) => {
              console.log('error: ', err)
            });

        }).catch((err) => {
            dispatch(errors(err));
      });
    };
}

export function editProfile(userID, userObject) {
    return dispatch => {
        dispatch(attempt());

          fetch('http://localhost:8080/editUser', {
              method: 'POST',
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                userID: userID,
                userObject: userObject
              })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                var userObject = Object.assign({}, responseJson);
                dispatch(addUser(userObject));
            })
            .catch((err) => {
              console.log('error: ', err)
            });

    };
}

export function skip() {
    return dispatch => {
        dispatch(attempt());
        dispatch(skipLogin());
    };
}

function facebookLogout() {
    return new Promise((resolve) => {
        LoginManager.logOut();
        return resolve();
    });
}

export function logout() {
    return dispatch => {
        dispatch(attempt());
        facebookLogout().then(() => {
           dispatch(loggedout());
        });
    };
}

export function googlelogout() {
    return dispatch => {
        dispatch(attempt());
        GoogleSignin.signOut()
        .then(() => {
           dispatch(loggedout());
        });
    };
}

export function attempt() {
    return {
        type: 'LOADING'
    };
}

export function errors(err) {
    return {
        type: 'ERROR',
        err
    };
}

export function loggedin() {
    return {
        type: 'LOGIN',
    };
}

export function skipLogin() {
    return {
        type: 'SKIP',
    };
}

export function loggedout() {
    return {
        type: 'LOGOUT'
    };
}

export function addUser(userObject) {
    return {
        type: 'ADD_USER',
        userObject
    };
}
