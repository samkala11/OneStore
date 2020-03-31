import { login, logout, signup } from '../util/session_api_util';

export const SIGNUP_NEW_USER_ACTION = 'SIGNUP_NEW_USER_ACTION';
export const LOGIN_CURRENT_USER_ACTION = 'LOGIN_CURRENT_USER_ACTION';
export const LOGOUT_CURRENT_USER_ACTION = 'LOGOUT_CURRENT_USER_ACTION';
export const RECEIVE_ERRORS_ACTION = 'RECEIVE_ERRORS_ACTION';
export const CLEAR_ERRORS_ACTION = 'CLEAR_ERRORS_ACTION';

/* Signup */
export const signupNewUser = (user) => ({
    type: SIGNUP_NEW_USER_ACTION,
    payload : {
        user
    }
});

export const signupAjax = (user) => (dispatch) => (
    signup(user)
    .then(user => dispatch(signupNewUser(user)), errors => dispatch(receiveErrors(errors)))
);

/* Login */
export const loginCurrentUser = (user) => ({
    type: LOGIN_CURRENT_USER_ACTION,
    payload : {
        user
    }
});

export const loginAjax = (user) => (dispatch) => (login(user)
  .then(user => dispatch(loginCurrentUser(user)), errors => dispatch(receiveErrors(errors)))
);

/* Logout */
export const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER_ACTION
});

export const logoutAjax = () => (dispatch) => (logout()
  .then(() => dispatch(logoutCurrentUser()))
);

// Errors  
export const receiveErrors = (errors) => ({
    type: RECEIVE_ERRORS_ACTION,
    payload: {
        errors
    }
});

export const clearErrors = () => ({
    type: CLEAR_ERRORS_ACTION
});