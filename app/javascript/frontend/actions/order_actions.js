import { createOrder, updateOrder, getCurrentOrder, deleteOrder } from '../util/order_api_util';

export const RECEIVE_CREATED_ORDER_ACTION = 'RECEIVE_CREATED_ORDER_ACTION';
export const RECEIVE_UPDATED_ORDER_ACTION = 'RECEIVE_UPDATED_ORDER_ACTION';
export const RECEIVE_CURRENT_ORDER_ACTION = 'RECEIVE_CURRENT_ORDER_ACTION';
export const RECEIVE_DELETED_ORDER_ACTION = 'RECEIVE_DELETED_ORDER_ACTION';


// Redux Thunk Create order  
export const createOrderReduxAjax = (order) => dispatch => createOrder(order)
.then((order) => {
  console.log( 'new order created',order );
  return dispatch(receiveCreatedOrder(order));
});

// Private receive created order
const receiveCreatedOrder = (data) => ({
    type: RECEIVE_CREATED_ORDER_ACTION,
    data
});


// Redux Thunk update order  
export const updateOrderReduxAjax = (order) => dispatch => updateOrder(order)
.then((order) => {
  console.log( 'new order updated', order );
  return dispatch(receiveupdatedOrder(order));
});

// Private receive updated order
const receiveupdatedOrder = (data) => ({
  type: RECEIVE_UPDATED_ORDER_ACTION,
  data
});


// Redux Thunk get current order  
export const getCurrentOrderReduxAjax = (order) => dispatch => getCurrentOrder(order)
.then((order) => {
  console.log( 'current pending order received', order );
  return dispatch(receiveCurrentOrder(order));
});

// Private receive current order
const receiveCurrentOrder = (data) => ({
  type: RECEIVE_CURRENT_ORDER_ACTION,
  data
});


// Redux Thunk delete orderline 
export const deleteOrderReduxAjax = (id) => dispatch => deleteOrder(id)
.then((order) => {
  console.log( `order with id ${id} deleted successfully`);
  return dispatch(receiveDeletedOrder(order));
});

// Private receive orderlines by department
const receiveDeletedOrder = (data) => ({
    type: RECEIVE_DELETED_ORDER_ACTION,
    data
})
  
  