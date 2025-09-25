import { configureStore } from '@reduxjs/toolkit';
import { categorySlice } from './slice/categorySlice';
import { subCategorySlice } from './slice/subCategory';
import { productSlice } from './slice/productSlice';
import { authApi } from './slice/autheSlice';
import { colorSlice } from './slice/colorSlice';
import { customerSlice } from './slice/customerSlice';
import { sizeSlice } from './slice/sizeSlice';
import { attributeSlice } from './slice/attributeSlice';
import { couponSlice } from './slice/couponSlice';
import { orderSlice } from './slice/orderSlice';

export const store = configureStore({
    reducer: {
        [categorySlice.reducerPath]: categorySlice.reducer,
        [colorSlice.reducerPath]: colorSlice.reducer,
        [customerSlice.reducerPath]: customerSlice.reducer,
        [subCategorySlice.reducerPath]: subCategorySlice.reducer,
        [productSlice.reducerPath]:productSlice.reducer,
        [authApi.reducerPath]:authApi.reducer,
        [sizeSlice.reducerPath]:sizeSlice.reducer,
        [attributeSlice.reducerPath]:attributeSlice.reducer,
        [couponSlice.reducerPath]:couponSlice.reducer,
        [orderSlice.reducerPath]:orderSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(categorySlice.middleware)
            .concat(subCategorySlice.middleware)
            .concat(productSlice.middleware)
            .concat(authApi.middleware)
            .concat(sizeSlice.middleware)
            .concat(colorSlice.middleware)
            .concat(customerSlice.middleware)
            .concat(attributeSlice.middleware)
            .concat(couponSlice.middleware)
            .concat(orderSlice.middleware)

})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
