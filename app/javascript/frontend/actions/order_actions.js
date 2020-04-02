import { createOrder, updateOrder } from '../util/order_api_util';

export const RECEIVE_CREATED_ORDER_ACTION = 'RECEIVE_CREATED_ORDER_ACTION';


// Redux Thunk Create order  
export const createOrderReduxAjax = (orderInfo) => dispatch => createOrder(orderInfo)
.then((order) => {
  console.log( order );
  return dispatch(receiveCreatedOrder(order));
});

// Private receive created order
const receiveCreatedOrder = (data) => ({
    type: RECEIVE_CREATED_ORDER_ACTION,
    data
  })
  