import { Link } from 'react-router-dom';
import { 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin, 
  FaInstagram, 
  FaEnvelope, 
  FaPhone, 
  FaHeart,
  FaShieldAlt,
  FaLock,
  FaVoteYea
} from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300 pt-16 pb-8 px-4 relative overflow-hidden">
      {/* Élément décoratif */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
      
      {/* Pattern d'arrière-plan subtil */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Colonne Logo et description */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <div className="flex items-center space-x-2">
              <FaVoteYea className="text-blue-500 h-8 w-8" />
              <h2 className="text-2xl font-bold text-white">VoteSecure</h2>
            </div>
            <p className="text-sm leading-relaxed">
              La plateforme de vote électronique sécurisée pour des élections transparentes et fiables.
            </p>
            
            {/* Badge de sécurité */}
            <div className="flex items-center space-x-2 bg-gray-800/50 rounded-lg p-3 mt-4">
              <FaLock className="text-green-400 h-4 w-4" />
              <span className="text-xs font-medium text-green-400">Système certifié et sécurisé</span>
            </div>
            
            {/* Réseaux sociaux avec effets de survol colorés */}
            <div className="flex space-x-4 pt-4">
              {[
                { icon: FaFacebook, color: "#1877F2", label: "Facebook" },
                { icon: FaTwitter, color: "#1DA1F2", label: "Twitter" },
                { icon: FaLinkedin, color: "#0077B5", label: "LinkedIn" },
                { icon: FaInstagram, color: "#E4405F", label: "Instagram" }
              ].map((social, index) => (
                <motion.a 
                  key={index}
                  href="#" 
                  className="group relative"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <div className="relative p-2 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors">
                    <social.icon 
                      className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" 
                    />
                  </div>
                  <div 
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity" 
                    style={{ backgroundColor: social.color }}
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Colonne Navigation */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Navigation
            </h3>
            <ul className="space-y-3">
              {[
                { to: "/", text: "Accueil" },
                { to: "/elections", text: "Élections" },
                { to: "/dashboard", text: "Dashboard" },
                { to: "/login", text: "Connexion" },
                { to: "/contact", text: "Contact" },
                { to: "/results", text: "Résultats" }
              ].map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <Link 
                    to={link.to} 
                    className="flex items-center group hover:text-white transition-colors text-sm"
                  >
                    <span className="w-1 h-1 bg-gray-600 rounded-full mr-2 group-hover:bg-blue-400 transition-colors"></span>
                    {link.text}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Colonne Légal */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Informations
            </h3>
            <ul className="space-y-3">
              {[
                { to: "/about", text: "À propos" },
                { to: "/features", text: "Fonctionnalités" },
                { to: "/pricing", text: "Tarifs" },
                { to: "/privacy", text: "Confidentialité" },
                { to: "/terms", text: "Conditions d'utilisation" }
              ].map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <Link 
                    to={link.to} 
                    className="flex items-center group hover:text-white transition-colors text-sm"
                  >
                    <span className="w-1 h-1 bg-gray-600 rounded-full mr-2 group-hover:bg-blue-400 transition-colors"></span>
                    {link.text}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Colonne Contact */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Contact
            </h3>
            <div className="space-y-4">
              <motion.a 
                href="mailto:contact@votesecure.com" 
                className="flex items-center space-x-3 group hover:text-white transition-colors"
                whileHover={{ x: 5 }}
              >
                <div className="p-2 bg-blue-900/30 rounded-lg group-hover:bg-blue-900/50 transition-colors">
                  <FaEnvelope className="text-blue-400" />
                </div>
                <span className="text-sm">contact@votesecure.com</span>
              </motion.a>
              
              <motion.a 
                href="tel:+33123456789" 
                className="flex items-center space-x-3 group hover:text-white transition-colors"
                whileHover={{ x: 5 }}
              >
                <div className="p-2 bg-blue-900/30 rounded-lg group-hover:bg-blue-900/50 transition-colors">
                  <FaPhone className="text-blue-400" />
                </div>
                <span className="text-sm">+49 1573 0771362</span>
              </motion.a>
              
              <div className="pt-4">
                <p className="text-xs text-gray-500 mb-2">Notre engagement</p>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <FaShieldAlt className="text-green-400" />
                  <span>Sécurité de niveau bancaire</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-400 mt-1">
                  <FaLock className="text-green-400" />
                  <span>Chiffrement de bout en bout</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Copyright et mentions légales */}
        <motion.div 
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>© {currentYear} VoteSecure. Tous droits réservés.</span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center">
              Made with <FaHeart className="text-red-500 mx-1" /> in Allemagne
            </span>
          </div>
          
          <div className="flex items-center space-x-6 text-xs">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Politique de confidentialité
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Conditions d'utilisation
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}