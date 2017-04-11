export function loginReducer(state =
  {loading: false, loggedIn: false, error: null, skip: false}, action) {
    switch (action.type) {
    case 'LOADING':
        return Object.assign({}, state, {
            loading: true
        });

    case 'LOGIN':
        return Object.assign({}, state, {
            loading: false,
            loggedIn: true,
            error: null,
        });

    case 'SKIP':
            return Object.assign({}, state, {
                loading: false,
                loggedIn: false,
                error: null,
                skip: true
        });

    case 'LOGOUT':
        return Object.assign({}, state, {
            loading: false,
            loggedIn: false,
            error: null
        });

    case 'ERROR': {
        return Object.assign({}, state, {
            loading: false,
            loggedIn: false,
            error: action.err
        });
    }

    default:
        return state;
    }
}

export function profileReducer(state =
  { userObject: null},
  action) {
    switch (action.type) {
    case 'ADD_USER':
        return Object.assign({}, state, {
            userObject: action.userObject,
        });

    default:
        return state;
    }
}
