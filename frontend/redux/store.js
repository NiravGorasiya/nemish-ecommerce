import { configureStore } from '@reduxjs/toolkit'
import { wishlistSlice } from './reducer/wishlistSlice';
import { authSlice } from './reducer/authSlice';


const store = configureStore({
  reducer: {
    [wishlistSlice.reducerPath]: wishlistSlice.reducer,
    [authSlice.reducerPath]: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(wishlistSlice.middleware)
      .concat(authSlice.middleware),
});


export default store;