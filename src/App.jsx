import React from 'react'
import Navbar from './user/pages/shared/Navbar';
import { Route, Routes } from 'react-router-dom';
import ItemDetails from './user/component/renting/ItemDetails'
import Booking from './user/pages/Booking';
import HomePage from './user/pages/HomePage';
import Footer from './user/pages/shared/Footer';

import Rent from './user/component/renting/Rent';
import Login from './user/pages/Login';



export default function App() {
  return (
  <>
   <div>
    <Navbar/>
    <Routes>
      <Route  path='/' element={<HomePage/>}/>
      <Route  path='/item-details/:id' element={<ItemDetails/>}/>
      <Route  path='/rentItems' element={<Rent/>}/>
      <Route  path='/my-bookings' element={<Booking/>}/>
      <Route  path='/login' element={<Login/>}/>
    </Routes>
    <Footer />
    </div>
  </> 
  );
}
