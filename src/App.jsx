import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import HomePage from "./user/pages/HomePage";
import Rent from "./user/component/renting/Rent";
import ItemDetails from "./user/component/renting/ItemDetails";
import Login from "./user/pages/Login";
import Signup from "./user/pages/Signup";
import Booking from "./user/pages/Booking";
import Backpack from "./user/pages/Backpack";
import AdminDashboard from "./admin/pages/AdminDashboard";
import ProviderDashboard from "./provider/pages/ProviderDashboard";
import RequireAuth from "./user/pages/RequireAuth";
import RentalCart from "./user/component/cart/RentalCart";
import Profile from "./user/pages/Profile";
import PaymentSuccess from "./user/pages/PaymentSuccess";
import PaymentFailed from "./user/pages/PaymentFailed";
import OrderPast from "./user/pages/OrderPast";
import CheckoutPage from "./user/pages/CheckoutPage";
import AboutUs from "./user/pages/AboutUs";
import { useState } from "react";
import {initialCartItems} from "./user/cartData";


import { CartContext } from "./user//component/cart/CartContext";
import { NotificationProvider } from "./user/component/notification/NotificationContext";
import NotificationModal from "./user/component/notification/NotificationModal";
import PendingRequests from "./user/pages/PendingRequests";
import BackpackDetails from "./user/pages/BackpackDetails";
import LandingPage from "./user/pages/LandingPage";
import useAuth from "./user/hooks/useAuth";
import HelpCenter from "./user/component/helpCenter/HelpCenter";

 

export default function App() {
   const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false); // start closed
  const [cartItems, setCartItems] = useState(initialCartItems);

  return (
    <CartContext.Provider value={{ isOpen, setIsOpen, cartItems, setCartItems }}>
      <NotificationProvider>
      <>
        <Routes>
          <Route path="/" element={ <LandingPage />  } />
          
          <Route element={<MainLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about-us" element={<AboutUs/>}/>
          <Route path="/help-center" element={<HelpCenter/>}/>
          
            <Route element={<RequireAuth />}>
              <Route path="/home" element={ <HomePage />  } />
              <Route path="/rentItems" element={<Rent />} />
              <Route path="/item-details/:id/:tenant" element={<ItemDetails />} />
              
              <Route path="/my-bookings" element={<OrderPast />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/backpack" element={<Backpack />} />
              <Route path="/my-orders" element={<PendingRequests />} />
              <Route path="/backpack/:id" element={<BackpackDetails />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/payment/success" element={<PaymentSuccess />} />
              <Route path="/payment/failed" element={<PaymentFailed />} />
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
