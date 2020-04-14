import { RECEIVE_SEARCHED_PRODUCTS_ACTION  } from '../../actions/product_actions';

export default (state = { }, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SEARCHED_PRODUCTS_ACTION:
      return action.products
    default:
      return state;
  }
}