/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Orders from './pages/orders/Orders';
import ProductCreate from './pages/products/ProductCreate';
import ProductEdit from './pages/products/ProductEdit';
import Products from './pages/products/Products';
import Register from './pages/Register';
import RoleCreate from './pages/roles/RoleCreate';
import RoleEdit from './pages/roles/RoleEdit';
import Roles from './pages/roles/Roles';
import UserCreate from './pages/users/UserCreate';
import UserEdit from './pages/users/UserEdit';
import Users from './pages/users/Users';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/users' element={<Users />}/>
          <Route path='/users/create' element={<UserCreate />}/>
          <Route path='/users/:id' element={<UserEdit />}/>
          <Route path='/roles' element={<Roles />}/>
          <Route path='/roles/create' element={<RoleCreate />}/>
          <Route path='/roles/:id' element={<RoleEdit />}/>
          <Route path='/products' element={<Products />}/>
          <Route path='/products/create' element={<ProductCreate />}/>
          <Route path='/products/:id' element={<ProductEdit />}/>
          <Route path='/orders' element={<Orders />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
