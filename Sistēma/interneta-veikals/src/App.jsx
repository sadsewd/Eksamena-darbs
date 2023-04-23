import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/Client pages/HomePage';
import React from 'react';
import LoginPage from './Components/Login/LoginPage';
import AdminLogin from './Components/Admin/Admin login/AdminLogin';
import AdminHome from './Components/Admin/Admin Pages/Home/AdminHome';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/admin" element={<AdminLogin />} />
        <Route exact path="/adminhome" element={<AdminHome />} />
      </Routes>
    </Router>
  );
}

export default App;
