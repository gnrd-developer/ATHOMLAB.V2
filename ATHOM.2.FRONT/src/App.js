import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/auth/login'
import Register from './components/auth/register'
import Client from './components/client/client'
import Home from './components/client/components/home'
import Detail from './components/client/components/detail'
import Cart from './components/client/components/cart'
import Historial from './components/client/components/historial'
import SubCategory from './components/client/components/subCategory';

import ProductList from './components/client/components/productList';
import Auth from './components/auth/auth';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />}>
        <Route path="" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="store" element={<Client />}>
        <Route path="" element={<Home />} />
        <Route path="subcategory/:name" element={<SubCategory />} />
        <Route path="detail/:id/:category" element={<Detail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="historial" element={<Historial />} />
        <Route path="listado/:name" element={<ProductList />} />
      </Route>
    </Routes>
  );
}

export default App;
