import { GET_PRODUCTS_BY_DEPT_ACTION  } from '../../actions/product_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case GET_PRODUCTS_BY_DEPT_ACTION:
      return action.products
    default:
      return state;
  }
}