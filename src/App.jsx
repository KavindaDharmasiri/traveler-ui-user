import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import HomePage from "./user/pages/HomePage";
import Rent from "./user/component/renting/Rent";
import ItemDetails from "./user/component/renting/ItemDetails";
import Login from "./user/pages/Login";
import Signup from "./user/pages/Signup";
import Booking from "./user/pages/Booking";
import AdminDashboard from "./admin/pages/AdminDashboard";
import ProviderDashboard from "./provider/pages/ProviderDashboard";
import RequireAuth from "./user/pages/RequireAuth";
import RentalCart from "./user/component/cart/RentalCart";
import { useState } from "react";
import {initialCartItems} from "./user/cartData";


import { CartContext } from "./user//component/cart/CartContext";
import { NotificationProvider } from "./user/component/notification/NotificationContext";
import NotificationModal from "./user/component/notification/NotificationModal";


export default function App() {
  const [isOpen, setIsOpen] = useState(false); // start closed
  const [cartItems, setCartItems] = useState(initialCartItems);

  return (
    <CartContext.Provider value={{ isOpen, setIsOpen, cartItems, setCartItems }}>
      <NotificationProvider>
      <>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/rentItems" element={<Rent />} />
            <Route path="/item-details/:id/:tenant" element={<ItemDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/my-bookings" element={<Booking />} />
            <Route element={<RequireAuth />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/provider" element={<ProviderDashboard />} />
            </Route>
          </Route>
        </Routes>

        {/* Floating cart overlay on all pages */}
        <RentalCart 
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          cartItems={cartItems}
        />
        <NotificationModal />
      </>
    </NotificationProvider>
    </CartContext.Provider>
  );
}
