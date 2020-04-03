import { createOrderLine, updateOrderLine } from '../util/order_line_api_util';

export const RECEIVE_CREATED_ORDER_LINE_ACTION = 'RECEIVE_CREATED_ORDER_LINE_ACTION';


// Redux Thunk Create order  
export const createOrderLineReduxAjax = (orderLineInfo) => dispatch => createOrderLine(orderLineInfo)
.then((orderLine) => {
  console.log( 'new order line created', orderLine );
  return dispatch(receiveCreatedOrderLine(orderLine));
});

// Private receive created order
const receiveCreatedOrderLine = (data) => ({
    type: RECEIVE_CREATED_ORDER_LINE_ACTION,
    data
  })
  