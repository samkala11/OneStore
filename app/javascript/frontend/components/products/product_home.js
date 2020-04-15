import React from 'react';
import Map from '../Map';
import NavBar from '../navbar/navbar';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as ProductActions from '../../actions/product_actions'
import * as InitialHomeLoaderActions from '../../actions/show_loader_home_actions';
import * as OrderActions from '../../actions/order_actions';
import * as LineActions from '../../actions/order_line_actions';
import classNames from 'classnames';


class ProductHome extends React.Component {
   
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
         showLoader: true,
         fruitsClicked: false,
         fruitsTitleClicked: false,
         vegetablesClicked: false,
         vegetablesTitleClicked: false,

      }
      this.timer = false;
      this.update = this.update.bind(this);
      this.handleCreate = this.handleCreate.bind(this);
      // this.handleFruitsClicked = this.handleFruitsClicked.bind(this);
      this.handleImageClicked = this.handleImageClicked.bind(this);
      this.handleTitleClicked = this.handleTitleClicked.bind(this);
   }

   componentDidMount(){
      const { getAllProducts, hideInitialHomeLoader, currentOrder, getCurrentOrder, getOrderLinesByOrder } = this.props;
      // getAllProducts();
      // this.setState({ first: true})
      // this.setState({array: [...this.state.array, 5,4]})
      // this.setState({array: [...this.state.array, 5]})
      // setTimeout(() => this.setState({array: [...this.state.array, 7]}), 500)
      // this.setState({array: [...this.state.array, 7]})
      
      this.timer = setTimeout(() => {
         this.setState({showLoader: false});
         hideInitialHomeLoader();
      }, 900)

      let storageCurrentOrderId = localStorage.getItem('currentOrderId');
      if ( !currentOrder.id && storageCurrentOrderId ) {
         let orderInfo = {
            id: storageCurrentOrderId
         };
         getCurrentOrder(orderInfo)
         .then(() => getOrderLinesByOrder(storageCurrentOrderId))
      }

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

   handleImageClicked(imageName) {
      console.log(`handle department image clicked called for ${imageName}`)
      
      this.setState({ [`${imageName}Clicked`]: true });
      this.timer2 = setTimeout(() => this.setState({ [`${imageName}Clicked`]: false }), 200);
      this.timer3 = setTimeout(() => this.props.history.push(`/departments/${imageName}`), 400);
   }

   handleTitleClicked(titleName) {
      console.log(`handle department title clicked called for ${titleName}`)
      this.setState({ [`${titleName}TitleClicked`]: true });
      this.timer4 = setTimeout(() => this.setState({ [`${titleName}TitleClicked`]: false }), 200);
      this.timer5 = setTimeout(() => this.props.history.push(`/departments/${titleName}`), 400);
      // debugger;
   }

   render() {
      window.homeState = this.state;
      const {  shouldShowHomeLoader } = this.props;
      return(
         <div className="home-page">
           { shouldShowHomeLoader && this.state.showLoader && <div  className="loader-main">
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
            <NavBar
               title = 'Beirut Market'
               isHomeNavBar = { true }
            />
            {/* <Map/> */}
            
            {/* <div className="search-bar">
               <input 
                  placeholder="search"
                  type="text"/>
            </div> */}
            <div className="all-department-categories">
               {/* <h4>  Main Categories</h4> */}
               <div className="department-wrapper">
                  <div to="/departments/fruits">    
                    <img
                        // onClick={this.handleFruitsClicked}
                        onClick={() => this.handleImageClicked('fruits')}
                        className={classNames({ 'department-image': true, 'clicked': this.state.fruitsClicked })} 
                     src="https://onestorebucket.s3.eu-west-3.amazonaws.com/fruits.jpg"/> 
                  </div>
                  
                  <div
                     onClick = { () => this.handleTitleClicked('fruits') }
                     className={classNames({ 'department-details': true, 'clicked': this.state.fruitsTitleClicked })}   
                     // className="department-details"
                     >
                     <span
                        className="department-title">
                           {/* <Link to="/departments/fruits"> Fruits </Link> */}
                           Fruits 
                     </span>
                  </div>
               </div>

               <div className="department-wrapper">

                  <div to="/departments/vegetables">    
                    <img
                        onClick={() => this.handleImageClicked('vegetables')} 
                        className={classNames({ 'department-image': true, 'clicked': this.state.vegetablesClicked })}
                     src="https://onestorebucket.s3.eu-west-3.amazonaws.com/vegetables.jpg"/> 
                  </div>

                  <div
                     onClick = { () => this.handleTitleClicked('vegetables') }
                     className={classNames({ 'department-details': true, 'clicked': this.state.vegetablesTitleClicked })} 
                     // className="department-details"
                     >
                     <span className="department-title">
                           <Link to="/departments/vegetables"> Vegetables </Link>
                     </span>
                  </div>

               </div>

            </div>

{/* 
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

            </div> */}

         </div>
      )
   }
}



const mapStateToProps = state => ({
   currentOrder: state.orders.currentOrder,
   products: state.products,
   shouldShowHomeLoader: state.showHomeLoader
 });
 
 const mapDispatchToProps = dispatch => ({
   getAllProducts: () => dispatch(ProductActions.getAllProductsThunk()),
   createProduct: (productInfo) => dispatch(ProductActions.createProductThunk(productInfo)),
   hideInitialHomeLoader: () => dispatch(InitialHomeLoaderActions.hideInitialHomeLoader()),
   getCurrentOrder: (orderInfo) => dispatch(OrderActions.getCurrentOrderReduxAjax(orderInfo)),
   getOrderLinesByOrder: (orderId) => dispatch(LineActions.getOrderLinesByOrderReduxAjax(orderId))
});
 
 
export default connect(mapStateToProps, mapDispatchToProps)(ProductHome);




