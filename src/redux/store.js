import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './profileSlice';
import requestsReducer from './requestsSlice';

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    requests: requestsReducer
  }
});
export default store;
