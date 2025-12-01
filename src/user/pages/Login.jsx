// src/pages/Login.jsx
import React, { useRef, useState, useEffect } from "react"
import traveler_logo from "../../assets/traveler_logo.png"
import useAuth from "../hooks/useAuth"
import { Link, useNavigate, useLocation } from "react-router-dom"
import axios from "../api/axios"
import { API_CONFIG } from "../../config/environment"

export default function Login() {
  const { setAuthState } = useAuth();
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  
  const userRef = useRef();
  const errorRef = useRef();

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
 

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [user, password])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");

    try {
      const response = await axios.post(
        API_CONFIG.ENDPOINTS.AUTH.LOGIN,
        {
          email: user,
          password: password
        }
      );

      console.log("LOGIN RESPONSE:", response.data);

      const { accessToken, refreshToken, tokenType, userId, email, name, tenantId } = response.data;
      
      // Save to localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('tokenType', tokenType);
      localStorage.setItem('userId', userId);
      localStorage.setItem('email', email);
      localStorage.setItem('name', name);
      localStorage.setItem('tenantId', tenantId);

      setAuthState({ user: email, accessToken, tenantId });
      setUser("");
      setPassword("");

      navigate(from, { replace: true });
    } catch (err) {
      console.log("AXIOS ERROR:", err);
      console.log("AXIOS ERROR.response:", err?.response);

      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Invalid credentials");
      } else if (err.response?.status === 404) {
        setErrMsg("User Not Found");
      } else {
        setErrMsg("Login Failed");
      }

      errorRef.current?.focus();
    }
  };


  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 md:p-10">
        
        {/* Logo section */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-24 w-full flex items-center justify-center overflow-hidden border-b border-gray-100 mb-4">
            <img
              src={traveler_logo}
              alt="traveler logo"
              className="w-60 h-32 object-contain rounded-lg transition-transform hover:scale-105 duration-500"
            />
          </div>
          <h1 className="text-xl md:text-2xl font-semibold text-slate-900">
            Welcome to Travler
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1 text-center">
            Sign in to plan, book, and manage your trips in one place.
          </p>
        </div>

        {/* Form (static version, no JS) */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              id="email"
              placeholder="youremail@example.com"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
              <button type="button" className="text-xs font-medium text-teal-700 hover:underline">
                Forgot password?
              </button>
            </div>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
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
            className="w-full mt-2 rounded-xl text-white font-semibold py-2.5 text-sm md:text-base bg-teal-600 hover:bg-teal-700 transition"
          >
            Log in
          </button>

          <p ref={errorRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

          <div className="text-center text-xs md:text-sm text-slate-500 mt-4">
            Don’t have an account?{' '}
            <button type="button" className="text-teal-700 font-semibold hover:underline">
              Sign up
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}
