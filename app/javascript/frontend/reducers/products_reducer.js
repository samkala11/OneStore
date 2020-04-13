import { combineReducers } from 'redux';

import ProductsByDeptReducer from './products/products_by_dept_reducer';
import AllProductsReducer from './products/all_products_reducer';
import SearchedProductsReducer from './products/searched_products';

export default combineReducers({
    productsByDept: ProductsByDeptReducer,
    allProducts: AllProductsReducer,
    searchedProducts: SearchedProductsReducer
});
