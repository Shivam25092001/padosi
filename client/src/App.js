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
import RentOut from './components/Rent-Out/Rent-Out';
import SupplyDetails from './components/SupplyDetails/SupplyDetails';
import Login from "./components/User/Login";
import Profile from "./components/User/Profile";
import store from "./store";
import { loadUser } from './actions/userAction';
import UnderConstruct from './components/underConstruction/UnderConstruct';
import EditAvatar from './components/User/EditAvatar';
import EditProfile from './components/User/EditProfile';

function App() {
  React.useEffect(()=>{
    store.dispatch(loadUser());
  },[]);


  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path="/under-construction" element={<UnderConstruct/>} />
        <Route exact path="/" element={<Intro/>} />
        <Route exact path="/rent-in" element={<RentIn/>} /> 
        <Route exact path="/rent-out" element={<RentOut/>} /> 
        <Route exact path="/rent-in/supplies/:id" element={<SupplyDetails/>} /> 
        <Route exact path="/rent-in/:keyword" element={<RentIn/>} /> 
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/me" element={<Profile/>} />
        <Route exact path="/me/edit-avatar" element={<EditAvatar/>} />
        <Route exact path="/me/edit-profile" element={<EditProfile/>} />
      </Routes>
    </Router>
  );
}

export default App;
