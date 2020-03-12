import { createStore, applyMiddleware } from "redux";
import rootReducer from '../reducers/root_reducer'
import thunk from "redux-thunk";
import logger from 'redux-logger';

const configureStore = (preloadedState = {}) => (
  createStore(
    rootReducer,
    preloadedState,  // Preloaded state is the initial state
    applyMiddleware(thunk, logger))
);

export default configureStore;