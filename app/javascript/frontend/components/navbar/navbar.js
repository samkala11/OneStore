import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

class NavBar extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            newOrderExist: false,
            orderLines: []
        }
    }

    getLinesQuantity() {
        let orderLinesArray;
        let lineQuantity = 0;
        const { currentOrderLines } = this.props;
        if (currentOrderLines) {
            orderLinesArray = Object.values(currentOrderLines);
        }
        console.log('orderlines array', orderLinesArray);
        orderLinesArray.forEach(line => {
            // debugger;
            lineQuantity += line.quantity;
        });
        if (lineQuantity > 0) {
            return lineQuantity
        } else {
            return null
        }
        // this.setState({ orderLines: orderLinesArray })
    }

   render() {
        const { newOrderExist } = this.state;
        const { currentOrder, title } = this.props;
        window.heyyyState = this.state;
        window.navprops = this.props;
        return(
            <div className="navbar-container">
                <span className="header"> {title}  </span>
                   <Link 
                   className = "cart-link"
                   to='/ordercheckout'> 
                        <i className="fas fa-shopping-cart"></i>
                   </Link> 

                { currentOrder  && currentOrder.id && <span>
                    <span> {this.getLinesQuantity()}</span>
                </span>  }
            </div>
        )
   }
}


const mapStateToProps = state => ({
   currentOrder: state.orders.currentOrder,
   currentOrderLines: state.orders.currentOrderLines
 });
 
 const mapDispatchToProps = dispatch => ({
//    getAllProducts: () => dispatch(ProductActions.getAllProductsThunk()),
});
  
export default connect(mapStateToProps, null)(withRouter(NavBar));




