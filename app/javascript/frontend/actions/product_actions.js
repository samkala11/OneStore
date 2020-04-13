import { getAllProducts, getProductsByDept, createProduct, searchProducts } from '../util/product_api_util';

export const GET_ALL_PRODUCTS_ACTION = 'GET_ALL_PRODUCTS_ACTION';
export const GET_PRODUCTS_BY_DEPT_ACTION  = 'GET_PRODUCTS_BY_DEPT_ACTION';
export const RECEIVE_CREATED_PRODUCT_ACTION  = 'RECEIVE_CREATED_PRODUCT_ACTION';
export const RECEIVE_SEARCHED_PRODUCTS_ACTION  = 'RECEIVE_SEARCHED_PRODUCTS_ACTION';


// Redux Thunk Action Get searched Products
export const searchProductsAjaxRedux = (productName) => dispatch => searchProducts(productName)
.then((products) => dispatch(receiveSearchedProducts(products)));

// Searched Products
const receiveSearchedProducts = (products) => ({
  type: RECEIVE_SEARCHED_PRODUCTS_ACTION,
  products
});


// Redux Thunk Action Get Products By Dept
export const getProductsByDeptThunk = (no) => dispatch => getProductsByDept(no)
.then((products) => dispatch(receiveProductsByDept(products)));

// Products by department
const receiveProductsByDept = (products) => ({
  type: GET_PRODUCTS_BY_DEPT_ACTION,
  products
});


// Redux Thunk Create Product  
export const createProductThunk = (product) => dispatch => createProduct(product)
.then((product) => {
  
  console.log( product )
  return dispatch(receiveCreatedProduct(product))

});

// Private receive created product
const receiveCreatedProduct = (data) => ({
  type: RECEIVE_CREATED_PRODUCT_ACTION,
  data
})



// Redux Thunk Action Get All Products
export const getAllProductsThunk = () => dispatch => getAllProducts()
.then((products) => dispatch(receiveAllProducts(products)));

// All Products - rarely used
const receiveAllProducts = (products) => ({
  type: GET_ALL_PRODUCTS_ACTION,
  products
})