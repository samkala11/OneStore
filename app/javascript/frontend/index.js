import React from "react";
import ReactDOM from "react-dom";
import Root from './components/root';
import configureStore from './store/store'


// import { createBench, fetchAllBenches } from './util/benches_api_utils'
// import { fetchBenchesThunk } from './actions/bench_action';

document.addEventListener("DOMContentLoaded", () => {

  const store = configureStore();

  
  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store}/> , root);
  
  window.store = store;
  window.AppState = () => store.getState();

});

