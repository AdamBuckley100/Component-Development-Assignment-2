import React from 'react';
import ReactDOM from 'react-dom';
import ProductCatalogueApp from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Products from  './theInformation';

ReactDOM.render(
  <ProductCatalogueApp products={Products}/>,
  document.getElementById('root')
);