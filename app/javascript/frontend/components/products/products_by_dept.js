import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import ProductListDepartment from './product_list_department';

class ProductsByDepartment extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

   renderDepartment() {
       let params = this.props.match.params.department;
       switch(params){
           case 'fruits':{
                return <ProductListDepartment/>
           }
           case 'vegetables':{

           }
           default:
               return <p>Oops.. Please return back to the previous page</p>
       }
   }

   render() {
      return(
         <div className="home-page">
                {this.renderDepartment()}
         </div>
      )
   }
}


const mapStateToProps = state => ({
//    products: state.products
 });
 
 const mapDispatchToProps = dispatch => ({
//    getAllProducts: () => dispatch(ProductActions.getAllProductsThunk()),
//    createProduct: (productInfo) => dispatch(ProductActions.createProductThunk(productInfo))
});
 
 
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductsByDepartment));




