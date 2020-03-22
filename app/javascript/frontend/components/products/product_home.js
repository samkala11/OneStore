import React from 'react';
import Map from '../Map';
import {connect} from 'react-redux';
import * as ProductActions from '../../actions/product_actions'

class App extends React.Component {
   
   constructor(props){
      super(props);

      this.state = {
         array: [],
         first: false,
         name: '',
         productInfo: {
            name: '',
            short_desc: '',
            department_id: '',
            price: ''
         },
         errorsCreate: []
      }

      this.update = this.update.bind(this);
      this.handleCreate = this.handleCreate.bind(this);
   }

   componentDidMount(){
      const { getAllProducts } = this.props;
      getAllProducts();
      // this.setState({ first: true})
      this.setState({array: [...this.state.array, 5,4]})
      // this.setState({array: [...this.state.array, 5]})
      setTimeout(() => this.setState({array: [...this.state.array, 7]}), 500)
      // this.setState({array: [...this.state.array, 7]})
   }


   update(field) {

      let newProductInfo = Object.assign({}, this.state.productInfo) ;
      return e => {
         newProductInfo[field]  = e.currentTarget.value
         this.setState({ productInfo: newProductInfo})
      }
   }

   handleCreate() {
      const { createProduct, getAllProducts } = this.props;

      let products = {
         products: [
            {
               name: 'tomato',
               short_desc: 'tomato',
               department_id: 6,
               price: 10
            },
            {
               name: 'bananaaa',
               short_desc: 'bananaa',
               department_id: 7,
               price: 20
            }
         ]
      }

      // debugger;
      // createProduct(this.state.productInfo)
      createProduct(products)
      .then((response) => {
         console.log('your response', response.data);
         getAllProducts();
         let resetProductInfo =  { name: '', short_desc: '', department_id: '', price: ''};
         this.setState({ productInfo: resetProductInfo })
      })
      .catch((response) => {
         console.log('there is a failure in creating this product', response.responseJSON)
         this.setState({ errorsCreate: response.responseJSON})
      })
     
   }

   render() {
      window.heyyyState = this.state;
      return(
         <div className="home-page">
            <div className="header"> </div>
            <Map/>
            <div className="search-bar"></div>
            <div className="products-categories">
               <h4>  Main Categoriesopopo </h4>
            </div>


            <div className="new-product-form">

               <input 
                  type="text" 
                  className="product-name-input" 
                  placeholder="Name"
                  onChange={this.update('name')}
                  value = {this.state.productInfo['name']}
               /> 

               <input 
                  type="text" 
                  className="product-name-input" 
                  placeholder="Short Desc"
                  onChange={this.update('short_desc')}
                  value = {this.state.productInfo['short_desc']}
               />

                <input 
                  type="text" 
                  className="product-name-input" 
                  placeholder="Department"
                  onChange={this.update('department_id')}
                  value = {this.state.productInfo['department_id']}
               />

                <input 
                  type="text" 
                  className="product-name-input" 
                  placeholder="Price"
                  onChange={this.update('price')}
                  value = {this.state.productInfo['price']}
               /> 
 
 


               <button 
                  onClick = {this.handleCreate}
               >
                  Create
               </button>

            </div>

         </div>
      )
   }
}



const mapStateToProps = state => ({
   products: state.products
 });
 
 const mapDispatchToProps = dispatch => ({
   getAllProducts: () => dispatch(ProductActions.getAllProductsThunk()),
   createProduct: (productInfo) => dispatch(ProductActions.createProductThunk(productInfo))
});
 
 
export default connect(mapStateToProps, mapDispatchToProps)(App);




