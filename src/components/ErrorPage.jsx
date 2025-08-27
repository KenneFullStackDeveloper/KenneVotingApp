import { useRouteError, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaHome, FaRedo } from 'react-icons/fa';
import { RiErrorWarningFill } from 'react-icons/ri';

export default function ErrorPage() {
  const error = useRouteError();
  
  // Déterminer le type d'erreur pour un message personnalisé
  const getErrorDetails = () => {
    switch(error.status) {
      case 404:
        return {
          title: "Page non trouvée",
          message: "La page que vous recherchez n'existe pas ou a été déplacée.",
          icon: <RiErrorWarningFill className="text-yellow-500" />
        };
      case 403:
        return {
          title: "Accès refusé",
          message: "Vous n'avez pas les permissions nécessaires pour accéder à cette page.",
          icon: <FaExclamationTriangle className="text-red-500" />
        };
      case 500:
        return {
          title: "Erreur serveur",
          message: "Une erreur interne s'est produite. Notre équipe a été notifiée.",
          icon: <FaExclamationTriangle className="text-red-500" />
        };
      default:
        return {
          title: "Oups ! Une erreur est survenue",
          message: error.statusText || error.message || "Une erreur inattendue s'est produite.",
          icon: <FaExclamationTriangle className="text-blue-500" />
        };
    }
  };

  const errorDetails = getErrorDetails();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200"
      >
        {/* En-tête */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full backdrop-blur-sm"
          >
            <div className="text-3xl">
              {errorDetails.icon}
            </div>
          </motion.div>
          <h1 className="text-2xl font-bold text-white mt-4">{errorDetails.title}</h1>
        </div>

        {/* Contenu */}
        <div className="p-8 text-center">
          <p className="text-gray-600 mb-6 leading-relaxed">
            {errorDetails.message}
          </p>
          
          {error.status && (
            <div className="bg-gray-100 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-500">Code d'erreur</p>
              <p className="text-lg font-mono font-bold text-gray-800">{error.status}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/" 
                className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                <FaHome className="mr-2" />
                Retour à l'accueil
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button 
                onClick={() => window.location.reload()}
                className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FaRedo className="mr-2" />
                Réessayer
              </button>
            </motion.div>
          </div>
        </div>

        {/* Pied de page */}
        <div className="bg-gray-50 p-4 text-center border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Besoin d'aide ?{" "}
            <a 
              href="mailto:support@votesecure.com" 
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Contactez notre support
            </a>
          </p>
        </div>
      </motion.div>

      {/* Éléments décoratifs */}
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-200/30 rounded-full blur-2xl"></div>
      <div className="absolute top-10 right-10 w-32 h-32 bg-purple-200/30 rounded-full blur-2xl"></div>
    </div>
  );
}