import * as d3 from 'd3';
import React from 'react';
import { connect } from 'react-redux';
import { setProducts } from '../redux/products';
import PropTypes from 'prop-types';

class ProductTreemap extends React.Component {
  constructor(props) {
    super(props);
    this.loading = true;
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
    return this.loading ? <h1>LOADING</h1> : '';
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
