import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import trailReducer from '../features/trails/trailsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    trail: trailReducer
  },
});
