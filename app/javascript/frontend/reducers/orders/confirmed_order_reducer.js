import {  
    RECEIVE_CONFIRMED_ORDER_ACTION,
    CLEAR_CONFIRMED_ORDER_ACTION } from '../../actions/order_actions';
  
  export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
      case RECEIVE_CONFIRMED_ORDER_ACTION:
        return action.data
      case CLEAR_CONFIRMED_ORDER_ACTION:
        return {};
      default:
        return state;
    }
  }