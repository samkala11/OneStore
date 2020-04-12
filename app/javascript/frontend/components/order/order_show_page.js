import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as OrderPureFunctions from '../../util/order_pure_fucntions';
import classNames from 'classnames';
import * as LineActions from '../../actions/order_line_actions';
import * as OrderActions from '../../actions/order_actions';
import jsonobj from "../../../../../config/keymail.json";
import {Link} from 'react-router-dom';
import NavBar from '../navbar/navbar';
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const client = require('@sendgrid/client');
// client.setApiKey('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');
client.setApiKey(jsonobj['key']);
// client.setApiKey(process.env.SENDGRID_API_KEY);
// client.setDefaultHeader('User-Agent', 'Some user agent string');
// client.setDefaultHeader("X-Requested-With", "XMLHttpRequest");
// client.setDefaultRequest('proxy', 'https://proxy.sendgrid.com/');

class OrderShowPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            lineQuantities: {

            },
            originalLineQuantities : {

            },
            displayUpdateButtons: {

            },
            showWrapper: false,
            fullOpacity: false
        }
        this.update = this.update.bind(this);
        this.stateIncludesLine = this.stateIncludesLine.bind(this);
        this.QuantityChanged = this.QuantityChanged.bind(this);
        this.handleUpdateLine = this.handleUpdateLine.bind(this);
        this.updateOrderTotal = this.updateOrderTotal.bind(this);
        this.updateStateOriginalLines = this.updateStateOriginalLines.bind(this);
    }

    componentDidMount(){
        const { currentOrderLines, currentOrder, getCurrentOrder, getOrderLinesByOrder }  = this.props;
        let linesArray = OrderPureFunctions.objectValuesArray(currentOrderLines);
        let lineQuantities = Object.assign({}, this.state.lineQuantities) ;

        // set initial line quantities in state
        linesArray.forEach(line => {
            lineQuantities[line.id]  = line.quantity
        });
        this.setState({ lineQuantities: lineQuantities });
        this.setState({ originalLineQuantities: lineQuantities });

        // check localStorage for draft order 
        let currentOrderId = localStorage.getItem('currentOrderId');
        if ( !currentOrder.id && currentOrderId ) {
           let orderInfo = {
              id: currentOrderId
           };
           getCurrentOrder(orderInfo)
           .then(() => getOrderLinesByOrder(currentOrderId))
           .then((orderLines) => {
                let linesArray = OrderPureFunctions.objectValuesArray(orderLines.data);
                let lineQuantities = Object.assign({}, this.state.lineQuantities) ;
        
                linesArray.forEach(line => {
                    lineQuantities[line.id]  = line.quantity
                });
                console.log('setting state quantity')
                this.setState({ lineQuantities: lineQuantities });
                this.setState({ originalLineQuantities: lineQuantities });
           })
        }
        this.timer = setTimeout(() => this.setState({ showWrapper: true }), 50 );
        this.timerOpacity = setTimeout(() => this.setState({ fullOpacity: true }), 700 );
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
        clearTimeout(this.timerOpacity);
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
        const { currentOrder } = this.props;
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const emailData = {
            "content": [
              {
                "type": "text/html", 
                "value": `<html><p>A new order ${currentOrder.order_number} is created</p></html>`
              }
            ], 
            "from": {
              "email": "Unostore1279@ovnotifications88.com", 
              "name": "Uno Store"
            }, 
            "personalizations": [
              {
                "subject": `new order #${currentOrder.order_number} created! ${currentOrder.order_total}`, 
                "to": [
                  {
                    "email": "samkoki77@gmail.com", 
                    "name": "Nans"
                  }
                ]
              }
            ], 
            "reply_to": {
              "email": "Unostore1279@ovnotifications88.com", 
              "name": "Uno Store"
            }, 
            "subject": `new order #${currentOrder.order_number} created! ${currentOrder.order_total}`
        };
        let request = {};
        request.body = emailData;
        request.method = 'POST';
        request.url = `${proxy}https://api.sendgrid.com/v3/mail/send`;
        client.request(request)
        .then(([response, body]) => {
            console.log(`email sent response: ${response}`);
        })
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
        // .then(() => {
        //     console.log('Sending Email!!');
        //     this.sendEmail();
        // })
    }

    updateOrderTotal(oldOrderTotal, orderId, productPrice, ProductQuantity) {
        const { updateOrder } = this.props;
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
      const { lineQuantities, originalLineQuantities, showWrapper, fullOpacity } = this.state;
      const currentLinesArray = Object.values(currentOrderLines);
      let key = 0;
      return(
         <div className="order-show-container">

            {/* <NavBar
               title = 'Beirut Market'
               isHomeNavBar = { true }
            /> */}
            { <div className={classNames({ 'order-info-wrapper': true , 'show-wrapper': showWrapper, 'full-opacity': fullOpacity })}
            > 
                <Link 
                    to = "/"
                >
                    X
                </Link>

                <div className="order-header"> 
                    Order Summary {currentOrder.order_total}
                </div>
                { currentLinesArray.map(line => ( 
                    <div className="order-line-show"
                        key = {key++}
                        >
                        <img className="product-image" 
                            src={`https://onestorebucket.s3.eu-west-3.amazonaws.com/${line.productName}.jpg`}
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
            </div>}
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
    getCurrentOrder: (orderInfo) => dispatch(OrderActions.getCurrentOrderReduxAjax(orderInfo)),
});
 
 
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderShowPage));




