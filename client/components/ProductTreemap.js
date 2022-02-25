import * as d3 from 'd3';
import React from 'react';
import { connect } from 'react-redux';
import { setProducts } from '../redux/products';
import PropTypes from 'prop-types';
import Treemap from './Treemap';

/* BEGINNING OF COMPONENT IMPLEMENTATION OF TREEMAP */

class ProductTreemap extends React.Component {
  constructor(props) {
    super(props);
    this.loading = true;
    this.createTree = this.createTree.bind(this);
  }

  createTree() {
    const data =
      this.props.products && this.props.products.length > 0
        ? this.props.products
        : [{ id: 0, name: 'Loading', category: 'Loading', quantity: 1 }];
    const chartNode = Treemap(data, {
      path: (d) => d.name,
      value: (d) => d?.quantity,
      group: (d) => d.category,
      label: (d) => [d.name, d.quantity.toString()].join('\n'),
      width: 1000,
      height: 500,
    });
    const app = document.getElementById('app');
    const prevChart = document.querySelector('svg');
    if (prevChart) {
      app.removeChild(prevChart);
    }
    app.appendChild(chartNode);
  }

  componentDidMount() {
    this.props.setProducts();
    this.loading = false;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.products !== this.props.products) {
      this.loading = false; // Not sure what to put here.
    }
  }

  render() {
    this.createTree();
    return this.loading ? <h1>LOADING</h1> : <div>{/* <Tree /> */}</div>;
  }
}

ProductTreemap.propTypes = {
  products: PropTypes.array,
  setProducts: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setProducts: () => dispatch(setProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductTreemap);
