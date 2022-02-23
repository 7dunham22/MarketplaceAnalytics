import axios from 'axios';
import { ADD_CUSTOMER } from './singleCustomer';

const SET_CUSTOMERS = 'SET_CUSTOMERS';

// ACTION CREATORS
const _setCustomers = (customers) => {
  return {
    type: SET_CUSTOMERS,
    customers,
  };
};

// THUNK CREATORS
export const setCustomers = () => {
  return async (dispatch) => {
    const { data: customers } = await axios.get('api/customers');
    dispatch(_setCustomers(customers));
  };
};

const initialState = [];

// REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CUSTOMERS: {
      return action.customers;
    }
    case ADD_CUSTOMER: {
      return [...state, action.customer];
    }
    default: {
      return state;
    }
  }
}
