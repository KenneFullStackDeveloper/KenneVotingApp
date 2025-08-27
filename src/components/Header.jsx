import { HiOutlineMenu, HiX } from 'react-icons/hi';
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaVoteYea, FaUser, FaCog, FaSignInAlt } from 'react-icons/fa';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuOpen(false);
    setAdminDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le dropdown en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAdminDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { path: "/", label: "Accueil" },
    { path: "/elections", label: "Élections" },
    { path: "/results", label: "Résultats" },
    { path: "/admin", label: "Admin", dropdown: true },
  ];

  const adminMenuItems = [
    { path: "/admin/ajouter-utilisateur", label: "Ajouter utilisateur", icon: <FaUser className="h-4 w-4" /> },
    { path: "/admin/creer-election", label: "Créer une élection", icon: <FaCog className="h-4 w-4" /> },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo avec animation */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaVoteYea className="text-blue-600 h-8 w-8 md:h-9 md:w-9 transition-colors group-hover:text-blue-700" />
            </motion.div>
            <motion.span 
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent"
              whileHover={{ scale: 1.02 }}
            >
              VoteSecure
            </motion.span>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div key={link.path} className="relative" ref={dropdownRef}>
                {link.dropdown ? (
                  <>
                    <button
                      onClick={() => setAdminDropdownOpen(!adminDropdownOpen)}
                      className={`relative px-4 py-2.5 rounded-lg transition-all duration-200 flex items-center space-x-1 ${
                        location.pathname.startsWith(link.path) || adminDropdownOpen
                          ? 'text-blue-600 font-medium bg-blue-50' 
                          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                      }`}
                    >
                      <span>{link.label}</span>
                      <motion.svg 
                        className="w-4 h-4" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth={2} 
                        viewBox="0 0 24 24"
                        animate={{ rotate: adminDropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </button>

                    <AnimatePresence>
                      {adminDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-2 w-56 bg-white shadow-xl rounded-lg py-2 z-50 border border-gray-100"
                        >
                          {adminMenuItems.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                              onClick={() => setAdminDropdownOpen(false)}
                            >
                              <span className="mr-3 text-blue-500">{item.icon}</span>
                              <span>{item.label}</span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    to={link.path}
                    className={`relative px-4 py-2.5 rounded-lg transition-all duration-200 ${
                      location.pathname === link.path 
                        ? 'text-blue-600 font-medium bg-blue-50' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                    }`}
                  >
                    {link.label}
                    {location.pathname === link.path && (
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full"
                        layoutId="activeTab"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                )}
              </div>
            ))}
            
            {/* Bouton de connexion */}
            <div className="ml-4 pl-4 border-l border-gray-200">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link 
                  to="/login" 
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-5 py-2.5 rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg flex items-center space-x-2 group"
                >
                  <span>Se connecter</span>
                  <FaSignInAlt className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            </div>
          </nav>

          {/* Bouton Menu Mobile */}
          <motion.button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none p-2 transition-colors"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            whileTap={{ scale: 0.95 }}
          >
            {menuOpen ? (
              <HiX className="w-6 h-6" />
            ) : (
              <HiOutlineMenu className="w-6 h-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Menu Mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-xl border-t border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col py-4 px-4 space-y-1">
              {navLinks.map((link) => {
                if (link.dropdown) {
                  return (
                    <div key={link.path} className="flex flex-col space-y-1">
                      <span className="px-4 py-3 text-gray-700 font-medium text-sm uppercase tracking-wide text-gray-500">
                        Admin
                      </span>
                      {adminMenuItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="flex items-center pl-6 pr-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          onClick={() => setMenuOpen(false)}
                        >
                          <span className="mr-3 text-blue-500">{item.icon}</span>
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center"
                    onClick={() => setMenuOpen(false)}
                  >
                    {location.pathname === link.path && (
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></div>
                    )}
                    <span className={location.pathname === link.path ? "font-medium" : ""}>
                      {link.label}
                    </span>
                  </Link>
                );
              })}

              {/* Séparateur */}
              <div className="border-t border-gray-200 my-2"></div>

              {/* Connexion Mobile */}
              <motion.div whileTap={{ scale: 0.98 }} className="px-2 pt-2">
                <Link
                  to="/login"
                  className="flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-6 rounded-lg font-medium shadow-md hover:shadow-lg transition-shadow"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaSignInAlt className="mr-2" />
                  Se connecter
                </Link>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}