import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/Client pages/HomePage';
import React from 'react';
import LoginPage from './Components/Login/LoginPage';
import AdminLogin from './Components/Admin/Admin login/AdminLogin';
import AdminHome from './Components/Admin/Admin Pages/Home/AdminHome';
import Database from './Components/Admin/Admin Pages/Database/database';
import Edit from './Components/Admin/Admin Pages/Database/edit';
import Create from './Components/Admin/Admin Pages/Database/create';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/admin" element={<AdminLogin />} />
        <Route exact path="/admin/home" element={<AdminHome />} />
        <Route exact path="/admin/database" element={<Database />} />
        <Route exact path="/admin/database/edit/:table/:id" element={<Edit />} />
        <Route exact path="/admin/database/create/:table/" element={<Create />} />
      </Routes>
    </Router>
  );
}

export default App;
