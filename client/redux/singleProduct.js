import axios from 'axios';

const SET_PRODUCT = 'SET_PRODUCT';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

// ACTION CREATORS
const _setProduct = (item) => {
  return {
    type: SET_PRODUCT,
    item,
  };
};

const _addProduct = (item) => {
  return {
    type: ADD_PRODUCT,
    item,
  };
};

const _updateProduct = (item) => {
  return {
    type: UPDATE_PRODUCT,
    item,
  };
};

// THUNK CREATORS
export const setProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data: item } = await axios.get(`api/items/${id}`);
      dispatch(_setProduct(item));
    } catch (error) {
      console.error('Failed to set single product', error);
    }
  };
};

export const addProduct = (product) => {
  return async (dispatch) => {
    try {
      const { data: newItem } = await axios.post('api/items', product);
      dispatch(_addProduct(newItem));
    } catch (error) {
      console.error('Failed to add single product', error);
    }
  };
};

export const updateProduct = (product) => {
  return async (dispatch) => {
    try {
      const { data: newItem } = await axios.put(
        `api/items/${product.id}`,
        product
      );
      dispatch(_updateProduct(newItem));
    } catch (error) {
      console.error('Failed to update product', error);
    }
  };
};

const initialState = {};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCT || ADD_PRODUCT || UPDATE_PRODUCT: {
      return action.item;
    }
    default: {
      return state;
    }
  }
}
