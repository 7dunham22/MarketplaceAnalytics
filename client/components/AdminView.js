import React from 'react';
// import { connect } from 'react-redux';
import AllProducts from './AllProducts';
import NewProduct from './NewProduct';

class AdminView extends React.Component {
  render() {
    return (
      <div id="admin-view">
        <h1>Marketplace Analytics</h1>
        <div id="admin-products-display">
          <AllProducts />
          <NewProduct />
        </div>
      </div>
    );
  }
}

export default AdminView;
