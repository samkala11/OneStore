import { combineReducers } from 'redux';

import currentOrder from './orders/created_order_reducer';

export default combineReducers({
    currentOrder
});
