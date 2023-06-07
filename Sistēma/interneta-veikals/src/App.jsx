import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/Client pages/HomePage';
import React from 'react';
import LoginPage from './Components/Login/LoginPage';
import AdminLogin from './Components/Admin/Admin login/AdminLogin';
import AdminHome from './Components/Admin/Admin Pages/Home/AdminHome';
import Database from './Components/Admin/Admin Pages/Database/database';
import Edit from './Components/Admin/Admin Pages/Database/edit';
import Create from './Components/Admin/Admin Pages/Database/create';
import { RequireAuth } from 'react-auth-kit';
import { CssBaseline } from '@mui/material';
import ItemPage from './Components/Client pages/ItemPage';
import Cart from './Components/Client pages/Cart';
import Payment from './Components/Client pages/Payment';
import Katalogs from './Components/Client pages/katalogs';
import RegisterPage from './Components/Register/RegisterPage';
import Categories from './Components/Client pages/Categories';

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/produkts/:id" element={<ItemPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/admin" element={<AdminLogin />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/payment" element={<Payment />} />
          <Route exact path="/katalogs/:id" element={<Katalogs />} />
          <Route exact path="/katalogs" element={<Katalogs />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route exact path="/kategorijas" element={<Categories />} />
          <Route
            exact
            path="/admin/home"
            element={
              <RequireAuth loginPath="/admin">
                <AdminHome />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/admin/database"
            element={
              <RequireAuth loginPath="/admin">
                <Database />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/admin/database/edit/:table/:id"
            element={
              <RequireAuth loginPath="/admin">
                <Edit />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/admin/database/create/:table/"
            element={
              <RequireAuth loginPath="/admin">
                <Create />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
