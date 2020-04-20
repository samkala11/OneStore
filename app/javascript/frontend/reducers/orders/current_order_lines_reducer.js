import {  
  RECEIVE_ORDER_LINES_BY_ORDER_ACTION,
  CLEAR_CURRENT_ORDER_LINES_ACTION
} from '../../actions/order_line_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ORDER_LINES_BY_ORDER_ACTION:
      return action.data
    case CLEAR_CURRENT_ORDER_LINES_ACTION:
      return { }
    default:
      return state;
  }
}