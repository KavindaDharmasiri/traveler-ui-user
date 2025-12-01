import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import HomePage from "./user/pages/HomePage";
import Rent from "./user/component/renting/Rent";
import Login from "./user/pages/Login";
import Signup from "./user/pages/Signup";
import Booking from "./user/pages/Booking";
import ItemDetails from "./user/component/renting/ItemDetails";
import AdminDashboard from "./admin/pages/AdminDashboard";
import ProviderDashboard from "./provider/pages/ProviderDashboard";
import RequireAuth from "./user/pages/RequireAuth";

export default function App() {
  return (
    <Routes>
      {/* All these routes share Navbar + Footer */}
      <Route element={<MainLayout />}>
        {/* public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/item-details/:id" element={<ItemDetails />} />
        <Route path="/rentItems" element={<Rent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/my-bookings" element={<Booking />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/provider" element={<ProviderDashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}
