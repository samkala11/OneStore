import React from "react";

import { Provider } from "react-redux";
import { HashRouter } from 'react-router-dom';
import App from './App';


// Root will accept the store as a prop, 
// and render routes wrapped by the Provider.

const Root = ({store}) => (
  <Provider store={store}>
    <HashRouter>

      <App />

    </HashRouter>
  </Provider>
);

export default Root;