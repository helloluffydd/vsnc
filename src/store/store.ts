import { configureStore } from '@reduxjs/toolkit';
import courseSlice from '../features/courseSlice';

export const store = configureStore({
  reducer: {
    course: courseSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
