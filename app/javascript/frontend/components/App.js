import React from 'react';
import { Route } from 'react-router-dom';
import ProductHome from './products/product_home';
import Fruits from './products/Fruits';

const App = () => (
   
   <div className="app-wrapper">
      <Route exact path="/" component={ProductHome}/>
      <Route exact path="/fruits" component={Fruits}/>

   </div>
)

export default App;


