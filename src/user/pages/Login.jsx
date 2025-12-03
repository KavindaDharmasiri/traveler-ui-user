// src/pages/Login.jsx
import React, { useRef, useState, useEffect } from "react"
import traveler_logo from "../../assets/traveler_logo.png"
import useAuth from "../hooks/useAuth"
import { Link, useNavigate, useLocation } from "react-router-dom"
import axios from "../api/axios"
import { API_CONFIG } from "../../config/environment"
import { NAVIGATION_CONFIG } from "../../config/navigation"
import Swal from 'sweetalert2'

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
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
 

  useEffect(() => {
    userRef.current.focus();
    // Load saved credentials if remember me was checked
    const savedEmail = localStorage.getItem('rememberedEmail');
    const savedRememberMe = localStorage.getItem('rememberMe') === 'true';
    if (savedEmail && savedRememberMe) {
      setUser(savedEmail);
      setRememberMe(true);
    }
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

      const { accessToken, refreshToken, tokenType, userId, email, type, name, tenantId, country } = response.data;
      
      // Validate required fields before proceeding
      if (!accessToken || !type || !email) {
        throw new Error('Invalid login response - missing required data');
      }
      
      // Save to localStorage only after validation
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('tokenType', tokenType);
      localStorage.setItem('userId', userId);
      localStorage.setItem('email', email);
      localStorage.setItem('name', name);
      localStorage.setItem('tenantId', tenantId);
      localStorage.setItem('type', type);
      localStorage.setItem('country', country);

      setAuthState({ user: email, accessToken, tenantId });
      
      // Handle Remember Me
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberMe');
      }
      
      setUser("");
      setPassword("");

      // Navigate based on user type - only after all validation passes
      if (type === 'TRAVELLER') {
        navigate('/provider', { replace: true });
      } else if (type === 'SERVICE_PROVIDER') {
        console.log('provider login')
        const authData = {
          accessToken,
          refreshToken,
          tokenType,
          userId,
          email,
          name,
          tenantId,
          type,
          country
        };
        const params = new URLSearchParams(authData).toString();
        window.location.href = `${NAVIGATION_CONFIG.TRAVELLER_APP_PROVIDER_URL}?${params}`;
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.log("AXIOS ERROR:", err);
      console.log("AXIOS ERROR.response:", err?.response);

      let errorMessage = "Login Failed";
      
      if (!err?.response) {
        errorMessage = "No Server Response";
      } else if (err.response?.status === 400) {
        errorMessage = "Missing Username or Password";
      } else if (err.response?.status === 401) {
        errorMessage = "Invalid credentials";
      } else if (err.response?.status === 404) {
        errorMessage = "User Not Found";
      }

      setErrMsg(errorMessage);

      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: errorMessage,
        confirmButtonColor: '#0f766e'
      });
      
      return;
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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                className="w-full rounded-xl border px-3 py-2.5 pr-10 text-sm outline-none border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464m1.414 1.414L8.464 8.464m5.656 5.656l1.415 1.415m-1.415-1.415l1.415 1.415M14.828 14.828L16.243 16.243" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
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
            <button type="button" onClick={() => navigate("/signup")} className="text-teal-700 font-semibold hover:underline">
              Sign up
            </button>
          </div>
          

        </form>
      </div>
    </div>
  )
}
