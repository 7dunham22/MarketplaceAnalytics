import React from 'react';
import { connect } from 'react-redux';
import { addProduct } from '../redux/singleProduct';
import PropTypes from 'prop-types';

class NewProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      category: 'miscellaneous',
      quantity: 1,
      imageUrl: '',
    };
    this.productCategories = [
      'produce',
      'meats',
      'dairy',
      'household',
      'frozen',
      'pasta',
      'seafood',
      'bakery',
      'baking',
      'medical',
      'office',
      'spices',
      'condiments',
      'bath',
      'miscellaneous',
    ];
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addProduct(this.state);
    this.setState({
      name: '',
      category: 'miscellaneous',
      quantity: 1,
      imageUrl: '',
    });
  }

  render() {
    return (
      <form id="new-product-form" onSubmit={this.handleSubmit}>
        <h3>Create a New Product</h3>
        <div className="new-product-input">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="new-product-input">
          <label htmlFor="category">Category: </label>
          <select
            id="category"
            name="category"
            value={this.state.category}
            onChange={this.handleChange}
          >
            <option value="">--Choose a Category--</option>
            {this.productCategories.map((category, i) => (
              <option key={i} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="new-product-input">
          <label htmlFor="quantity">Quantity: </label>
          <input
            type="number"
            name="quantity"
            value={this.state.quantity}
            min="1"
            max="100"
            step="1"
            onChange={this.handleChange}
          />
        </div>
        <div className="new-product-input">
          <label htmlFor="imageUrl">Image URL: </label>
          <input
            type="url"
            name="imageUrl"
            placeholder="Enter an optional image URL"
            value={this.state.imageUrl}
            onChange={this.handleChange}
          />
        </div>
        <input type="submit" value="Create" />
        <p>
          Note: Attempting to add an existing item will only alter the quantity
          thereof in the database.
        </p>
      </form>
    );
  }
}

NewProduct.propTypes = {
  addProduct: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (product) => dispatch(addProduct(product)),
  };
};

export default connect(null, mapDispatchToProps)(NewProduct);
