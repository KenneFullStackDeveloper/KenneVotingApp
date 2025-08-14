import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Colonne Logo et description */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">VoteSecure</h2>
            <p className="text-sm">
              La solution tout-en-un pour organiser vos élections en ligne en toute confiance.
            </p>
            
            {/* Réseaux sociaux avec effets de survol colorés */}
            <div className="flex space-x-4 pt-2">
              <a href="#" className="group">
                <FaFacebook className="h-5 w-5 text-gray-400 group-hover:text-[#1877F2] transition-colors" />
              </a>
              <a href="#" className="group">
                <FaTwitter className="h-5 w-5 text-gray-400 group-hover:text-[#1DA1F2] transition-colors" />
              </a>
              <a href="#" className="group">
                <FaLinkedin className="h-5 w-5 text-gray-400 group-hover:text-[#0077B5] transition-colors" />
              </a>
              <a href="#" className="group">
                <FaInstagram className="h-5 w-5 text-gray-400 group-hover:text-[#E4405F] transition-colors" />
              </a>
            </div>
          </div>

          {/* Colonne Navigation */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Navigation</h3>
            <ul className="space-y-2">
              <FooterLink to="/" text="Accueil" />
              <FooterLink to="/elections" text="Élections" />
              <FooterLink to="/dashboard" text="Dashboard" />
              <FooterLink to="/login" text="Connexion" />
              <FooterLink to="/contact" text="contact" />
              <FooterLink to="/results" text="Résultats" />
            </ul>
          </div>

          {/* Colonne Légal */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Légal</h3>
            <ul className="space-y-2">
              <FooterLink to="/privacy" text="Confidentialité" />
              <FooterLink to="/terms" text="Conditions d'utilisation" />
            </ul>
          </div>

          {/* Colonne Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-gray-400" />
                <a href="mailto:contact@voteapp.com" className="hover:text-white transition-colors">
                  contact@voteapp.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <FaPhone className="text-gray-400" />
                <a href="tel:+33123456789" className="hover:text-white transition-colors">
                  +33 1 23 45 67 89
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} VoteApp. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

// Composant réutilisable pour les liens
function FooterLink({ to, text }) {
  return (
    <li>
      <Link 
        to={to} 
        className="hover:text-white transition-colors"
      >
        {text}
      </Link>
    </li>
  );
}