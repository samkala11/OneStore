import { combineReducers } from 'redux';

import currentOrder from './orders/created_order_reducer';
import lastOrderLine from './orders/last_line_reducer';
import currentOrderLines from './orders/order_lines_by_order';

export default combineReducers({
    currentOrder,
    lastOrderLine,
    currentOrderLines
});
