import { combineReducers } from 'redux';

import currentOrder from './orders/created_order_reducer';
import currentOrderLine from './orders/created_line_reducer';

export default combineReducers({
    currentOrder,
    lastOrderLine: currentOrderLine
});
