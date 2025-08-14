import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = ({ onRegister, existAccount }) => {
  const [form, setForm] = React.useState({ 
    name: '', 
    email: '', 
    password: '', 
    state: '' 
  });

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8 space-y-6 m-32">
      <h2 className="text-2xl font-bold text-gray-800 text-center">Créer un compte</h2>
      
      {existAccount && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          <p>Ce compte existe déjà. Veuillez vous connecter.</p>
        </div>
      )}

      <div className="space-y-4">
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Nom complet"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="État/Région"
          value={form.state}
          onChange={(e) => setForm({ ...form, state: e.target.value })}
        />
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Mot de passe"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </div>

      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        onClick={() => onRegister(form)}
      >
        S'inscrire
      </button>

      <p className="text-center text-sm text-gray-600">
        Déjà inscrit ?{' '}
        <Link
          to="/login"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Se connecter
        </Link>
      </p>
    </div>
  );
};

export default SignUp;


