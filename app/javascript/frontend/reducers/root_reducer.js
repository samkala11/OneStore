import { combineReducers } from 'redux';

import ProductsReducer from './products_reducer';
import OrdersReducer from './orders_reducer';
import session from './session_reducer';
import showHomeLoader from './show_loader_home_reducer';

export default combineReducers({
//   entities: entitiesReducer,
//   session: sessionReducer,
//   errors: errorsReducer,
//   currentlyPlaying: CurrentlyPlayingReducer
products: ProductsReducer,
orders: OrdersReducer,
showHomeLoader,
session
});
