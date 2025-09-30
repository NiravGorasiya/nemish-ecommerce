import { configureStore } from "@reduxjs/toolkit";
import { wishlistSlice } from "./reducer/wishlistSlice";
import { authSlice } from "./reducer/authSlice";
import { cartSlice } from "./reducer/cartSlice";
import { productSlice } from "./reducer/productSlice";
import { orderSlice } from "./reducer/orderSlice";
import { categorySlice } from "./reducer/categorySlice";
import { subCategorySlice } from "./reducer/subCategorySlice";

const store = configureStore({
  reducer: {
    [authSlice.reducerPath]: authSlice.reducer,
    [wishlistSlice.reducerPath]: wishlistSlice.reducer,
    [cartSlice.reducerPath]: cartSlice.reducer,
    [productSlice.reducerPath]: productSlice.reducer,
    [orderSlice.reducerPath]: orderSlice.reducer,
    [categorySlice.reducerPath]: categorySlice.reducer,
    [subCategorySlice.reducerPath]: subCategorySlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(wishlistSlice.middleware)
      .concat(authSlice.middleware)
      .concat(cartSlice.middleware)
      .concat(productSlice.middleware)
      .concat(orderSlice.middleware)
      .concat(categorySlice.middleware)
      .concat(subCategorySlice.middleware),
});

export default store;
