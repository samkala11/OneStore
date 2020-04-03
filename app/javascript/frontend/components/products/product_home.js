import React from 'react';
import Map from '../Map';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as ProductActions from '../../actions/product_actions'

class App extends React.Component {
   
   constructor(props){
      super(props);

      this.state = {
         // array: [],
         // first: false,
         // name: '',
         productInfo: {
            name: '',
            short_desc: '',
            department_id: '',
            price: '',
            product_id: '',
            unit: ''
         },
         errorsCreate: [],
         showLoader: true
      }
      this.timer = false;
      this.update = this.update.bind(this);
      this.handleCreate = this.handleCreate.bind(this);
   }

   componentDidMount(){
      const { getAllProducts } = this.props;
      getAllProducts();
      // this.setState({ first: true})
      // this.setState({array: [...this.state.array, 5,4]})
      // this.setState({array: [...this.state.array, 5]})
      // setTimeout(() => this.setState({array: [...this.state.array, 7]}), 500)
      // this.setState({array: [...this.state.array, 7]})
      this.timer = setTimeout(() => this.setState({showLoader: false}), 900)
   }

   componentWillUnmount() {
      clearTimeout(this.timer);
   }

   update(field) {

      let newProductInfo = Object.assign({}, this.state.productInfo) ;
      return e => {
         newProductInfo[field]  = e.currentTarget.value
         this.setState({ productInfo: newProductInfo})
      }
   }

   handleCreate(e) {
      e.preventDefault()
      const { createProduct, getAllProducts } = this.props;

      // let products = {
      //    products: [
      //       {
      //          name: 'tomatoo',
      //          short_desc: 'tomato',
      //          department_id: 6,
      //          price: 10,
      //          product_id: 2908878,
      //          unit: 'kg'
      //       },
      //       {
      //          name: 'bananaaa',
      //          short_desc: 'bananaa',
      //          department_id: 7,
      //          price: 20,
      //          product_id: 29440074,
      //          unit: 'kg'
      //       }
      //    ]
      // }

      console.log('right before create', this.state.productInfo);      
      createProduct(this.state.productInfo)
      // createProduct(products)
      .then((response) => {
         console.log('your response', response);
         // let resetProductInfo =  { name: '', short_desc: '', department_id: '', price: ''};
         // this.setState({ productInfo: resetProductInfo })
         // getAllProducts();
      })
      .catch((response) => {
         console.log('there is a failure in creating this product', response)
         this.setState({ errorsCreate: response.responseJSON})
      })
     
   }

   render() {
      window.homeState = this.state;
      return(
         <div className="home-page">

           { this.state.showLoader && <div  className="loader-main">
           <div className="loader-container"> 
               <div className="loader-div red-border">
                  <div className="loader-div white-border">
                     <div className="loader-div green-border">
                     <div className="loader-div red-border">
                     </div>
                     </div>
                  </div>
               </div>
           </div> 
           </div>}

            <div className="header">
               <h4> Beirut Market </h4>
            </div>

            {/* <Map/> */}
            
            <div className="search-bar">
               <input 
                  placeholder="search"
                  type="text"/>
            </div>
            <div className="products-categories">
               {/* <h4>  Main Categories</h4> */}
               <div className="department-wrapper">
                  <Link to="/departments/fruits">    
                    <img className="department-image" 
                     src="https://onestorebucket.s3.eu-west-3.amazonaws.com/fruits.jpg"/> 
                  </Link>
                  
                  <div className="department-details">
                     <span className="department-title">
                           <Link to="/departments/fruits"> Fruits </Link>
                     </span>
                  </div>
               </div>

               <div className="department-wrapper">
                  <Link to="/departments/fruits">    
                    <img className="department-image" 
                     src="https://onestorebucket.s3.eu-west-3.amazonaws.com/vegetables.jpg"/> 
                  </Link>
                  <div className="department-details">
                     <span className="department-title">
                           <Link to="/departments/fruits"> Vegetables </Link>
                     </span>
                  </div>
               </div>

            </div>


            <div className="new-product-form">

               <input 
                  type="text" 
                  className="product-name-input" 
                  placeholder="product_id"
                  onChange={this.update('product_id')}
                  value = {this.state.productInfo['product_id'] || ''}
               />

               <input 
                  type="text" 
                  className="product-name-input" 
                  placeholder="Name"
                  onChange={this.update('name')}
                  value = {this.state.productInfo['name'] || ''}
               /> 

               <input 
                  type="text" 
                  className="product-name-input" 
                  placeholder="Short Desc"
                  onChange={this.update('short_desc')}
                  value = {this.state.productInfo['short_desc'] || ''}
               />

                <input 
                  type="text" 
                  className="product-name-input" 
                  placeholder="Department"
                  onChange={this.update('department_id')}
                  value = {this.state.productInfo['department_id'] || ''}
               />

                <input 
                  type="text" 
                  className="product-name-input" 
                  placeholder="Price"
                  onChange={this.update('price')}
                  value = {this.state.productInfo['price'] || ''}
               /> 

               <input 
                  type="text" 
                  className="product-name-input" 
                  placeholder="Unit"
                  onChange={this.update('unit')}
                  value = {this.state.productInfo['unit'] || ''}
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




