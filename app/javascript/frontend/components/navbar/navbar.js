import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';


class NavBar extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            newOrderExist: false,
            orderLines: [],
            showSearchBar: false
        }

        this.toggleSearchBar = this.toggleSearchBar.bind(this);
    }

    getLinesQuantity() {
        let orderLinesArray;
        let lineQuantity = 0;
        const { currentOrderLines } = this.props;
        if (currentOrderLines) {
            orderLinesArray = Object.values(currentOrderLines);
        }
        console.log('orderlines array', orderLinesArray);
        // orderLinesArray.forEach(line => {
        //     // debugger;
        //     lineQuantity += line.quantity;
        // });
        lineQuantity = orderLinesArray.length;
        if (lineQuantity > 0) {
            return lineQuantity
        } else {
            return null
        }
        // this.setState({ orderLines: orderLinesArray })
    }

    toggleSearchBar () {
        console.log('toggle search bar called')
        this.setState({showSearchBar: !this.state.showSearchBar})
    }

   render() {
        const { newOrderExist, showSearchBar } = this.state;
        const { currentOrder, title, isHomeNavBar } = this.props;
        window.heyyyState = this.state;
        window.navprops = this.props;
        return(
            <div className="navbar-container">
                <div 
                    className={classNames({ 'header': true, 'header-home': isHomeNavBar })}
                    id="header"
                > 
                    {title}  
                </div>

                <div className="nav-links-container">
                   <Link 
                        className={classNames({ 'home-link': true, 'current-link': window.location.hash === '#/' })}
                        to='/'> 
                        <i className="fas fa-home"></i>
                   </Link> 

                   <Link
                        className={classNames({ 'search-link': true, 'current-link': window.location.hash === '#/search' })}
                        to='/search'> 
                        <i className="fas fa-search"></i>
                   </Link> 

                   <Link 
                        className={classNames({ 'cart-link': true, 'current-link': window.location.hash === '#/ordercheckout' })}
                        to='/ordercheckout'> 
                        <i className="fas fa-shopping-cart"></i>
                   </Link> 
                </div>

                { currentOrder  && currentOrder.id && <span className="navbar-quantity"> 
                    {this.getLinesQuantity()}
                </span>}

                { showSearchBar && <div className="search-bar">
                    <input 
                        placeholder="search"
                        type="text"
                        />
                </div>}
                
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




