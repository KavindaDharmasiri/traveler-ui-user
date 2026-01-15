import React from 'react'

export default function Homefooter() {
  return (
     <footer className="bg-background-dark text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-icons-round text-primary text-3xl">terrain</span>
              <span className="text-xl font-bold tracking-tight">TravelMarket</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-8">
              The world's leading marketplace for travel rentals. Gear, vehicles, and stays—all in one place for
              your convenience.
            </p>
            <div className="flex gap-4">
              <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors" href="#">
                <span className="material-icons-round text-white text-sm">public</span>
              </a>
              <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors" href="#">
                <span className="material-icons-round text-white text-sm">email</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a className="hover:text-primary transition-colors" href="#">About Us</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Blog</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Press</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a className="hover:text-primary transition-colors" href="#">Help Center</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Safety Information</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Cancellation Options</a></li>
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
          <p>© 2023 TravelMarket Inc. All rights reserved.</p>
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
