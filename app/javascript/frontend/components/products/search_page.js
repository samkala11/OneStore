import React from 'react';
import NavBar from '../navbar/navbar';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import classNames from 'classnames';
import * as ProductActions from '../../actions/product_actions'
import * as InitialHomeLoaderActions from '../../actions/show_loader_home_actions';
import * as OrderActions from '../../actions/order_actions';
import * as LineActions from '../../actions/order_line_actions';

class SearchPage extends React.Component {
   
    constructor(props){
        super(props);
        this.state = {
            productName : '',
            showSearchBar: false,
            order: {
                order_total: 1500,
            },
            showNoResults: false,
            firstSearchDone: false
        }
        this.update = this.update.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.handleSearchProducts = this.handleSearchProducts.bind(this);
    }

    componentDidMount() {
        window.scroll(0,0);
        const { currentOrder, getCurrentOrder, getOrderLinesByOrder } = this.props;

        let storageCurrentOrderId = localStorage.getItem('currentOrderId');
        if ( !currentOrder.id && storageCurrentOrderId ) {
            let orderInfo = {
                id: storageCurrentOrderId
            };
            getCurrentOrder(orderInfo)
            .then(() => getOrderLinesByOrder(storageCurrentOrderId))
        }
        
        this.timer = setTimeout(() => this.setState({ showSearchBar: true }), 50);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    update(field) {
        return e => {
            // debugger;
            this.setState({ [field]:  e.currentTarget.value})
            // setTimeout(() => { this.QuantityChanged(field) })
        }
    }

    getMatchingLine(orderLines, productId) {
        let orderLinesArray = Object.values(orderLines);
        for (let index = 0; index < orderLinesArray.length; index++) {
           let orderLine = orderLinesArray[index];
           if (orderLine.product_id === productId) return orderLine;
        }
        return false;
     };
  
    updateOrderTotal(oldOrderTotal, orderId, productPrice, ProductQuantity) {
        const { updateOrder } = this.props;
        let newOrderTotal = oldOrderTotal + (productPrice * ProductQuantity);
        const updatedOrderInfo = {
            order_total: newOrderTotal,
            pending_total: newOrderTotal,
            id: orderId
        }
        updateOrder(updatedOrderInfo)
        .then((updatedOrder) => console.log(`Order total updated successfully to`, updatedOrder.data.order_total ));
    }

    handleCreateOrder(productId, productUnit, productPrice) {
        const { createOrder, createOrderLine, getOrderLinesByOrder} = this.props;

        createOrder(this.state.order)
        .then((order) => {
            localStorage.setItem('currentOrderId', JSON.stringify(order.data.id));
            const orderLineInfo = {
                product_id: productId,
                order_id: order.data.id,
                quantity: 1,
                line_total: productPrice,
                unit: productUnit
            };
            console.log('order created successfully from handle create', order);
            createOrderLine(orderLineInfo)
            .then((line) => {
                console.log('newly line created', line);
                getOrderLinesByOrder(line.data.order_id);
            })
            .then(() => {
                this.updateOrderTotal(order.data.order_total, order.data.id, productPrice, 1)
            })
        })
    }


    handleUpdateOrder(productId, productUnit, orderId, newProductQuantity, productPrice, oldOrderTotal) {

        const { currentOrderLines, createOrderLine, currentOrder, 
            getOrderLinesByOrder, updateOrderLine } = this.props;

        let matchingLine = this.getMatchingLine(currentOrderLines, productId);
        if (matchingLine) {
            let newQuantity = newProductQuantity + matchingLine.quantity;
            let newLineTotal = (newProductQuantity * productPrice) + matchingLine.line_total;
            // let lineId = matchingLine.id;
            const orderLineInfo = {
                product_id: productId,
                order_id: orderId,
                quantity: newQuantity,
                line_total: newLineTotal
            };
            updateOrderLine(orderLineInfo)
            .then(() => getOrderLinesByOrder(currentOrder.id))
            .then(() => {
                this.updateOrderTotal(oldOrderTotal, orderId, productPrice, newProductQuantity)
            })

        } else {
            const orderLineInfo = {
                product_id: productId,
                order_id: orderId,
                quantity: 1,
                line_total: productPrice,
                unit: productUnit
            };
            createOrderLine(orderLineInfo)
            .then(() => getOrderLinesByOrder(currentOrder.id))
            .then(() => console.log('order updated and orderLine added to order successfully'))
            .then(() => {
                this.updateOrderTotal(oldOrderTotal, orderId, productPrice, 1)
            });
        }
    }

    handleAddToOrder(productId, productUnit, productPrice, newProductQuantity, oldOrderTotal) {
        const { currentOrder } = this.props;
        if (currentOrder && currentOrder.id) {
            this.handleUpdateOrder(productId, productUnit,  currentOrder.id, newProductQuantity, productPrice, oldOrderTotal);
        } else {
            this.handleCreateOrder(productId, productUnit, productPrice);
        }
    }
    
    decreaseLineQuantity(productId, productPrice) {
        const { currentOrderLines, updateOrderLine, getOrderLinesByOrder, 
            currentOrder, deleteOrder, deleteOrderLine } = this.props;
            let matchingLine = this.getMatchingLine(currentOrderLines, productId);
            if (matchingLine) {
                let newQuantity =  matchingLine.quantity - 0.5;
                let newLineTotal = matchingLine.line_total - (0.5 * productPrice);
                
                if ( newQuantity === 0 ) {
                    deleteOrderLine(matchingLine.id)
                    .then(() => getOrderLinesByOrder( matchingLine.order_id ))
                    .then((orderLines) => {
                       console.log('orderLines after deleting one', orderLines.data)
                       if (Object.values(orderLines.data).length === 0) {
                          deleteOrder(currentOrder.id)
                          .then(() => {
                             localStorage.removeItem('currentOrderId');
                             console.log('order removed from localStorage')
                          })
                          // .then(order => console.log('order deleted', order))
                       } else {
                          this.updateOrderTotal(currentOrder.order_total, currentOrder.id, productPrice, -0.5)
                       }
                    })
                } else {
                    const orderLineInfo = {
                        product_id: productId,
                        order_id: matchingLine.order_id,
                        quantity: newQuantity,
                        line_total: newLineTotal,
                    };
                    updateOrderLine(orderLineInfo)
                    .then(() => getOrderLinesByOrder( matchingLine.order_id ))
                    .then(() => {
                        this.updateOrderTotal(currentOrder.order_total, currentOrder.id, productPrice, -0.5)
                })

            }
                
        }
    }
    
    handleEnter(event) {
        const { productName } = this.state;
        if (event.keyCode === 13) {
            console.log(`enter and search ${productName}`);
            this.handleSearchProducts();
            // if (this.state.productName.length > 0) {
            //     searchProducts(productName)
            //     .then( () => this.setState({firstSearchDone: true}) )                   
            // }
        }
    }


    handleSearchProducts() {
        const { productName } = this.state;
        const { searchProducts } = this.props;
         if (productName.length > 0) {
            searchProducts(productName)
            .then( () => this.setState({firstSearchDone: true}) )                   
        } else {
            this.props.history.push('/');
        }
    }


   render() {
       const { searchProducts, productSearchResults, currentOrderLines, currentOrder } = this.props;
       const productsArray = Object.values(productSearchResults);
       const {  showSearchBar } = this.state;
       let key = 0;

       String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
        };

      window.searchState = this.state;
      window.searchProps = this.props;
      return(
        <div className="search-page">
            <NavBar
               title = 'Beirut Market'
               isHomeNavBar = { true }
            />
            <div
                className={classNames({ 'search-bar': true, 'show-search-bar': showSearchBar })} 
            >
               <input 
                  placeholder="Search"
                  type="text"
                  onChange = {this.update('productName')}
                  onBlur =  { this.handleSearchProducts }
                  onKeyDown = { (event) => this.handleEnter(event) }
                  />
            </div>

        { (productsArray.length === 0 && this.state.firstSearchDone) ? 
            
            <div className="no-results-message">  No results found </div>
            :
            <div className="product-list-search-wrapper">
               {productsArray.map(product => (
                  <div className="product-item-wrapper" key={key++}>
                     <img className="product-image" 
                           src={`https://onestorebucket.s3.eu-west-3.amazonaws.com/${product.name}.jpg`}
                     />
                     <div className="product-details">
                        <span className="product-title">
                           {product.name.capitalize()}
                        </span>
                        <span className="product-price">
                           {product.price + '/' + product.unit}
                        </span>
                     </div>

                     { (currentOrderLines && this.getMatchingLine(currentOrderLines, product.id) && this.getMatchingLine(currentOrderLines, product.id).quantity > 0) && <button
                        className="decrease-quantity-button"
                        onClick = {() => this.decreaseLineQuantity(product.id, product.price)}
                     > - </button> }

                     <button 
                        onClick = { () => this.handleAddToOrder(product.id, product.unit, product.price, 0.5, currentOrder.order_total)}
                        className="add-button"
                     >
                        { (currentOrderLines && this.getMatchingLine(currentOrderLines, product.id) && this.getMatchingLine(currentOrderLines, product.id).quantity > 0) 
                           ?
                           <span> 
                              <span className= "quantity-display"> 
                                 { this.getMatchingLine(currentOrderLines, product.id).quantity }
                              </span>
                              <span className= "plus-sign"> 
                                 + 
                              </span>
                           </span>
                           :
                           <span> Add to order </span> }
                     </button>
                  </div>
               ))}              
            </div> 
        }
            {/* <button
                onClick={() => searchProducts(this.state.productName)}
            > Start </button> */}
        </div>
    )
   }
}



