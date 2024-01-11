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
  totalPrice: 0, // Array to store the indices of zoomed items
  // ... (other state properties)
};

const yourSlice = createSlice({
    name: 'yourSlice',
    initialState: zoomInitialState,
    reducers: {
      toggleZoomedItem: (state, action) => {
        const { index, isZoomed } = action.payload;
        const item = data[index]; // Assuming data is the array containing your items
  
        if (isZoomed) {
          state.zoomedItems.push({...item, quantity:1});
        } else {
          state.zoomedItems = state.zoomedItems.filter((zoomedItem) => zoomedItem.id !== item.id);
        }
      },

      getCartTotal: (state) => {
        // Initialize total price and total quantity to 0
        let totalQuantity = 0;
        let totalPrice = 0;
      
        // Iterate through each item in the cart
        state.zoomedItems.forEach((cartItem) => {
          // Destructure price and quantity from the cart item
          const { price, quantity } = cartItem;
      
          // Calculate the total for the current item
          const itemTotal = price * quantity;
      
          // Update the overall total price and total quantity
          totalPrice += itemTotal;
          totalQuantity += quantity;
        });
      
        // Update the state with the calculated total price and total quantity
        state.totalPrice = parseInt(totalPrice.toFixed(2));
        state.totalQuantity = totalQuantity;
        
      },
      
  
      increaseItemQuantity: (state, action) => {
        state.zoomedItems = state.zoomedItems.map((item) => {
          if (item.id === action.payload) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      },
      decreaseItemQuantity: (state, action) => {
        state.zoomedItems = state.zoomedItems.map((item) => {
          if (item.id === action.payload) {
            // Ensure the quantity is at least 1 before decreasing
            const updatedQuantity = Math.max(1, item.quantity - 1);
            return { ...item, quantity: updatedQuantity };
          }
          return item;
        });
      },
      removeItem: (state, action) => {
        const itemIdToRemove = action.payload;
        state.zoomedItems = state.zoomedItems.filter((item) => item.id !== itemIdToRemove);
      },
  
    },
  });
  

export const { toggleZoomedItem,increaseItemQuantity,decreaseItemQuantity,getCartTotal,removeItem } = yourSlice.actions;

// Combine reducers
const rootReducer = combineReducers({
  search: searchSlice.reducer,
  yourSlice: yourSlice.reducer,
});

export default rootReducer;
