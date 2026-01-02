import { configureStore } from '@reduxjs/toolkit';
import tokenSlice from './slices/tokenSlice';
import uiSlice from './slices/uiSlice';
import priceSlice from './slices/priceSlice';

export const store = configureStore({
  reducer: {
    tokens: tokenSlice,
    ui: uiSlice,
    prices: priceSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;