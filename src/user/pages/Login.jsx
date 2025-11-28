// src/pages/Login.jsx
import React from "react"
import traveler_logo from '../../assets/traveler_logo.png'



export default function Login() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 md:p-10">
        {/* Logo section */}
        <div className="flex flex-col items-center mb-8">
           <div className="h-24 w-full flex items-center justify-center overflow-hidden border-b border-gray-100 mb-4">
                        {/* Updated Logo: Applying w-60 h-32 (128px) to fit roughly the user's request, 
                           demonstrating how overflow-hidden would clip the image vertically. */}
                        <img 
                            src={traveler_logo} // Using placeholder URL
                            alt='traveler logo' 
                            // Note: h-32 is used as a standard Tailwind replacement for the non-standard h-34
                            className="w-60 h-32 object-contain rounded-lg transition-transform hover:scale-105 duration-500"
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/240x128/ccc/000?text=Logo+Error"; }}
                        />
          </div>
          <h1 className="text-xl md:text-2xl font-semibold text-slate-900">
            Welcome to Travler
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1 text-center">
            Sign in to plan, book, and manage your trips in one place.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none
                         focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <button
                type="button"
                className="text-xs font-medium text-teal-700 hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none
                         focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
              />
              <span>Remember me</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full mt-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white
                       font-semibold py-2.5 text-sm md:text-base transition"
          >
            Log in
          </button>

          <div className="text-center text-xs md:text-sm text-slate-500 mt-4">
            Don’t have an account?{" "}
            <button
              type="button"
              className="text-teal-700 font-semibold hover:underline"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
