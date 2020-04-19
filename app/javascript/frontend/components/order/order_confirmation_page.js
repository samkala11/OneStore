import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as OrderPureFunctions from '../../util/order_pure_fucntions';
import classNames from 'classnames';
import * as LineActions from '../../actions/order_line_actions';
import * as OrderActions from '../../actions/order_actions';
import jsonobj from "../../../../../config/keymail.json";
import en from '../en.json';
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
            fullOpacity: false,
            showConfirmLoader: false,
            showErrors: false,
            customerName: "",
            customerAddress: "",
            customerPhoneNumber: "",
            customerEmail: ""
        }
        this.update = this.update.bind(this);
        this.handleConfirmOrder = this.handleConfirmOrder.bind(this);
    }

    componentDidMount(){
        window.scroll(0,0);
        const { currentOrderLines, currentOrder, getCurrentOrder, getOrderLinesByOrder }  = this.props;
        // let linesArray = OrderPureFunctions.objectValuesArray(currentOrderLines);
        // let lineQuantities = Object.assign({}, this.state.lineQuantities) ;

        // // set initial line quantities in state
        // linesArray.forEach(line => {
        //     lineQuantities[line.id]  = line.quantity
        // });
        // this.setState({ lineQuantities: lineQuantities });
        // this.setState({ originalLineQuantities: lineQuantities });

        // check localStorage for draft order 
        let currentOrderId = localStorage.getItem('currentOrderId');
        if ( !currentOrder.id && currentOrderId ) {
           let orderInfo = {
              id: currentOrderId
           };
           getCurrentOrder(orderInfo)
           .then(() => getOrderLinesByOrder(currentOrderId))
        }
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
        return e => {
          // debugger;
          this.setState({ [field]: e.currentTarget.value})
          // this.QuantityChanged(field);
          // setTimeout(() => { this.QuantityChanged(field) })
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
                    "name": "Sam"
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
    
    handleConfirmOrder(orderId) {
        const { updateOrder, currentOrder, getCurrentOrder } = this.props;
        const { customerName, customerAddress, customerPhoneNumber, customerEmail } = this.state;
        
        this.setState({ showConfirmLoader: true });
        this.setState({ showErrors: true });

        const updatedOrderInfo = {
          id: orderId,
          first_name: customerName,
          customer_address: customerAddress,
          phone_number: customerPhoneNumber,
          email: customerEmail,
          status: 2000
        }

        updateOrder(updatedOrderInfo)
        .then(() => { 
          let orderInfo = {
            id: currentOrder.id
          };
          getCurrentOrder(orderInfo)
          .then(() => {
            this.timer = setTimeout(() => { this.setState({ showConfirmLoader: false }) }, 800);
            // this.sendEmail();
          })
        })
    }

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

    const { currentOrderLines, currentOrder  } = this.props;
      window.orderConfirmatioProps = this.props;
      window.orderConfirmatiostate = this.state;

    //   const currentLinesArray = Object.values(currentOrderLines);
      let key = 0;
      return(
         <div className="order-confirmation-container">
            <Link to="/ordercheckout"
                  className="back-button"
            > 
            <img className="back-arrow"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAFAklEQVR4nO2bbWgcVRSG3zOzaa01qdaPRmlFRNEiflV/aC1ItalVLKYFZzdVRKQ12JrZ7G6rqV8sKJia7s7ubEJYKC3W2v1AbLWUxpImUQqC4D8FIwqiVKxC0NQWN83e4w8pzEwJaTYzdya4z8/zMvOee3buuTN3ZoE6derUCRBmyWjLllI7ZfmRLKNLwSwaGwEuAQiBaJcejnV57al4bXCp5EpGK8BFACEAAPOrZiH9tte+gShArpR5jJmLABosYcGg77329r0AvQd3tzCLwwDmW8IM8NZoW+wDr/197QFmyVgD5k8BLLCEGeBteiTRLyMH3wqQKxkPMfMAgCssYWamjmhbrE9WHiFZRlayhdRKZj4G++BBRF16RN7gAR8KYBZTDwB0DECjNU7Azo5w7D3Z+UhtgmYhdS9ARwE0WeMMfqMjEu+WmcsFpPUAs5i6G0wnQLjalgDTWx1tMc/X+6mQUoBcOX0nCwwBuMYh9eiR+CsycpgKzwuQKWduU4QYAdDssE7rkVjCa//p8LQHZD/M3qqwGMbFg88EYfAAoHp14r5y+hYQjwC4wSYQTD0S7/TKd6Z4MgWy5eyNJKqfA7jJrvCejnD8RSJiL3xrwfUp0FdILSNRHYFz8Mx7x7470x6kwQMuTwHzgLmUVYwAuNkaJ8b7Y6NnNieTSeGmnxu4NgUyBzNLVEUMM7DcJjDKzerSTZqmVd3ychNXpkD//p7rFEUMXTR4wkdjzePPBHXwgAtTwCyb1wqFhwC6wyF9PLZkPJJcnZycrYeXzGoKGIeMK9UKnwCwwiEdQ1Nog/6EXpnN+WVQ8xWQL3cvEpPqIID7bAJhYK4MHqixB5gHzKZKdd5xAPc7pOON58bnzOCBGq6Anv09C9UGPkpEKx3S4KSCp7Y+u/Mfl3KTwowKkD+Svxxi8iiBHrYJTCdVdf76qBY952p2EvB9V9hvZlSA9vXt5yoT1ScZ/IVNIF5VFZVD6XJ6wRSHBpYZXwE7nttxliYb1oPxlUNaExI4vG9f8jKXcpNCzfcB+XL3ooqYNwjnSkAYQGOoda6sBDX3gHat66/qfGoB6GubwFiH8fPFfD7fMMWhgWJWTTC2IfYnFPVxgL+xK9RaWXS2mBxO+vLeYSbMehXQNf2PhgnxKIBvHdLGxb83FYJehPrjsFsn6tzUeZonQ2sB+tEmELTfxKk9yWQykPccru8J9hVSywTRCDt2hcC8d2z0zJag7Qq5/qtsa0v8IhR1NYCfbALRC4tvb8wzc6A+y/Hksoxq0Z9VBS0EnLIrtNksGYYXnrXi2bzcpsV/EFV1NUC/WuMERLOldNor35ki59UYi2EwrndIKT0S3+61/3R43pk7tc5RqopHAJx2SIlsIZX02n86pDWkzMHMXQqJIefrcRDe1MPxd2Tl4URqRzbKxj2q4BMAFlvjTPxaNJx4V2YuF5C+JPUWjRUCGAT4KpvA3KW3JXbJzseXNbm3bDwoBH8G+3dCDEDXI/Fembn4cnv6shb7kpnXAfjbEiYAZq6Y3iozF1/vyrLl3atIKAMAFlrCDPBLeiSRl5GDrw8oUW37SRC1ArBupRNA/WYptUVGDoG4LzeL6bUAPgFg3U+sEvHzHeHEAS+9A/GIqkfix0HQAExYwiqDlk91jFsEogAAoIfjR5gRAXAeAP77w0T8dX+z8oFcMfV0rmT4+u1gnTp16tSpU+f/wb+E/Kkc8xw4tgAAAABJRU5ErkJggg=="></img>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAEaUlEQVR4nO2bXWgcVRTHf2eyGw3xSZMqiilUEfFJaAv6UCFRMG23jRYNRQtt1pZAN9Logx8vMqAQFPQpEVZIgmhFNlIQkxSfKvjgR1N8UBAUCia1Gpu+SFJtNjvHh+zHuJnNzOx0Jt1Jfk/33j1zz8mf/8y9s3sDW2yxxRabGLF3PpwafmAFegzFsI9bgpWAz4/uH/gl2vLCJ2HvFJSzAju0KkgUCtAP3B9dadFguIeUuS+0KjaQ/zlAtNBtSeKwoK224VcjrilSxC1gbHK4fEekUwOu8Y1Gwj2kwvjkcKO54cpyInm2v7v/j1oBvhzQoOSBob79GVNE1vwtfh6CjUoSeGN8amTI6UO/Dnj7RlUVOiKC8ijonuJIoUl4qHov4+sZkE4NvHbDCowA0zSNjl1t08CTQFPB0qeAd+wxsb4FTNO0EKYrI3JPdUysBSjycKmhhqxZDWItQHYmm0TpKfUNKXxVHRNrAZrnVx4HbgdAmDu298XvqmNiLYCqPlvpkNtU+4DsTDYJFfsjTDjFxVaAov3vAECY69uX+d4pLrYC2O2vMOFkf4ipANX2N8RytD/EVIDkn8td2Ozv9PQvEUsBBMOT/SGGApjnzISiB0v99ewPMRTg3sX2LqC92L20nv0hhgIIts0Puq79IWYCmOfMBFJ5+qvKuvaHmAlQbf90KvOt2zWxEsCv/SFGAtRjf4iRANuvtXXi0/4QIwEs295f4DMv9oeYCJDL5ZpEpWJ/vNkfYiLAUutfXQjbit3fZ2eueLI/xEQAVXml1BaYME3T8nptwwswOjVyDPSJYldXkA/8XO/rh5GbiVzuvZbFluZBVN+yDY+fSGV+9jNPIAFqHakJF21VjAcXV3/yusv2wY/NhvWS39kCCVDrSE24CLAm4zeFwsrTR1KDf/udrbGfAcIcwqnZ1oXHTvQMztczRSAH1DhSEyoi8o9lWfNiyA+3LW2b6e3tLQSZL5AAfQdO/Qq8GWSOjcbLLVBWOJczm0OsZUPwIsBcqbHY0n5wvcBGxPWEyOjU8LuivFzsXgdOC4R/YlS4/Nv5hdN+dnX14PoMWLGSQ0nJPwN0ALcA6UiWPYXtu9sAPgozjest0H+gfwGMTgHH39bCRFVD19rTKpBOnbyoqo+MTo/sMZCdqN4ZdmGgP83OXP0k/DxbbG48n/1VVSnfAoCFXnhhX+Zrr1893Sw5qvEkwNjk+zsQ61OU3VVXn0eNw+nUyYtBC4kihxOuAmS/yLYlJX+B1WXQidm8Jneurhb1EUWOWrgugwkj/zqVwq4LMirIKKubIoCOpOQDnSCNIkctXAUQ5VCpraLP96Uyx/tSmeOoHCnHUImphyhy1MLLu8Ddpca/S8aXpbZat1batpg6iSKHI14EuFxqtLTQXb6w6Vq5LbaYOokihyOuO0EVzpRfhkQ/Hpsc3osgqjxXjoEzQYqIIkct6noZqvpKbrZpGcd/RvBKFDlqEehlaHXM6Dx6aOBqkCKiyFGLTb8T/A94e8JxjjTtVgAAAABJRU5ErkJggg=="></img>
            </Link>

            <p className="name-label"> 
                Name*
            </p>
            <input 
              onChange={this.update('customerName')}
              className={classNames({ 'name-input': true, 'error-border': (this.state.showErrors && this.state['customerName'].length === 0)  })}
              />

            <p className="address-label"> 
                Address*
            </p>
            <textarea 
              className={classNames({ 'address-textarea': true, 'error-border': (this.state.showErrors && this.state['customerAddress'].length === 0)  })}
              value={this.state['address']}
              onChange={this.update('customerAddress')}
            />

            <p className="phone-label"> 
                Phone*
            </p>
            <input 
              onChange={this.update('customerPhoneNumber')}
              className="phone-input"
              className={classNames({ 'phone-input': true, 'error-border': (this.state.showErrors && this.state['customerPhoneNumber'].length === 0)  })}
              />

            <p className="email-label"> 
                Email
            </p>
            <input
              onChange={this.update('customerEmail')} 
              className="email-input"/>

            <div className="charges-container">
              <div className="charges-breakdown">

                <div className="items-breakdown"> 
                  <span> 
                    Items ({Object.values(currentOrderLines).length})
                  </span>
                  <span> 
                     {parseInt(currentOrder.order_total) - en["shippingCharge"] } L.L. 
                  </span>
                </div>

                <div className="shipping-breakdown"> 
                  <span> 
                    Shipping
                  </span>
                  <span> 
                    {en["shippingCharge"]} L.L.
                  </span>
                </div>

                <div className="order-total"> 
                  <span id="total-title"> Total </span>
                  <span id="total-amount"> {currentOrder.order_total} L.L. </span>
                </div>

              </div>
            </div>

            <div className="confirm-container">
              <div 
                onClick={() => this.handleConfirmOrder(currentOrder.id)}
                className="confirm-button">
                
                { this.state.showConfirmLoader 
                  ?
                  <div class="confirm-loader"></div>
                  :
                  <span> Confirm order </span> }
              </div>

              
            </div>
          
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




