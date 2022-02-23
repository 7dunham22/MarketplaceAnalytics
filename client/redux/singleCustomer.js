import axios from 'axios';

const SET_CUSTOMER = 'SET_CUSTOMER';
export const ADD_CUSTOMER = 'ADD_CUSTOMER';

// ACTION CREATORS
const _setCustomer = (customer) => {
  return {
    type: SET_CUSTOMER,
    customer,
  };
};

const _addCustomer = (customer) => {
  return {
    type: ADD_CUSTOMER,
    customer,
  };
};

// THUNK CREATORS
export const setCustomer = (id) => {
  return async (dispatch) => {
    try {
      const { data: customer } = await axios.get(`/api/customers/${id}`);
      dispatch(_setCustomer(customer));
    } catch (error) {
      console.error('Failed to retrieve single customer', error);
    }
  };
};

export const addCustomer = (customer) => {
  return async (dispatch) => {
    try {
      const { data: newCustomer } = await axios.post(
        '/api/customers',
        customer
      );
      dispatch(_addCustomer(newCustomer));
    } catch (error) {
      console.error('Failed to add single customer', error);
    }
  };
};

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CUSTOMER || ADD_CUSTOMER: {
      return action.customer;
    }
    default: {
      return state;
    }
  }
}
