import React from 'react';
import {connect} from 'react-redux';
import { getProductsByDeptThunk } from '../../actions/product_actions'
import * as OrderActions from '../../actions/order_actions';
import * as LineActions from '../../actions/order_line_actions';

class Fruits extends React.Component {
   
   constructor(props){
      super(props);
      this.state = {
         products: []
      }
      this.handleCreateOrder = this.handleCreateOrder.bind(this)
   }

   componentDidMount(){
      const { getProductsByDept } = this.props;
      getProductsByDept(10) //config constant
      .then(() => this.setState({products: Object.values(this.props.productsByDept)}));

   }

   handleCreateOrder(productId, productUnit, productPrice) {
      const { createOrder, createOrderLine } = this.props;
      // let order = { 
      //       order_total: '2000' 
      // }
      // debugger;
      createOrder()
      .then((order) => {
         // debugger;
         let orderLineInfo = {
            product_id: productId,
            order_id: order.data.id,
            quantity: 1,
            line_total: 1000,
            unit: productUnit
         }
         console.log('order created successfully from handle create', order);
         createOrderLine(orderLineInfo)
         .then((line) => console.log(line, 'newly line created'))
      })

   }

   render() {
      const products = this.state.products;
      window.fruitsState = this.state;
      let key = 0;

      String.prototype.capitalize = function() {
         return this.charAt(0).toUpperCase() + this.slice(1)
      }

      return(<div className="product-show">
               <div className="header"> Fruits  </div>
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
                        </div>

                        <button 
                        onClick = { () => this.handleCreateOrder(product.id, product.unit)}
                        className="add-button">
                           Add to list
                        </button>
                     </div>
                  ))}
                 
                  {/* <div  className="product-item-wrapper">
                     <img className="product-image" 
                           src="https://media.istockphoto.com/photos/tomato-isolated-on-white-background-picture-id466175630?k=6&m=466175630&s=612x612&w=0&h=fu_mQBjGJZIliOWwCR0Vf2myRvKWyQDsymxEIi8tZ38="
                     />
                     <div className="product-details">
                        <span className="product-title">
                           Tomato
                           300/kilo
                        </span>
                     </div>

                     <button className="add-button">
                        Add to list
                     </button>
                  </div> */}                
               </div>
            </div>
      )
   }
}



const mapStateToProps = state => ({
   productsByDept: state.products.productsByDept,
   currentOrder: state.orders.currentOrder
 });
 
 const mapDispatchToProps = dispatch => ({
   getProductsByDept: (no) => dispatch(getProductsByDeptThunk(no)),
   createOrder: () => dispatch(OrderActions.createOrderReduxAjax()),
   createOrderLine: (orderLineInfo) => dispatch(LineActions.createOrderLineReduxAjax(orderLineInfo))
});
 
 
export default connect(mapStateToProps, mapDispatchToProps)(Fruits);




