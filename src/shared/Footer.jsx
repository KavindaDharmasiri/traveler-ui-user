import React from 'react'
import { Link } from 'react-router-dom';
import traveler_logo from '../assets/traveler_logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faInstagram, 
  faThreads, 
  faTiktok 
} from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
    // Placeholder image URL (80x80 pixels, matching the w-20 h-20 size)
    const traveler_logo_url = "https://placehold.co/80x80/217964/ffffff?text=LOGO";

  return (
        <div className='text-gray-500/80 pt-10 px-6 md:px-16 lg:px-24 xl:px-32'>
            <div className='flex flex-wrap items-start justify-between gap-12 md:gap-10'>
                <div className='max-w-80'>
                    
                    {/* Resized Logo: Applying w-20 h-20 (80x80 pixels) */}
                    <div className="h-24 flex items-center overflow-hidden">
                        {/* Updated Logo: Applying w-60 h-28 (240x112 pixels) and using variable traveler_logo */}
                        <img 
                            src={traveler_logo} // Using placeholder URL
                            alt='traveler logo' 
                            className="w-60 h-34 object-contain mb-2 rounded-lg"
                        />
                    </div>
                    
                    <p className='text-sm leading-6'>
                        The world's leading marketplace for travel rentals. Gear, vehicles, and stays—all in one place for
                        your convenience.
                    </p>
                    <div className='flex items-center gap-4 mt-5'>
                        {/* Facebook */}
                        <a href="#">
                            <FontAwesomeIcon 
                            icon={faFacebookF} 
                            className="w-6 h-6 text-gray-400 hover:text-gray-800 transition-colors cursor-pointer" 
                            />
                        </a>

                        {/* Instagram */}
                        <a href="#">
                            <FontAwesomeIcon 
                            icon={faInstagram} 
                            className="w-6 h-6 text-gray-400 hover:text-gray-800 transition-colors cursor-pointer" 
                            />
                        </a>

                        {/* Threads */}
                        <a href="#">
                            <FontAwesomeIcon 
                            icon={faThreads} 
                            className="w-6 h-6 text-gray-400 hover:text-gray-800 transition-colors cursor-pointer" 
                            />
                        </a>

                        {/* TikTok */}
                        <a href="#">
                            <FontAwesomeIcon 
                            icon={faTiktok} 
                            className="w-6 h-6 text-gray-400 hover:text-gray-800 transition-colors cursor-pointer" 
                            />
                        </a>
                    </div>
                </div>

                <div className='min-w-[160px]'>
                    <p className='text-lg text-gray-800 font-semibold'>COMPANY</p>
                    <ul className='mt-4 flex flex-col gap-2 text-sm'>
                        <li><Link to="/about-us" className='hover:text-gray-800 transition-colors'>About</Link></li>
{/*                         <li><a href="#" className='hover:text-gray-800 transition-colors'>Careers</a></li>
                        <li><a href="#" className='hover:text-gray-800 transition-colors'>Press</a></li>
                        <li><a href="#" className='hover:text-gray-800 transition-colors'>Blog</a></li>
                        <li><a href="#" className='hover:text-gray-800 transition-colors'>Partners</a></li> */}
                    </ul>
                </div>

                <div className='min-w-[160px]'>
                    <p className='text-lg text-gray-800 font-semibold'>SUPPORT</p>
                    <ul className='mt-4 flex flex-col gap-2 text-sm'>
                        <li><a href="#" className='hover:text-gray-800 transition-colors'>Help Center</a></li>
{/*                         <li><a href="#" className='hover:text-gray-800 transition-colors'>Safety Information</a></li>
                        <li><a href="#" className='hover:text-gray-800 transition-colors'>Cancellation Options</a></li> */}
                        <li><a href="#" className='hover:text-gray-800 transition-colors'>Contact Us</a></li>
{/*                         <li><a href="#" className='hover:text-gray-800 transition-colors'>Accessibility</a></li> */}
                    </ul>
                </div>

              
                
            </div>
            <hr className='border-gray-300 mt-10' />
            <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-6 text-sm'>
                    <p>© {new Date().getFullYear()} <a href="https://prebuiltui.com" className='hover:text-gray-800 transition-colors'>Travler</a>. All rights reserved.</p>
{/*                 <ul className='flex items-center gap-4'>
                    <li><a href="#" className='hover:text-gray-800 transition-colors'>Privacy</a></li>
                    <li><a href="#" className='hover:text-gray-800 transition-colors'>Terms</a></li>
                    <li><a href="#" className='hover:text-gray-800 transition-colors'>Sitemap</a></li>
                </ul> */}
            </div>
        </div>

  )
}
