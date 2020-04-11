import { HIDE_INITIAL_HOME_LOADER_ACTION } from '../actions/show_loader_home_actions';

const initialState = true;

export default (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case HIDE_INITIAL_HOME_LOADER_ACTION:
      return action.showHomeLoaderFlag
    default:
      return state;
  }
}