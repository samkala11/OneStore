import React from 'react';
import {connect} from 'react-redux';
import { getProductsByDeptThunk } from '../../actions/product_actions';
import NavBar from '../navbar/navbar';
import * as OrderActions from '../../actions/order_actions';
import * as LineActions from '../../actions/order_line_actions';
import classNames from 'classnames';


class ProductListDept extends React.Component {
   
   constructor(props){
      super(props);
      this.state = {
         products: [],
         order: {
            order_total: 1500,
         },
         orderLine : { 
            quantity: 1
         },
         addButtons : {

         },
         decreaseButtons: {

         }
      }
      this.handleCreateOrder = this.handleCreateOrder.bind(this);
      this.handleUpdateOrder = this.handleUpdateOrder.bind(this);
      this.updateOrderTotal = this.updateOrderTotal.bind(this);
      this.setInitialAddButtonState = this.setInitialAddButtonState.bind(this);
      this.handleAddClicked = this.handleAddClicked.bind(this);
      this.handleDecreaseClicked = this.handleDecreaseClicked.bind(this);
   }
   
   componentDidMount(){
      const { getProductsByDept, getCurrentOrder, getOrderLinesByOrder, departmentNumber } = this.props;
      getProductsByDept(departmentNumber) //config constant
      .then((data) => {
         console.log(`products from component did mount`, data.products);
         this.setInitialAddButtonState(data.products);
         this.setState({products: Object.values(this.props.productsByDept)});
      });

      let currentOrderId = localStorage.getItem('currentOrderId');
      if (currentOrderId) {
         let orderInfo = {
            id: currentOrderId
         };
         getCurrentOrder(orderInfo)
         .then(() => getOrderLinesByOrder(currentOrderId))
      }
   }

   setInitialAddButtonState(productsObject) {
      let productsArray = Object.values(productsObject);
      if (productsArray.length > 0) {
         let addButtonsState = {};
         for (let index = 0; index < productsArray.length; index++) {
            let productId = productsArray[index].id; 
            addButtonsState[`${productId}`] = false;       
         }
         this.setState({ addButtons: addButtonsState});
         this.setState({ decreaseButtons: addButtonsState});
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
         deleteOrder, currentOrder, deleteOrderLine } = this.props;
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

   checkLocalStorage() {
      // localStorage.setItem('currentOrderId', JSON.stringify(orderId))

      // checkLocalStorage(){
      //    if (!localStorage.getItem('allWhat') || localStorage.getItem('allWhat') === 'allAlbums'){
      //      return;
      //    } else if (localStorage.getItem('allWhat') && localStorage.getItem('allWhat') === 'allSongs'){
      //      this.toggleResults('allSongs')
      //    } else if (localStorage.getItem('allWhat') && localStorage.getItem('allWhat') === 'AllArtists'){
      //      this.toggleResults('allArtists')
      //    }
      // }
   }

   handleAddClicked(productId, productUnit, productPrice, orderTotal ) {
      console.log(`handle add button clicked called for product ${productId}`);

      let state = Object.assign({}, this.state);
      let updatedButtonsState = Object.assign({}, state.addButtons);
      let resetButtonsState = Object.assign({}, state.addButtons);

      updatedButtonsState[`${productId}`] = true;
      this.setState({ addButtons: updatedButtonsState });
      console.log(updatedButtonsState);

      resetButtonsState[`${productId}`] = false;
      this.timer = setTimeout(() => this.setState({ addButtons: resetButtonsState }), 200);
      
      this.handleAddToOrder(productId, productUnit, productPrice, 0.5, orderTotal);
   }

   handleDecreaseClicked(productId, productPrice ) {
      console.log(`handle decrease button clicked called for product ${productId}`);
      
      let state = Object.assign({}, this.state);
      let updatedButtonsState = Object.assign({}, state.decreaseButtons);
      let resetButtonsState = Object.assign({}, state.decreaseButtons);

      updatedButtonsState[`${productId}`] = true;
      this.setState({ decreaseButtons: updatedButtonsState });
      // console.log(updatedButtonsState);

      resetButtonsState[`${productId}`] = false;
      this.timer = setTimeout(() => this.setState({ decreaseButtons: resetButtonsState }), 200);
      
      this.decreaseLineQuantity(productId, productPrice);
   }

   render() {
      const products = this.state.products;
      window.fruitsState = this.state;
      const { currentOrderLines, currentOrder, departmentTitle } = this.props;
      let key = 0;

      String.prototype.capitalize = function() {
         return this.charAt(0).toUpperCase() + this.slice(1);
      };

      return(
         <div className="product-show">
            <NavBar 
               // title = 'Fruits'
               title = 'Beirut Market'
               isHomeNavBar = { true }
            />
               <div className="product-list-wrapper">

            <div className="department-title-wrapper"> 
               <h3 className="department-title"> {departmentTitle} </h3>
            </div>

               {products.map(product => (
                  <div className= {classNames({ 'product-item-wrapper': true, 'wrapper-transform': this.state.addButtons[`${product.id}`] ||  this.state.decreaseButtons[`${product.id}`] })}
                     // className="product-item-wrapper" 
                     key={key++}>

                     <img  onClick = { () => this.handleAddClicked(product.id, product.unit, product.price, currentOrder.order_total)}
                           className="product-image" 
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
                        // className="decrease-quantity-button"
                        className= {classNames({ 'decrease-quantity-button': true, 'button-clicked': this.state.decreaseButtons[`${product.id}`] })}
                        onClick = {() => this.handleDecreaseClicked(product.id, product.price)}
                     > - </button> }

                     <button 
                        onClick = { () => this.handleAddClicked(product.id, product.unit, product.price, currentOrder.order_total)}
                        className= {classNames({ 'add-button': true, 'button-clicked': this.state.addButtons[`${product.id}`] })}
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
                           <span
                              // className={classNames({ clicked: this.state.addButtons[`add-${product.id}`] })}
                           > Add to order </span> }
                     </button>
                  </div>
               ))}              
            </div>
         </div>
      )
   }
}



const mapStateToProps = state => ({
   productsByDept: state.products.productsByDept,
   currentOrder: state.orders.currentOrder,
   currentOrderLines: state.orders.currentOrderLines
 });
 
 const mapDispatchToProps = dispatch => ({
   getProductsByDept: (no) => dispatch(getProductsByDeptThunk(no)),
   getCurrentOrder: (orderInfo) => dispatch(OrderActions.getCurrentOrderReduxAjax(orderInfo)),
   createOrder: (orderInfo) => dispatch(OrderActions.createOrderReduxAjax(orderInfo)),
   updateOrder: (orderInfo) => dispatch(OrderActions.updateOrderReduxAjax(orderInfo)),
   deleteOrder: (orderId) => dispatch(OrderActions.deleteOrderReduxAjax(orderId)),
   createOrderLine: (orderLineInfo) => dispatch(LineActions.createOrderLineReduxAjax(orderLineInfo)),
   updateOrderLine: (orderLineInfo) => dispatch(LineActions.updateOrderLineReduxAjax(orderLineInfo)),
   deleteOrderLine: (orderLineId) => dispatch(LineActions.deleteOrderLineReduxAjax(orderLineId)),
   getOrderLinesByOrder: (orderId) => dispatch(LineActions.getOrderLinesByOrderReduxAjax(orderId))
});
 
 
export default connect(mapStateToProps, mapDispatchToProps)(ProductListDept);




