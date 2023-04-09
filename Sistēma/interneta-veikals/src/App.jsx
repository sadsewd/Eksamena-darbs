import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './Components/Header/Header';
import FooterComp from './Components/Footer/Footer';
import HomePage from './Components/HomePage';
import React from 'react';
import LoginPage from "./Components/Login/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Header/>}/>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<LoginPage/>}/>
      </Routes>
      <FooterComp />
    </Router>
  );
}

export default App;
