import { combineReducers } from 'redux';

import currentOrder from './orders/created_order_reducer';
import lastOrderLine from './orders/last_line_reducer';
import currentOrderLines from './orders/current_order_lines_reducer';
import confirmedOrder from './orders/confirmed_order_reducer';
import confirmedOrderLines from './orders/confirmed_order_lines_reducer';

export default combineReducers({
    currentOrder,
    lastOrderLine,
    currentOrderLines,
    confirmedOrder,
    confirmedOrderLines
});
