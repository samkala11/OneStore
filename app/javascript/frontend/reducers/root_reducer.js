import { combineReducers } from 'redux';

import ProductsReducer from './products_reducer';
import session from './session_reducer';

export default combineReducers({
//   entities: entitiesReducer,
//   session: sessionReducer,
//   errors: errorsReducer,
//   currentlyPlaying: CurrentlyPlayingReducer
products: ProductsReducer,
session
});
