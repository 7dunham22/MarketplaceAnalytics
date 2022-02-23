import { combineReducers } from 'redux';
import productsReducer from './products';
import productReducer from './singleProduct';
import customersReducer from './customers';
import customerReducer from './singleCustomer';

const appReducer = combineReducers({
  products: productsReducer,
  singleProduct: productReducer,
  customers: customersReducer,
  singleCustomer: customerReducer,
});

export default appReducer;
