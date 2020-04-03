import {  RECEIVE_CREATED_ORDER_LINE_ACTION } from '../../actions/order_line_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CREATED_ORDER_LINE_ACTION:
      return action.data
    default:
      return state;
  }
}