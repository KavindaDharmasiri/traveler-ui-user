import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";       // adjust paths
import Footer from "../shared/Footer";       // adjust paths

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Page content goes here */}
      <main className="flex-1 bg-slate-100">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
