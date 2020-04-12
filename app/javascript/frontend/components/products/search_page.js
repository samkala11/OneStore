import React from 'react';
import NavBar from '../navbar/navbar';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as ProductActions from '../../actions/product_actions'
import * as InitialHomeLoaderActions from '../../actions/show_loader_home_actions';
import * as OrderActions from '../../actions/order_actions';
import * as LineActions from '../../actions/order_line_actions';

class SearchPage extends React.Component {
   
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        const { currentOrder, getCurrentOrder, getOrderLinesByOrder } = this.props;

        let storageCurrentOrderId = localStorage.getItem('currentOrderId');
        if ( !currentOrder.id && storageCurrentOrderId ) {
            let orderInfo = {
                id: storageCurrentOrderId
            };
            getCurrentOrder(orderInfo)
            .then(() => getOrderLinesByOrder(storageCurrentOrderId))
        } 

    }

   render() {
      window.searchState = this.state;
      return(
        <div className="-page">
            <NavBar
               title = 'Beirut Market'
               isHomeNavBar = { true }
            />
            <div className="search-bar">
               <input 
                  placeholder="search"
                  type="text"/>
            </div>
        </div>
      )
   }
}



const mapStateToProps = state => ({
    currentOrder: state.orders.currentOrder,
    products: state.products,
    shouldShowHomeLoader: state.showHomeLoader
 });
 
 const mapDispatchToProps = dispatch => ({
   getAllProducts: () => dispatch(ProductActions.getAllProductsThunk()),
   createProduct: (productInfo) => dispatch(ProductActions.createProductThunk(productInfo)),
   hideInitialHomeLoader: () => dispatch(InitialHomeLoaderActions.hideInitialHomeLoader()),
   getCurrentOrder: (orderInfo) => dispatch(OrderActions.getCurrentOrderReduxAjax(orderInfo)),
   getOrderLinesByOrder: (orderId) => dispatch(LineActions.getOrderLinesByOrderReduxAjax(orderId))
});
 
 
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);




