import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
//import './assets/css/vendor-styles.css'; // Custom Vendor CSS
import { Route, Routes } from 'react-router-dom';
import ProductList from './layouts/product/prodect-list'; // Corrected component name to ProductList
import Dashboard from './layouts/Dashboard';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Category from './page/Category';

const App: React.FC = () => {
  return (
    <div>
      <Provider store={store}>
        <Routes>
          <Route path="/page-product-list" element={<ProductList />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/category" element={<Category />}/>
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
