import React from 'react'
import {Link} from 'react-router-dom'
import { menulinks } from '../assets/assets' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShop } from '@fortawesome/free-solid-svg-icons'
import TravelerLogo from './TravelerLogo'; // Assuming this component has the transition logic

export default function Navbar() {
    
    // isScrolled will be TRUE when scrolled down > 10px
 const [isScrolled, setIsScrolled] = React.useState(false); 
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
                        <svg className={`h-6 w-6 transition-all duration-500 ${!isScrolled ? "text-white" : "text-gray-700"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        
                        {/* Login Link */}
                        <Link to='/login' className={`px-8 py-2.5 rounded-full ml-4 transition-all duration-500 ${!isScrolled ? "bg-white text-black" : "text-white bg-[#217964]"}`}>
                            Login
                        </Link>
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