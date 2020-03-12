import React from 'react';
import {connect} from 'react-redux';
import { getProductsByDeptThunk } from '../../actions/product_actions'

class Fruits extends React.Component {
   
   constructor(props){
      super(props);
      this.state = {
         products: []
      }
   }

   componentDidMount(){
      const { getProductsByDept } = this.props;
      getProductsByDept(2)
      .then(() => this.setState({products: Object.values(this.props.productsByDept)}));

   }

   render() {
      window.fruitsState = this.state;

      return(<div className="product-show">
               <div className="header"> Fruits  </div>
               <div className="product-list-wrapper">
                  <div  className="product-item-wrapper">
                     <img className="product-image" 
                           src="https://media.istockphoto.com/photos/tomato-isolated-on-white-background-picture-id466175630?k=6&m=466175630&s=612x612&w=0&h=fu_mQBjGJZIliOWwCR0Vf2myRvKWyQDsymxEIi8tZ38="
                     />
                     <div className="product-details">
                        <span className="product-title">
                           Tomato
                           300/kilo
                        </span>
                     </div>

                     <button className="add-button">
                        Add to list
                     </button>
                  </div>

                  <div  className="product-item-wrapper">
                     <img className="product-image" 
                           src="https://media.istockphoto.com/photos/tomato-isolated-on-white-background-picture-id466175630?k=6&m=466175630&s=612x612&w=0&h=fu_mQBjGJZIliOWwCR0Vf2myRvKWyQDsymxEIi8tZ38="
                     />
                     <div className="product-details">
                        <span className="product-title">
                           Tomato
                           300/kilo
                        </span>
                     </div>

                     <button className="add-button">
                        Add to list
                     </button>
                  </div>

                  <div  className="product-item-wrapper">
                     <img className="product-image" 
                           src="https://media.istockphoto.com/photos/tomato-isolated-on-white-background-picture-id466175630?k=6&m=466175630&s=612x612&w=0&h=fu_mQBjGJZIliOWwCR0Vf2myRvKWyQDsymxEIi8tZ38="
                     />
                     <div className="product-details">
                        <span className="product-title">
                           Tomato
                           300/kilo
                        </span>
                     </div>

                     <button className="add-button">
                        Add to list
                     </button>
                  </div>

                  <div  className="product-item-wrapper">
                     <img className="product-image" 
                           src="https://media.istockphoto.com/photos/tomato-isolated-on-white-background-picture-id466175630?k=6&m=466175630&s=612x612&w=0&h=fu_mQBjGJZIliOWwCR0Vf2myRvKWyQDsymxEIi8tZ38="
                     />
                     <div className="product-details">
                        <span className="product-title">
                           Tomato
                           300/kilo
                        </span>
                     </div>

                     <button className="add-button">
                        Add to list
                     </button>
                  </div>

                  <div  className="product-item-wrapper">
                     <img className="product-image" 
                           src="https://media.istockphoto.com/photos/tomato-isolated-on-white-background-picture-id466175630?k=6&m=466175630&s=612x612&w=0&h=fu_mQBjGJZIliOWwCR0Vf2myRvKWyQDsymxEIi8tZ38="
                     />
                     <div className="product-details">
                        <span className="product-title">
                           Tomato
                           300/kilo
                        </span>
                     </div>

                     <button className="add-button">
                        Add to list
                     </button>
                  </div>

                  
               </div>
            </div>
      )
   }
}



const mapStateToProps = state => ({
   productsByDept: state.products.productsByDept
 });
 
 const mapDispatchToProps = dispatch => ({
   getProductsByDept: (no) => dispatch(getProductsByDeptThunk(no)),
});
 
 
export default connect(mapStateToProps, mapDispatchToProps)(Fruits);




