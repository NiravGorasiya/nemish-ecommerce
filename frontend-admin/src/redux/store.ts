import { configureStore } from '@reduxjs/toolkit';
import { categorySlice } from './slice/categorySlice';
import { subCategorySlice } from './slice/subCategory';
import { productSlice } from './slice/productSlice';
import { authApi } from './slice/autheSlice';
import { colorSlice } from './slice/colorSlice';

export const store = configureStore({
    reducer: {
        [categorySlice.reducerPath]: categorySlice.reducer,
        [colorSlice.reducerPath]: colorSlice.reducer,
        [subCategorySlice.reducerPath]: subCategorySlice.reducer,
        [productSlice.reducerPath]:productSlice.reducer,
        [authApi.reducerPath]:authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(categorySlice.middleware)
            .concat(subCategorySlice.middleware)
            .concat(productSlice.middleware)
            .concat(authApi.middleware)
            .concat(colorSlice.middleware)

})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