const mapStateToProps = state => ({
    currentOrder: state.orders.currentOrder,
    currentOrderLines: state.orders.currentOrderLines,
    productSearchResults: state.products.searchedProducts,
    shouldShowHomeLoader: state.showHomeLoader
 });
 
 const mapDispatchToProps = dispatch => ({
   getAllProducts: () => dispatch(ProductActions.getAllProductsThunk()),
   createProduct: (productInfo) => dispatch(ProductActions.createProductThunk(productInfo)),
   searchProducts: (productInfo) => dispatch(ProductActions.searchProductsAjaxRedux(productInfo)),
   hideInitialHomeLoader: () => dispatch(InitialHomeLoaderActions.hideInitialHomeLoader()),
   getCurrentOrder: (orderInfo) => dispatch(OrderActions.getCurrentOrderReduxAjax(orderInfo)),
   createOrder: (orderInfo) => dispatch(OrderActions.createOrderReduxAjax(orderInfo)),
   updateOrder: (orderInfo) => dispatch(OrderActions.updateOrderReduxAjax(orderInfo)),
   deleteOrder: (orderId) => dispatch(OrderActions.deleteOrderReduxAjax(orderId)),
   createOrderLine: (orderLineInfo) => dispatch(LineActions.createOrderLineReduxAjax(orderLineInfo)),
   updateOrderLine: (orderLineInfo) => dispatch(LineActions.updateOrderLineReduxAjax(orderLineInfo)),
   deleteOrderLine: (orderLineId) => dispatch(LineActions.deleteOrderLineReduxAjax(orderLineId)),
   getOrderLinesByOrder: (orderId) => dispatch(LineActions.getOrderLinesByOrderReduxAjax(orderId))
});
 
 
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);




