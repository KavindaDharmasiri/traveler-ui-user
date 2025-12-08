import React from 'react'
import {Link} from 'react-router-dom'
import { menulinks } from '../assets/assets' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShop,faBagShopping,faBell,faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import TravelerLogo from './TravelerLogo';
import axios from '../user/api/axios';
import { useCart } from '../user/component/cart/CartContext';
import { useNotifications } from '../user/component/notification/NotificationContext';
import Swal from 'sweetalert2';


export default function Navbar() {
    
    // isScrolled will be TRUE when scrolled down > 10px
 const [isScrolled, setIsScrolled] = React.useState(false); 
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const { setIsOpen, cartItems } = useCart();
    const itemCount = cartItems.length;

    
    const { setIsOpen: openNotif, newCount } = useNotifications();

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10); 
        };
        
        window.addEventListener("scroll", handleScroll);
        handleScroll(); 
        
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Define the class sets for clarity
    const scrolledDownClasses = "bg-white/80 shadow-md text-gray-700 backdrop-blur-3xl py-3 md:py-4"; // White/Blurred look
    const atTopClasses = "bg-[#217964] text-white py-4 md:py-6"; // Green look

    // Determine the HEX color for the Logo based on the scroll state
    const logoFillColor = isScrolled ? '#217964' : '#ffffff';

    return (
        <>
            <nav 
                // Removed px-... padding here to allow the logo to be flush left
                className={`fixed top-0 left-0 w-full flex items-center justify-between transition-all duration-500 z-50 ${isScrolled ? scrolledDownClasses : atTopClasses}`}
            >
                
                {/* 📸 LOGO RENDERING: Stays outside the padded container to hug the left edge */}
                <Link to="/" className='flex items-start'>
                    <TravelerLogo
                        alt="Traveler App Logo" 
                        logoFillColor={logoFillColor}
                        isScrolled={isScrolled} 
                    />
                </Link>

                {/* Wrapper for the rest of the content (links, buttons, icons) 
                    Applies the necessary padding and spacing for the right side of the Navbar. 
                */}
                <div className="flex items-center justify-between w-full px-4 md:px-16 lg:px-24 xl:px-32">
                    
                    {/* Desktop Nav Group (Links) */}
                    <div className="hidden md:flex items-center gap-4 lg:gap-8">
                        {menulinks.map((link, i) => (
                            <Link 
                                key={i} 
                                to={link.path} 
                                className={`group flex flex-col gap-0.5 ${!isScrolled ? "text-white" : "text-gray-700"}`} 
                            >
                                {link.name}
                                <div className={`${!isScrolled ? "bg-white" : "bg-[#217964]"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
                            </Link>
                        ))}
                        
                        {/* Become Provider Button */}
                        <button className={`flex items-center gap-2 border pl-1 pr-2 py-1 text-sm font-light rounded-full cursor-pointer ${!isScrolled ? 'border-white text-white' : 'border-gray-700 text-black'} transition-all`}>
                            <div className="w-10 h-10 bg-white text-[#217964] rounded-full flex items-center justify-center "> 
                                <FontAwesomeIcon icon={faShop} size="lg" />
                            </div>
                            <div className='flex items-center'>
                                Become Provider
                            </div>
                        </button>
                    </div>

                    {/* Desktop Right */}
                    <div className="hidden md:flex items-center gap-4">
                        {/* Search Icon - Color Swaps */}
                        <div className={` cursor-pointer ${!isScrolled ? "text-white hover:opacity-50 transition-opacity" : "text-gray-700 hover:text-[#217964]"}`} >
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </div>
                        <div
                            onClick={() => setIsOpen(true)}
                            className={`relative cursor-pointer ${
                                !isScrolled
                                ? "text-white hover:opacity-50 transition-opacity"
                                : "text-gray-700 hover:text-[#217964]"
                            }`}
                            >
                            <FontAwesomeIcon icon={faBagShopping} />
                            <span className="absolute -bottom-2 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                                {itemCount}
                            </span>
                        </div>
                        <div className={`relative cursor-pointer ${!isScrolled ? "text-white hover:opacity-50 transition-opacity" : "text-gray-700 hover:text-[#217964]"}`} onClick={() => openNotif(true)}>
                            <FontAwesomeIcon icon={faBell} />
                           {newCount > 0 && (
                            <span className="absolute -bottom-2 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                                {newCount}
                            </span>
                            )}
                        </div>
                        
                        {/* Login Link */}
                        {localStorage.getItem('accessToken') ? (
                            <div className="relative ml-4 user-avatar-container">
                                <div 
                                    className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const menu = document.getElementById('userMenu');
                                        menu.classList.toggle('hidden');
                                    }}
                                >
                                    <img
                                        src={`https://placehold.co/32x32/${!isScrolled ? 'FFFFFF' : '0F766E'}/${!isScrolled ? '0F766E' : 'FFFFFF'}?text=${(localStorage.getItem('name') || 'U').charAt(0).toUpperCase()}`}
                                        alt="User Avatar"
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <div className="text-left">
                                        <p className={`text-sm font-medium ${!isScrolled ? "text-white" : "text-gray-800"}`}>{localStorage.getItem('name') || 'User'}</p>
                                        <p className={`text-xs ${!isScrolled ? "text-white/80" : "text-gray-500"}`}>{localStorage.getItem('type') === 'SERVICE_PROVIDER' ? 'Provider' : 'Traveller'}</p>
                                    </div>
                                </div>
                                
                                <div 
                                    id="userMenu" 
                                    className="hidden absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <button 
                                        onClick={() => {
                                            Swal.fire({
                                                icon: 'question',
                                                title: 'Logout',
                                                text: 'Are you sure you want to logout?',
                                                showCancelButton: true,
                                                confirmButtonText: 'Yes, logout',
                                                cancelButtonText: 'Cancel',
                                                confirmButtonColor: '#0f766e',
                                                cancelButtonColor: '#6b7280'
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    const refreshToken = localStorage.getItem('refreshToken');
                                                    localStorage.clear();
                                                    window.location.href = '/login';
                                                    
                                                    if (refreshToken) {
                                                        axios.post(`auth/logout?refreshToken=${refreshToken}`).catch(error => {
                                                            console.error('Logout error:', error);
                                                        });
                                                    }
                                                }
                                            });
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                    >
                                        Log Out
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link to='/login' className={`px-8 py-2.5 rounded-full ml-4 transition-all duration-500 ${!isScrolled ? "bg-white text-black" : "text-white bg-[#217964]"}`}>
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-3 md:hidden">
                        {/* The menu button is spaced using the wrapper's padding */}
                        <svg onClick={() => setIsMenuOpen(!isMenuOpen)} className={`h-6 w-6 cursor-pointer transition-all duration-500 ${!isScrolled ? "text-white" : "text-gray-700"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <line x1="4" y1="6" x2="20" y2="6" />
                            <line x1="4" y1="12" x2="20" y2="12" />
                            <line x1="4" y1="18" x2="20" y2="18" />
                        </svg>
                    </div>
                </div> 
                {/* End of padded content wrapper */}

                {/* Mobile Menu */}
                <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 z-50 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>

                    {menulinks.map((link, i) => (
                        <Link key={i} to={link.path} className='group relative inline-block' onClick={() => setIsMenuOpen(false)}>
                            {link.name}
                            <span className="block h-0.5 bg-[#217964] absolute bottom-0 left-0 w-full transition-transform duration-300 ease-out scale-x-0 group-hover:scale-x-100 origin-left"></span>
                        </Link>
                    ))}

                   <Link to='/login' className="bg-[#217964] text-white px-8 py-2.5 rounded-full transition-all duration-500" onClick={() => setIsMenuOpen(false)}>
                        Login
                    </Link>
                </div>
            </nav>
            <div className='h-[70px] md:h-[90px]'></div>
        </>
    );
}
