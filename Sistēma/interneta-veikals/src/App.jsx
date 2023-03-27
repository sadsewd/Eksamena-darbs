import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './Components/Header/Header';
import FooterComp from './Components/Footer/Footer';
import HomePage from './Components/HomePage';
import React from 'react';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
      </Routes>
      <FooterComp />
    </Router>
  );
}

export default App;
