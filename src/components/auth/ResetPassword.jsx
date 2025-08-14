import React from 'react';
import { Link } from 'react-router-dom';

const ResetPassword = ({ onReset, onNavigateToSignIn }) => {
  const [email, setEmail] = React.useState('');

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8 space-y-6 m-32">
      <h2 className="text-2xl font-bold text-gray-800 text-center">Forgot Password ?</h2>
      <p className="text-gray-600 text-center">
        Enter your email address below and we will send you a link to reset your password.
      </p>

      <input
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Email address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      
      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        onClick={() => onReset(email)}
      >
        Envoyer le lien de réinitialisation
      </button>

      
      <div className="mt-6 text-center text-sm text-gray-400">
                <p>
                  <Link 
                    to="/login" 
                    className="font-medium w-full text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    ← Retour à la page de connexion
                  </Link>
                </p>
      </div>
    </div>
  );
};

export default ResetPassword;