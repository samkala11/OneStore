import React from 'react';
import NavBar from '../navbar/navbar';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as ProductActions from '../../actions/product_actions'
import * as InitialHomeLoaderActions from '../../actions/show_loader_home_actions';

class SearchPage extends React.Component {
   
    constructor(props){
        super(props);
        this.state = {
        }
    }

   render() {
      window.searchState = this.state;
      return(
        <div className="-page">
            <NavBar
               title = 'Beirut Market'
               isHomeNavBar = { true }
            />
            <div className="search-bar">
               <input 
                  placeholder="search"
                  type="text"/>
            </div>
        </div>
      )
   }
}



const mapStateToProps = state => ({
   products: state.products,
   shouldShowHomeLoader: state.showHomeLoader
 });
 
 const mapDispatchToProps = dispatch => ({
   getAllProducts: () => dispatch(ProductActions.getAllProductsThunk()),
   createProduct: (productInfo) => dispatch(ProductActions.createProductThunk(productInfo)),
   hideInitialHomeLoader: () => dispatch(InitialHomeLoaderActions.hideInitialHomeLoader())
});
 
 
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);




