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

class OrderConfirmationPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            lineQuantities: {

            },
            fullOpacity: false
        }
        this.update = this.update.bind(this);
    }

    componentDidMount(){
        window.scroll(0,0);
        // const { currentOrderLines, currentOrder, getCurrentOrder, getOrderLinesByOrder }  = this.props;
        // let linesArray = OrderPureFunctions.objectValuesArray(currentOrderLines);
        // let lineQuantities = Object.assign({}, this.state.lineQuantities) ;

        // // set initial line quantities in state
        // linesArray.forEach(line => {
        //     lineQuantities[line.id]  = line.quantity
        // });
        // this.setState({ lineQuantities: lineQuantities });
        // this.setState({ originalLineQuantities: lineQuantities });

        // // check localStorage for draft order 
        // let currentOrderId = localStorage.getItem('currentOrderId');
        // if ( !currentOrder.id && currentOrderId ) {
        //    let orderInfo = {
        //       id: currentOrderId
        //    };
        //    getCurrentOrder(orderInfo)
        //    .then(() => getOrderLinesByOrder(currentOrderId))
        //    .then((orderLines) => {
        //         let linesArray = OrderPureFunctions.objectValuesArray(orderLines.data);
        //         let lineQuantities = Object.assign({}, this.state.lineQuantities) ;
        
        //         linesArray.forEach(line => {
        //             lineQuantities[line.id]  = line.quantity
        //         });
        //         console.log('setting state quantity')
        //         this.setState({ lineQuantities: lineQuantities });
        //         this.setState({ originalLineQuantities: lineQuantities });
        //    })
        // }
        // this.timer = setTimeout(() => this.setState({ showWrapper: true }), 50 );
        // this.timerOpacity = setTimeout(() => this.setState({ fullOpacity: true }), 700 );
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


    // updateStateOriginalLines() {
    //     const { lineQuantities, originalLineQuantities } = this.state;
    //     let updatedQuantities = Object.assign( {}, lineQuantities);
    //     this.setState({ originalLineQuantities: updatedQuantities});
    // }
    
    // updateOrderTotal(oldOrderTotal, orderId, productPrice, ProductQuantity) {
    //     const { updateOrder } = this.props;
    //     let newOrderTotal = oldOrderTotal + (productPrice * ProductQuantity);
    //     const updatedOrderInfo = {
    //         order_total: newOrderTotal,
    //         pending_total: newOrderTotal,
    //         id: orderId
    //     }
    //     updateOrder(updatedOrderInfo)
    //     .then((updatedOrder) => console.log(`Order total updated successfully from this.updateOrderTotal`, updatedOrder.data.order_total ));
    // }

    handleBlur(event, productId, orderId, newProductQuantity, productPrice, oldLineQuantity, lineId) {
            console.log('blurrr and save');
            this.handleUpdateLine(productId, orderId, newProductQuantity, productPrice, oldLineQuantity, lineId );
    }

    handleEnter(event, productId, orderId, newProductQuantity, productPrice, oldLineQuantity, lineId) {
        if (event.keyCode === 13) {
            console.log(`enter and save`);
            this.handleUpdateLine(productId, orderId, newProductQuantity, productPrice, oldLineQuantity, lineId );
        }
    }


   render() {
      window.orderConfirmatioProps = this.props;
      window.orderConfirmatiostate = this.state;

    //   const currentLinesArray = Object.values(currentOrderLines);
      let key = 0;
      return(
         <div className="order-confirmation-container">

            <label className="name-label"> 
                Name
                <input/>
            </label>

            <label className="address-label"> 
                address
                <input/>
            </label>
          
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
    deleteOrderLine: (orderLineId) => dispatch(LineActions.deleteOrderLineReduxAjax(orderLineId)),
    updateOrder: (orderInfo) => dispatch(OrderActions.updateOrderReduxAjax(orderInfo)),
    deleteOrder: (orderId) => dispatch(OrderActions.deleteOrderReduxAjax(orderId)),
    getCurrentOrder: (orderInfo) => dispatch(OrderActions.getCurrentOrderReduxAjax(orderInfo)),
});
 
 
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderConfirmationPage));




