import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as OrderPureFunctions from '../../util/order_pure_fucntions';
import classNames from 'classnames';
import * as LineActions from '../../actions/order_line_actions';
import * as OrderActions from '../../actions/order_actions';
// import { getKey } from "../../../../../config/keymail";
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class OrderShowPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            lineQuantities: {

            },
            originalLineQuantities : {

            },
            displayUpdateButtons: {

            }
        }
        this.update = this.update.bind(this);
        this.stateIncludesLine = this.stateIncludesLine.bind(this);
        this.QuantityChanged = this.QuantityChanged.bind(this);
        this.handleUpdateLine = this.handleUpdateLine.bind(this);
        this.updateOrderTotal = this.updateOrderTotal.bind(this);
        this.updateStateOriginalLines = this.updateStateOriginalLines.bind(this);
    }

    componentDidMount(){
        const { currentOrderLines }  = this.props;
        let linesArray = OrderPureFunctions.objectValuesArray(currentOrderLines);

        let lineQuantities = Object.assign({}, this.state.lineQuantities) ;

        linesArray.forEach(line => {
            lineQuantities[line.id]  = line.quantity
        });
        this.setState({ lineQuantities: lineQuantities });
        this.setState({ originalLineQuantities: lineQuantities });
    }

    update(field) {
        let lineQuantities = Object.assign({}, this.state.lineQuantities);

        return e => {
            lineQuantities[field]  = e.currentTarget.value
            // debugger;
            this.setState({ lineQuantities: lineQuantities})
            // this.QuantityChanged(field);
            setTimeout(() => { this.QuantityChanged(field) })
        }
    }

    sendEmail() {
        const message = {
            to: 'kalashsam17@ovnotify.com',
            from: 'samkoki77@gmail.com',
            subject: 'Sending with Twilio SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        };
        sgMail.send(message);
    };

    QuantityChanged(lineId) {
        const { originalLineQuantities, lineQuantities } = this.state;
        let displayUpdateButtons = Object.assign({}, this.state.displayUpdateButtons)
        // debugger;
        if  (originalLineQuantities[lineId] != lineQuantities[lineId]) {
            displayUpdateButtons[lineId] = true;
            this.setState({ displayUpdateButtons: displayUpdateButtons })
            console.log('quantity changed and updated in state');
        } else {
            displayUpdateButtons[lineId] = false;
            this.setState({ displayUpdateButtons: displayUpdateButtons })
            console.log('quantity returned back to original and updated in state'); 
        }
    }

    stateIncludesLine(lineId) {
        const { lineQuantities } = this.state;
        let linesArray = Object.values(lineQuantities);
        for (let index = 0; index < linesArray.length; index++) {
            if (linesArray[index].id == lineId) return true;           
        }
        return false;
    }

    updateStateOriginalLines() {
        const { lineQuantities, originalLineQuantities } = this.state;
        let updatedQuantities = Object.assign( {}, lineQuantities);
        this.setState({ originalLineQuantities: updatedQuantities});
    }
    

    handleUpdateLine(productId, orderId, newProductQuantity, productPrice, oldLineQuantity, lineId) {
        const { currentOrder, getOrderLinesByOrder, updateOrderLine } = this.props;
        let newQuantity = parseInt(newProductQuantity);
        let newLineTotal = ( parseInt(newProductQuantity) * productPrice) ;
        let oldOrderTotal = currentOrder.order_total;
        let quantityDifference = newProductQuantity - oldLineQuantity;
        // debugger;
        const orderLineInfo = {
            product_id: productId,
            order_id: orderId,
            quantity: newQuantity,
            line_total: newLineTotal,
        };
        // debugger;
        updateOrderLine(orderLineInfo)
        .then(() => getOrderLinesByOrder(currentOrder.id))
        .then(() => {
            this.updateOrderTotal(oldOrderTotal, orderId, productPrice, quantityDifference)
        })
        .then(() => { this.updateStateOriginalLines() })
        .then(() => this.QuantityChanged(lineId))
        .then(() => {
            console.log('Sending Email!!');
            this.sendEmail();
        })
    }

    updateOrderTotal(oldOrderTotal, orderId, productPrice, ProductQuantity) {
        const { updateOrder } = this.props;
        // let newOrderTotal = order.data.order_total + productPrice;
        let newOrderTotal = oldOrderTotal + (productPrice * ProductQuantity);
  
        const updatedOrderInfo = {
            order_total: newOrderTotal,
            pending_total: newOrderTotal,
            id: orderId
        }
        updateOrder(updatedOrderInfo)
        .then((updatedOrder) => console.log(`Order total updated successfully from this.updateOrderTotal`, updatedOrder.data.order_total ));
    }

   render() {
      window.orderShowProps = this.props;
      window.orderShowstate = this.state;

      const { currentOrderLines, currentOrder } = this.props;
      const { lineQuantities, originalLineQuantities } = this.state;
      const currentLinesArray = Object.values(currentOrderLines);
      let key = 0;
      return(
         <div className="order-show-container">
                    <div className="order-header"> 
                        Order Summary {currentOrder.order_total}
                    </div>
                { 
                    currentLinesArray.map(line => (
                        <div className="order-line-show"
                            key = {key++}
                            >
                            <img className="product-image" 
                              src="https://onestorebucket.s3.eu-west-3.amazonaws.com/tomato.jpg"
                            />
                            <div className="line-details"> 
                                <span className="product-name"> 
                                    {line.productName}
                                </span>
                                <span className="product-price"> 
                                    {line.productPrice}/<span className="product-unit"> {line.unit} </span>
                                </span>
                            </div>
                            <div> 
                                <input
                                    // className="quantity-input"
                                    className={classNames({ 'quantity-input': true })}
                                    type="text"
                                    value = { lineQuantities[`${line.id}`] }
                                    onChange = {this.update(line.id)}
                                />  
                                {/* <span> 
                                    Line total: {line.line_total}
                                </span> */}
                                <button
                                    className={classNames({ hidden: !this.state.displayUpdateButtons[line.id] }) }
                                    onClick={() => this.handleUpdateLine(line.product_id, line.order_id, lineQuantities[line.id], line.productPrice, line.quantity, line.id )}
                                > Save </button>
                             </div>
                            
                        </div>
                    ))
                }
         </div>
      )
   }
}



const mapStateToProps = state => ({
   currentOrderLines: state.orders.currentOrderLines,
   currentOrder: state.orders.currentOrder,

 });
 
 const mapDispatchToProps = dispatch => ({
    getOrderLinesByOrder: (orderId) => dispatch(LineActions.getOrderLinesByOrderReduxAjax(orderId)),
    updateOrderLine: (orderLineInfo) => dispatch(LineActions.updateOrderLineReduxAjax(orderLineInfo)),
    updateOrder: (orderInfo) => dispatch(OrderActions.updateOrderReduxAjax(orderInfo)),
});
 
 
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderShowPage));




