import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import React from "react";
import Navbar from './components/Navbar/Navbar';
import Intro from './components/Home/Intro';
import RentIn from './components/Rent-In/Rent-In';
import SupplyDetails from './components/SupplyDetails/SupplyDetails';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Intro/>} />
        <Route exact path="/rent-in" element={<RentIn/>} /> 
        <Route exact path="/rent-in/supplies/:id" element={<SupplyDetails/>} /> 
        <Route exact path="/rent-in/:keyword" element={<RentIn/>} /> 
      </Routes>
    </Router>
  );
}

export default App;
