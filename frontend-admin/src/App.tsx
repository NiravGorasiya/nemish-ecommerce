import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
//import './assets/css/vendor-styles.css'; // Custom Vendor CSS
import { Route, Routes } from 'react-router-dom';
import ProductList from './page/product/ProductList';
import Dashboard from './layouts/Dashboard';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Category from './page/Category';
import Product from './page/product/Product';
import ProductDetails from './page/product/ProductDetails';
import Login from './page/Login';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';
import NotFound from './layouts/commonComponent/NotFound';
import Color from './page/Color';
import SubCategory from './page/SubCategory';
import Size from './page/Size';

const App: React.FC = () => {
  return (
    <div>
      <Provider store={store}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/page-product-list" element={<ProductList />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/color" element={<Color />} />
            <Route path="/size" element={<Size />} />
            <Route path="/subcategory" element={<SubCategory />} />
            <Route path="/category" element={<Category />} />
            <Route path="/productadd" element={<Product />} />
            <Route path="/product" element={<ProductList />} />
            <Route path="/product/detail/:id" element={<ProductDetails />} />
            <Route path="/order" element={<ProductDetails />} />
          </Route>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
