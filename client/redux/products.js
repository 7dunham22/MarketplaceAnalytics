import axios from 'axios';
import { ADD_PRODUCT, UPDATE_PRODUCT } from './singleProduct';

const SET_PRODUCTS = 'SET_PRODUCTS';

// ACTION CREATORS
const _setProducts = (items) => {
  return {
    type: SET_PRODUCTS,
    items,
  };
};

// THUNK CREATORS
export const setProducts = () => {
  return async (dispatch) => {
    try {
      const { data: items } = await axios.get('api/items');
      dispatch(_setProducts(items));
    } catch (error) {
      console.error('Failed to retrieve items', error);
    }
  };
};

const initialState = [];

// PRODUCTS/ITEMS REDUCER
export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS: {
      return action.items;
    }
    case ADD_PRODUCT: {
      const existingItems = state.map((product) => product.id);
      if (!existingItems.includes(action.item.id)) {
        return [...state, action.item];
      } else {
        const newProductList = state.map((product) => {
          if (product.id === action.item.id) {
            return action.item;
          } else {
            return product;
          }
        });
        return newProductList;
      }
    }
    case UPDATE_PRODUCT: {
      const newProductList = state.map((product) => {
        if (product.id === action.item.id) {
          return action.item;
        } else {
          return product;
        }
      });
      return newProductList;
    }
    default: {
      return state;
    }
  }
}
