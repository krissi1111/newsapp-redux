import { configureStore } from '@reduxjs/toolkit';
import newsCardReducer from './slices/newsDataSlice';
import searchReducer from './slices/newsSearchSlice';
import newsModalReducer from './slices/newsModalSlice';
import commentsReducer from './slices/commentSlice'
import authReducer from './slices/authSlice';
import errorReducer from './slices/errorSlice';

export const store = configureStore({
  reducer: {
    newsCard: newsCardReducer,
    newsModal: newsModalReducer,
    search: searchReducer,
    comments: commentsReducer,
    auth: authReducer,
    error: errorReducer
  },
});
