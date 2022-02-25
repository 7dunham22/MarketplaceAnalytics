import React from 'react';
import AllProducts from './AllProducts';
import NewProduct from './NewProduct';
import ProductTreemap from './ProductTreemap';

class AdminView extends React.Component {
  render() {
    return (
      <div id="admin-view">
        <h1>Marketplace Analytics</h1>
        <div id="admin-products-display">
          <AllProducts />
          <NewProduct />
        </div>
        <ProductTreemap />
      </div>
    );
  }
}

export default AdminView;
