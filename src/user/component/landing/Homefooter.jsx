import React from 'react'
import {Link} from 'react-router-dom'
import traveler_logo from '../../../assets/traveler_logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faInstagram, 
  faThreads, 
  faTiktok 
} from '@fortawesome/free-brands-svg-icons';



export default function Homefooter() {
  
  const handleNavigation = (url) => {
    window.location.href = url;
  }
  return (
     <footer className="bg-background-dark text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
             <div className="h-24  flex items-center overflow-hidden">
                                     {/* Updated Logo: Applying w-60 h-28 (240x112 pixels) and using variable traveler_logo */}
                                     <img 
                                         src={traveler_logo} // Using placeholder URL
                                         alt='traveler logo' 
                                         className="w-60 h-34 object-contain mb-2 rounded-lg"
                                     />
                                 </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-8">
              The world's leading marketplace for travel rentals. Gear, vehicles, and stays—all in one place for
              your convenience.
            </p>
            <div className="flex gap-4">
              
              {/* Facebook */}
              <div 
                onClick={() => handleNavigation('https://www.facebook.com/profile.php?id=61586668252389&mibextid=ZbWKwL')}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer"
              >
                <FontAwesomeIcon icon={faFacebookF} className="text-white text-sm" />
              </div>

              {/* Instagram */}
              <div 
                onClick={() => handleNavigation('https://www.instagram.com/traveler_pvtltd?igsh=ZzB1ZXV4cTdzZnd6')}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer"
              >
                <FontAwesomeIcon icon={faInstagram} className="text-white text-sm" />
              </div>

              {/* Threads */}
              <div 
                onClick={() => handleNavigation('https://www.threads.com/@traveler_pvtltd')}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer"
              >
                <FontAwesomeIcon icon={faThreads} className="text-white text-sm" />
              </div>

              {/* TikTok */}
              <div 
                onClick={() => handleNavigation('https://www.tiktok.com/@travler672?_r=1&_t=ZS-938urCNIs2X')}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer"
              >
                <FontAwesomeIcon icon={faTiktok} className="text-white text-sm" />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/about-us" className="hover:text-primary transition-colors">About Us</Link></li>
              
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/help-center" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><a className="hover:text-primary transition-colors" href="#">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Why Rent with Us</h4>
            <ul className="space-y-6">
              <li className="flex gap-3">
                <span className="material-icons-round text-green-500 text-xl">verified_user</span>
                <div>
                  <h5 className="font-bold text-sm">Verified Listings</h5>
                  <p className="text-xs text-gray-400">Every item checked for quality.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="material-icons-round text-primary text-xl">lock</span>
                <div>
                  <h5 className="font-bold text-sm">Secure Payments</h5>
                  <p className="text-xs text-gray-400">Your money is safe with us.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="material-icons-round text-yellow-500 text-xl">support_agent</span>
                <div>
                  <h5 className="font-bold text-sm">24/7 Support</h5>
                  <p className="text-xs text-gray-400">We're here whenever you need us.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Travler. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a className="hover:text-white transition-colors" href="#">Privacy</a>
            <a className="hover:text-white transition-colors" href="#">Terms</a>
            <a className="hover:text-white transition-colors" href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
