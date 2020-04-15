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
            showSearchBar: false,
            homeIconClicked: false,
            searchIconClick: false,
            cartIconClicked: false
        }

        this.toggleSearchBar = this.toggleSearchBar.bind(this);
        this.handleIconClicked = this.handleIconClicked.bind(this);
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

    handleIconClicked(iconName, path) {
        console.log(`handle navigation icon clicked called for ${iconName}`)
        this.setState({ [`${iconName}IconClicked`]: true });
        this.timer4 = setTimeout(() => this.setState({ [`${iconName}IconClicked`]: false }), 200);
        this.timer5 = setTimeout(() => this.props.history.push(`${path}`), 200);
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
                   <div 
                        className={classNames({ 'home-link': true, 'current-link': window.location.hash === '#/' })}
                        > 
                        <span  
                            onClick = { () => this.handleIconClicked('home', '/') }
                            className={classNames({ 'fas': true, 'fa-home': true, 'icon-clicked': this.state.homeIconClicked })}
                            // className="fas fa-home"
                        > </span>
                   </div> 

                   <div
                        className={classNames({ 'search-link': true, 'current-link': window.location.hash === '#/search' })}
                        // to='/search'
                        > 
                        <i  onClick = { () => this.handleIconClicked('search', '/search')}
                            className={classNames({ 'fas': true, 'fa-search': true, 'icon-clicked': this.state.searchIconClicked })}
                            // className="fas fa-search"
                            ></i>
                   </div> 

                   <div 
                        className={classNames({ 'cart-link': true, 'current-link': window.location.hash === '#/ordercheckout' })}
                        // to='/ordercheckout'
                        > 
                        <span  onClick = { () => this.handleIconClicked('cart', '/ordercheckout')}
                            className={classNames({ 'fas': true, 'fa-shopping-cart': true, 'icon-clicked': this.state.cartIconClicked })}
                            // className="fas fa-shopping-cart"
                            ></span>
                   </div> 
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




