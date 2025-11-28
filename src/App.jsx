import React from 'react'
import Navbar from './user/pages/shared/Navbar';
import { Route, Routes } from 'react-router-dom';
import ItemDetails from './user/component/renting/ItemDetails'
import Booking from './user/pages/Booking';
import HomePage from './user/pages/HomePage';
import Footer from './user/pages/shared/Footer';
<<<<<<< HEAD

import Rent from './user/component/renting/Rent';
import Login from './user/pages/Login';
=======
import AdminDashboard from './admin/pages/AdminDashboard';
import ProviderDashboard from './provider/pages/ProviderDashboard';

import Rent from './user/component/renting/Rent';
>>>>>>> 3f38478f8a37e175d85c0b344935ad78411307c6



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
<<<<<<< HEAD
      <Route  path='/login' element={<Login/>}/>
=======
      <Route  path='/admin' element={<AdminDashboard/>}/>
      <Route  path='/provider' element={<ProviderDashboard/>}/>
>>>>>>> 3f38478f8a37e175d85c0b344935ad78411307c6
    </Routes>
    <Footer />
    </div>
  </> 
  );
}
