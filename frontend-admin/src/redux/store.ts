import { configureStore } from '@reduxjs/toolkit';
import { categorySlice } from './slice/categorySlice';

export const store = configureStore({
    reducer: {
        [categorySlice.reducerPath]: categorySlice.reducer
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(categorySlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
