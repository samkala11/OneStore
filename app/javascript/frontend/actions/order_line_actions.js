import { createOrderLine, updateOrderLine, getOrderLinesByOrder } from '../util/order_line_api_util';

export const RECEIVE_CREATED_ORDER_LINE_ACTION = 'RECEIVE_CREATED_ORDER_LINE_ACTION';
export const RECEIVE_UPDATED_ORDER_LINE_ACTION = 'RECEIVE_UPDATED_ORDER_LINE_ACTION';
export const RECEIVE_ORDER_LINES_BY_ORDER_ACTION = 'RECEIVE_ORDER_LINES_BY_ORDER_ACTION';

// Redux Thunk Create order  
export const createOrderLineReduxAjax = (orderLineInfo) => dispatch => createOrderLine(orderLineInfo)
.then((orderLine) => {
  console.log( 'new order line created', orderLine );
  return dispatch(receiveCreatedOrderLine(orderLine));
});

// Private receive created orderline
const receiveCreatedOrderLine = (data) => ({
    type: RECEIVE_CREATED_ORDER_LINE_ACTION,
    data
})


// Redux Thunk Update order  
export const updateOrderLineReduxAjax = (orderLineInfo) => dispatch => updateOrderLine(orderLineInfo)
.then((orderLine) => {
  console.log( 'order line updated', orderLine );
  return dispatch(receiveUpdatedOrderLine(orderLine));
});

// Private receive updated orderline
const receiveUpdatedOrderLine = (data) => ({
    type: RECEIVE_UPDATED_ORDER_LINE_ACTION,
    data
})


// Redux Thunk get orderlines by order  
export const getOrderLinesByOrderReduxAjax = (orderId) => dispatch => getOrderLinesByOrder(orderId)
.then((orderLines) => {
  console.log( 'orderlines by order received, about to dispatch receive orderlines');
  return dispatch(receiveOrderLinesByOrder(orderLines));
});

// Private receive orderlines by department
const receiveOrderLinesByOrder = (data) => ({
    type: RECEIVE_ORDER_LINES_BY_ORDER_ACTION,
    data
})
  