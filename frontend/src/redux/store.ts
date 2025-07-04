import { configureStore } from '@reduxjs/toolkit';
import refetchReducer from './refresh';

export const store = configureStore({
  reducer: {
    refetch: refetchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
