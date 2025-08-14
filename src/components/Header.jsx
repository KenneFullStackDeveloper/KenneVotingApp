import { HiOutlineMenu, HiX } from 'react-icons/hi';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaVoteYea } from 'react-icons/fa';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Accueil" },
    { path: "/elections", label: "Élections" },
    { path: "/results", label: "Résultats" },
    { path: "/admin", label: "Administration" },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <FaVoteYea className="text-blue-600 h-8 w-8 md:h-9 md:w-9" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              VoteSecure
            </span>
          </Link>
         
          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === link.path 
                    ? 'text-blue-600 font-medium bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Bouton de connexion - Positionné à droite */}
            <div className="ml-6 pl-6 border-l border-gray-200">
              <Link 
                to="/login" 
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-5 py-2.5 rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg flex items-center space-x-2"
              >
                <span>Se connecter</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </Link>
            </div>
          </nav>

          {/* Bouton Menu Mobile */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none p-2 transition-colors"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {menuOpen ? (
              <HiX className="w-6 h-6" />
            ) : (
              <HiOutlineMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-xl pb-6 px-6 border-t border-gray-100"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 rounded-lg ${
                    location.pathname === link.path 
                      ? 'bg-blue-100 text-blue-600 font-medium' 
                      : 'text-gray-700 hover:bg-blue-50'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/login"
                className="mt-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-6 rounded-lg text-center font-medium shadow-md"
                onClick={() => setMenuOpen(false)}
              >
                Se connecter
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}