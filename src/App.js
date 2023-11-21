import Login from './Authentication/Login'
import './App.css';
import Context from './Context/Context';
import { Route, Routes } from 'react-router-dom';
import Products from './Management/Products';
import AddProduct from './Management/AddProduct';
import Product from './Views/Product';

function App() {
  return (
    <Context>
      <Routes>
        <Route index element = {<Login />} />
        <Route path = "/products" element = {<Products />} />
        <Route path = "/add-product" element = {<AddProduct />} />
        <Route path = "/products/:id" element = {<Product />} />
      </Routes>
    </Context>
  );
}

export default App;
