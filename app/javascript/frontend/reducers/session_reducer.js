import { SIGNUP_NEW_USER_ACTION, LOGIN_CURRENT_USER_ACTION, LOGOUT_CURRENT_USER_ACTION  } from '../actions/session_actions';

const _nullSession = {
  currentUser: null
}

export default (state = _nullSession, action) => {
  Object.freeze(state);
  switch (action.type) {
    case SIGNUP_NEW_USER_ACTION:
      data = action.payload;
      return Object.assign({}, { currentUser: data.user
        // {
        //   id: data.user.id,
        //   email: data.user.email,
        //   name: data.user.username
        // } 
      });
    case LOGIN_CURRENT_USER_ACTION:
      data = action.payload;
      return Object.assign({}, { currentUser: data.user
    });
    case LOGOUT_CURRENT_USER_ACTION:
      return _nullSession;
    default:
      return state;
  }
}
