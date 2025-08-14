import React from 'react';
import { Link } from 'react-router-dom';

const SignIn = ({ onLogin }) => {
  const [login, setLogin] = React.useState({ email: '', password: '' });

  const loginWithGoogle = () => {
    window.location.href = "https://massive-primate-climbing.ngrok-free.app/loginwithgoogle";
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8 space-y-6 m-32">
      <h2 className="text-2xl font-bold text-gray-800 text-center">Connexion</h2>
      <p className="text-gray-600 text-sm text-center">
        Se connecter via email, Google ou numéro de téléphone
      </p>

      <div className="space-y-4">
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Email"
          type="email"
          value={login.email}
          onChange={(e) => setLogin({ ...login, email: e.target.value })}
        />
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Mot de passe"
          type="password"
          value={login.password}
          onChange={(e) => setLogin({ ...login, password: e.target.value })}
        />
      </div>

        <Link
          to="/reset-password"
          className="text-blue-600 hover:text-blue-800"
        >
          Mot de passe oublié ?
        </Link>
      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        onClick={() => onLogin(login)}
      >
        Se connecter
      </button>

      <div className="flex justify-between text-sm">
        <Link
          to="/register"
          className="text-blue-600 hover:text-blue-800"
        >
          Créer un compte
        </Link>
      </div>

      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-500">OU</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <button
        className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition duration-200"
        onClick={loginWithGoogle}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.786-1.667-4.167-2.698-6.735-2.698-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.496 10-10 0-0.671-0.068-1.325-0.182-1.977h-9.818z"/>
        </svg>
        Continuer avec Google
      </button>
    </div>
  );
};

export default SignIn;