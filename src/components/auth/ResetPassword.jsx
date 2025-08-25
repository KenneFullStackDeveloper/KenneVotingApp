import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

const ResetPassword = ({ onReset, isLoading = false, successMessage = '', errorMessage = '' }) => {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    if (!email.trim()) return 'L\'email est requis';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Veuillez entrer une adresse email valide';
    return '';
  };

  const handleBlur = () => {
    setTouched(true);
    const validationError = validateEmail(email);
    setError(validationError);
  };

  const handleChange = (value) => {
    setEmail(value);
    if (touched) {
      setError(validateEmail(value));
    }
  };

  const handleSubmit = () => {
    setTouched(true);
    const validationError = validateEmail(email);
    setError(validationError);
    
    if (!validationError) {
      onReset(email);
    }
  };

  const getInputClass = () => {
    let classes = "w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all duration-200 ";
    
    if (touched) {
      if (error) {
        classes += "border-red-400 focus:ring-red-100 bg-red-25";
      } else {
        classes += "border-green-500 focus:ring-green-100 bg-green-25";
      }
    } else {
      classes += "border-gray-300 focus:ring-blue-100 focus:border-blue-400";
    }
    
    return classes;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden p-8 space-y-6 border border-gray-100">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 shadow-inner">
            <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Mot de passe oublié
          </h2>
          <p className="mt-2 text-gray-600">
            Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
          </p>
        </div>

        {/* Message de succès */}
        {successMessage && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-md flex items-start shadow-sm">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="font-medium text-green-800">Email envoyé!</p>
              <p className="text-green-700 text-sm mt-1">{successMessage}</p>
            </div>
          </div>
        )}

        {/* Message d'erreur */}
        {errorMessage && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md flex items-start shadow-sm">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="font-medium text-red-800">Erreur</p>
              <p className="text-red-700 text-sm mt-1">{errorMessage}</p>
            </div>
          </div>
        )}

        {!successMessage && (
          <>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  className={getInputClass()}
                  placeholder="exemple@domaine.com"
                  type="email"
                  value={email}
                  onChange={(e) => handleChange(e.target.value)}
                  onBlur={handleBlur}
                  disabled={isLoading || !!successMessage}
                />
                {touched && !error && (
                  <CheckCircle className="h-5 w-5 text-green-500 absolute right-3 top-3.5" />
                )}
              </div>
              {touched && error && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {error}
                </p>
              )}
            </div>

            <button
              className={`w-full py-3 px-4 rounded-lg shadow-md transition duration-200 ease-in-out ${
                isLoading || !!successMessage
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium hover:shadow-lg transform hover:-translate-y-0.5'
              }`}
              onClick={handleSubmit}
              disabled={isLoading || !!successMessage}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Envoi en cours...
                </div>
              ) : (
                "Envoyer le lien de réinitialisation"
              )}
            </button>
          </>
        )}

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="inline-flex items-center text-sm text-blue-500 hover:text-blue-700 font-medium transition-colors hover:underline"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Retour à la page de connexion
          </Link>
        </div>

        <div className="border-t border-gray-200 pt-4 mt-4">
          <p className="text-xs text-gray-500 text-center">
            Vous ne recevez pas l'email? Vérifiez votre dossier spam ou{' '}
            <button 
              onClick={() => onReset(email)} 
              disabled={isLoading || !email}
              className="text-blue-500 hover:text-blue-700 hover:underline font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              renvoyer l'email
            </button>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;