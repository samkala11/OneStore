import { GET_ALL_PRODUCTS_ACTION  } from '../../actions/product_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case GET_ALL_PRODUCTS_ACTION:
      return action.products
    default:
      return state;
  }
}