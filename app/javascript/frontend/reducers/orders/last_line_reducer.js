import {  RECEIVE_CREATED_ORDER_LINE_ACTION, 
  RECEIVE_UPDATED_ORDER_LINE_ACTION,
  CLEAR_CURRENT_ORDER_LINES_ACTION } from '../../actions/order_line_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CREATED_ORDER_LINE_ACTION:
      return action.data
    case RECEIVE_UPDATED_ORDER_LINE_ACTION:
      return action.data
    case CLEAR_CURRENT_ORDER_LINES_ACTION:
      return {}
    default:
      return state;
  }
}