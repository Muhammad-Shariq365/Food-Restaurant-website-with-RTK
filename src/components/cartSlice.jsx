import { combineReducers } from 'redux';
import { createSlice } from '@reduxjs/toolkit';
import data from '../data/data';

// Existing searchSlice
const searchInitialState = {
  searchQuery: '',
  searchData: data,
};

const searchSlice = createSlice({
  name: 'search',
  initialState: searchInitialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    // ... (other searchSlice reducers if needed)
  },
});

export const { setSearchQuery } = searchSlice.actions;

// New yourSlice
const zoomInitialState = {
  zoomedItems: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const yourSlice = createSlice({
  name: 'yourSlice',
  initialState: zoomInitialState,
  reducers: {
    toggleZoomedItem: (state, action) => {
      const { index, isZoomed } = action.payload;
      const item = data[index]; // Assuming data is the array containing your items
    
      if (isZoomed) {
        state.zoomedItems.push({ ...item, quantity: 1 });
        state.totalQuantity += 1;
      } else {
        state.zoomedItems = state.zoomedItems.filter((zoomedItem) => zoomedItem.id !== item.id);
        state.totalQuantity -= 1; // Decrement totalQuantity by 1 when unzoomed
      }
    },
    

    getCartTotal: (state) => {
      let totalPrice = 0;

      state.zoomedItems.forEach((cartItem) => {
        const { price, quantity } = cartItem;
        totalPrice += price * quantity;
      });

      state.totalPrice = parseFloat(totalPrice.toFixed(2));
    },

    increaseItemQuantity: (state, action) => {
      const itemId = action.payload;
      const itemToUpdate = state.zoomedItems.find((item) => item.id === itemId);
      if (itemToUpdate) {
        itemToUpdate.quantity += 1;
        state.totalQuantity += 1;
      }
    },

    decreaseItemQuantity: (state, action) => {
      const itemId = action.payload;
      const itemToUpdate = state.zoomedItems.find((item) => item.id === itemId);
      if (itemToUpdate && itemToUpdate.quantity > 1) {
        itemToUpdate.quantity -= 1;
        state.totalQuantity -= 1;
      }
    },

    removeItem: (state, action) => {
      const itemIdToRemove = action.payload;
      const removedItem = state.zoomedItems.find((item) => item.id === itemIdToRemove);
      if (removedItem) {
        state.zoomedItems = state.zoomedItems.filter((item) => item.id !== itemIdToRemove);
        state.totalQuantity -= removedItem.quantity;
      }
    },
  },
});

export const {
  toggleZoomedItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  getCartTotal,
  removeItem,
} = yourSlice.actions;

// Combine reducers
const rootReducer = combineReducers({
  search: searchSlice.reducer,
  yourSlice: yourSlice.reducer,
});

export default rootReducer;
