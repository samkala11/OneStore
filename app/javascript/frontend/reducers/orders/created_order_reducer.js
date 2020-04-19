import {  
  RECEIVE_CREATED_ORDER_ACTION, 
  RECEIVE_UPDATED_ORDER_ACTION, 
  RECEIVE_CURRENT_ORDER_ACTION,
  RECEIVE_DELETED_ORDER_ACTION,
  CLEAR_CURRENT_ORDER_ACTION } from '../../actions/order_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CREATED_ORDER_ACTION:
      return action.data
    case RECEIVE_UPDATED_ORDER_ACTION:
      return action.data
    case RECEIVE_CURRENT_ORDER_ACTION:
      return action.data
    case RECEIVE_DELETED_ORDER_ACTION:
      return {}
    case CLEAR_CURRENT_ORDER_ACTION:
      return {}
    default:
      return state;
  }
}