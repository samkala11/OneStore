import React from 'react';
import {connect} from 'react-redux';
import { getProductsByDeptThunk } from '../../actions/product_actions';
import NavBar from '../navbar/navbar';
import * as OrderActions from '../../actions/order_actions';
import * as LineActions from '../../actions/order_line_actions';

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
         }
      }
      this.handleCreateOrder = this.handleCreateOrder.bind(this);
      this.handleUpdateOrder = this.handleUpdateOrder.bind(this);
      this.updateOrderTotal = this.updateOrderTotal.bind(this);
   }
   
   componentDidMount(){
      const { getProductsByDept, getCurrentOrder, getOrderLinesByOrder } = this.props;
      getProductsByDept(10) //config constant
      .then(() => this.setState({products: Object.values(this.props.productsByDept)}));

      let currentOrderId = localStorage.getItem('currentOrderId');
      if (currentOrderId) {
         let orderInfo = {
            id: currentOrderId
         };
         getCurrentOrder(orderInfo)
         .then(() => getOrderLinesByOrder(currentOrderId))
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
      const { currentOrderLines, updateOrderLine, getOrderLinesByOrder, currentOrder } = this.props;
      let matchingLine = this.getMatchingLine(currentOrderLines, productId);
      if (matchingLine) {
         let newQuantity =  matchingLine.quantity - 0.5;
         let newLineTotal = matchingLine.line_total - (0.5 * productPrice);
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

   render() {
      const products = this.state.products;
      window.fruitsState = this.state;
      const { currentOrderLines, currentOrder } = this.props;
      let key = 0;

      String.prototype.capitalize = function() {
         return this.charAt(0).toUpperCase() + this.slice(1);
      };

      return(<div className="product-show">
               <NavBar 
                  // title = 'Fruits'
                  title = 'Beirut Market'
                  isHomeNavBar = { true }
               />
               <div className="product-list-wrapper">
                  {products.map(product => (
                     <div className="product-item-wrapper" key={key++}>
                        <img className="product-image" 
                              src="https://onestorebucket.s3.eu-west-3.amazonaws.com/tomato.jpg"
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
                        className="add-button">
                           { (currentOrderLines && this.getMatchingLine(currentOrderLines, product.id) && this.getMatchingLine(currentOrderLines, product.id).quantity > 0) 
                              ?
                              <span> 
                              
                              <span className="quantity-display"> 
                                 { this.getMatchingLine(currentOrderLines, product.id).quantity }
                              </span>
                                 <span 
                                 className = "plus-sign"
                                 > + </span>
                              </span>
                              :
                             <span> Add to order </span>}
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
   createOrderLine: (orderLineInfo) => dispatch(LineActions.createOrderLineReduxAjax(orderLineInfo)),
   updateOrderLine: (orderLineInfo) => dispatch(LineActions.updateOrderLineReduxAjax(orderLineInfo)),
   getOrderLinesByOrder: (orderId) => dispatch(LineActions.getOrderLinesByOrderReduxAjax(orderId))
});
 
 
export default connect(mapStateToProps, mapDispatchToProps)(ProductListDept);




