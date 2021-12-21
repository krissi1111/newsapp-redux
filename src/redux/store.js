import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import newsCardReducer from './slices/newsDataSlice';
import searchReducer from './slices/newsSearchSlice';
import newsModalReducer from './slices/newsModalSlice';
import commentsReducer from './slices/commentSlice'
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    newsCard: newsCardReducer,
    newsModal: newsModalReducer,
    search: searchReducer,
    comments: commentsReducer,
    auth: authReducer
  },
});
