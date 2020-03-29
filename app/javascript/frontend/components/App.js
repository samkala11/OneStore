import React from 'react';
import { Route } from 'react-router-dom';
import ProductHome from './products/product_home';
import Fruits from './products/Fruits';
import ProductByDepartment from './products/products_by_dept';

const App = () => (
   
   <div className="app-wrapper">
      <Route exact path="/" component={ProductHome}/>
      {/* <Route exact path="/fruits" component={Fruits}/> */}
      <Route exact path="/departments" component={ProductByDepartment}/> 
      <Route exact path="/departments/:department" component={ProductByDepartment}/> 

   </div>
)

export default App;


