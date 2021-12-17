import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import newsCardReducer from './slices/newsDataSlice';
import searchReducer from './slices/searchSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    newsCard: newsCardReducer,
    search: searchReducer
  },
});
