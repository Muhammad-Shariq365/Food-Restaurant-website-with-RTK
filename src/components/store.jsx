import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './cartSlice'

const store = configureStore({
  reducer: rootReducer,
});

export default store;
