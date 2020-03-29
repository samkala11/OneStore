import React from 'react';
// import Map from '../Map';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Fruits from './Fruits';
// import * as ProductActions from '../../actions/product_actions'

class ProductsByDepartment extends React.Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }

//    update(field) {
//       let newProductInfo = Object.assign({}, this.state.productInfo) ;
//       return e => {
//          newProductInfo[field]  = e.currentTarget.value
//          this.setState({ productInfo: newProductInfo})
//       }
//    }
   renderDepartment() {
       let params = this.props.match.params.department;
       switch(params){
           case 'fruits':{
                return <Fruits/>
           }
           case 'vegetables':{

           }
           default:
               return <p>All departments</p>
       }
   }

   render() {
      window.heyyyState = this.state;
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




