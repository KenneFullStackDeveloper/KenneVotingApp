import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaVoteYea } from 'react-icons/fa'; 
import { Eye, EyeOff, AlertCircle, CheckCircle, Shield, Vote, UserCheck, X, Check } from 'lucide-react';

const SignUp = ({ onRegister, existAccount }) => {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    state: '' ,
    electionName:''
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    state: '',
    electionName: ''
  });
  
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    state: false,
    electionName:false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading ,setIsLoading] = useState(false)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordMinLength = 8;
   

  
   

   const handleRegister = async (form) => {
    try {
              const response = await fetch("https://e7051f5f50c8.ngrok-free.app/registration", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: form.name,
                  email: form.email,
                  password: form.password,
                  state: form.state,
                  electionName: form.electionName,
                  roles: 'user'
                }),
              });

                if (!response.ok){
                    alert("error lors de la creation d'election contacter le service")
                    const errorData = await response.json();
                    console.error('API Error:', errorData);
                    throw new Error(`HTTP error! status: ${response.status}`);
                
                }

              const result = await response.json();
              setIsLoading(true)
              setTimeout(() => {
                 // remet le button au status initial
                 setIsLoading(false)
              },1000) 
              
             
              return result

        } catch (error) {
              console.error("Error during registry :", error);
         
          }
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    validateField(field, form[field]);
  };

  const validateField = (field, value) => {
    let error = '';
    
    switch(field) {
      case 'name':
        if (!value.trim()) error = 'Le nom est requis';
        else if (value.trim().length < 2) error = 'Le nom doit contenir au moins 2 caractères';
        break;
      case 'email':
        if (!value.trim()) error = 'L\'email est requis';
        else if (!emailRegex.test(value)) error = 'Veuillez entrer une adresse email valide';
        break;
      case 'password':
        if (!value) error = 'Le mot de passe est requis';
        else if (value.length < passwordMinLength) error = `Le mot de passe doit contenir au moins ${passwordMinLength} caractères`;
        else if (!/(?=.*[a-z])/.test(value)) error = 'Le mot de passe doit contenir au moins une minuscule';
        else if (!/(?=.*[A-Z])/.test(value)) error = 'Le mot de passe doit contenir au moins une majuscule';
        else if (!/(?=.*\d)/.test(value)) error = 'Le mot de passe doit contenir au moins un chiffre';
        else if (!/(?=.*[@$!%*?&])/.test(value)) error = 'Le mot de passe doit contenir au moins un caractère spécial';
        break;
      case 'state':
        if (!value.trim()) error = 'La région est requise';
        else if (value.trim().length < 2) error = 'Veuillez entrer une région valide';
        break;
      case 'elctionName':
        if (!value.trim()) error = 'Le nom est requis';
        else if (value.trim().length < 2) error = 'Le nom doit contenir au moins 2 caractères';
        break;
      default:
        break;
    }
    
    setErrors({ ...errors, [field]: error });
    return error === '';
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    
    // Réinitialiser les messages d'erreur serveur quand l'utilisateur modifie le formulaire
    if (serverError) setServerError('');
    if (successMessage) setSuccessMessage('');
    
    // Valider au fur et à mesure si le champ a déjà été touché
    if (touched[field] || submitAttempted) {
      validateField(field, value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);
    setServerError('');
    setSuccessMessage('');
    
    // Valider tous les champs
    const isNameValid = validateField('name', form.name);
    const isEmailValid = validateField('email', form.email);
    const isPasswordValid = validateField('password', form.password);
    const isStateValid = validateField('state', form.state);
    const isElectionNameValid = validateField('state', form.electionName);

    if (isNameValid && isEmailValid && isPasswordValid && isStateValid &&isElectionNameValid) {
      try {
        // Appel de la fonction handleRegister qui save les info du user dans la db et  devrait retourner une promesse
        //const result = await onRegister(form);
        console.log("mypassform",form["password"])
        const result = await handleRegister(form)
        
        // Si l'inscription réussit
        if (result && result.success) {
          setSuccessMessage(result.message || 'Votre compte a été créé avec succès! Un email de confirmation a été envoyé.');
          // Réinitialiser le formulaire après un succès
          setForm({ name: '', email: '', password: '', state: '' });
          setTouched({ name: false, email: false, password: false, state: false });
          setSubmitAttempted(false);
        }
      } catch (error) {
        // Gestion des erreurs de l'API
        console.error('Erreur lors de l\'inscription:', error);
        setServerError(
          error.response?.data?.message || 
          error.message || 
          'Une erreur est survenue lors de la création de votre compte. Veuillez réessayer.'
        );
      }
    }
  };

  const getInputClass = (field) => {
    let classes = "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all duration-200 ";
    
    if (touched[field] || submitAttempted) {
      if (errors[field]) {
        classes += "border-red-400 focus:ring-red-100 bg-red-25";
      } else {
        classes += "border-green-500 focus:ring-green-100 bg-green-25";
      }
    } else {
      classes += "border-gray-300 focus:ring-blue-100 focus:border-blue-400";
    }
    
    return classes;
  };

  const isFormValid = () => {
    return Object.values(errors).every(error => error === '') && 
           Object.values(form).every(value => value.trim() !== '');
  };

  // Fonction pour fermer les messages d'alerte
  const closeErrorAlert = () => setServerError('');
  const closeSuccessAlert = () => setSuccessMessage('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden p-8 space-y-6 border border-gray-100">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 shadow-inner">
                        <FaVoteYea className="text-blue-600 h-8 w-8 md:h-9 md:w-9" />
            
          </div>
          <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Créer un compte
          </h2>
          <p className="mt-2 text-gray-600 flex items-center justify-center">
            <UserCheck className="h-4 w-4 mr-1 text-blue-500" />
            Rejoignez notre plateforme de vote démocratique
          </p>
        </div>
        
        {/* Message de succès */}
        {successMessage && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-md flex items-start shadow-sm relative">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
            <div className="pr-6">
              <p className="font-medium text-green-800">Succès!</p>
              <p className="text-green-700 text-sm mt-1">{successMessage}</p>
            </div>
            <button 
              onClick={closeSuccessAlert}
              className="absolute top-3 right-3 text-green-500 hover:text-green-700"
              aria-label="Fermer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        
        {/* Message d'erreur serveur */}
        {serverError && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md flex items-start shadow-sm relative">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
            <div className="pr-6">
              <p className="font-medium text-red-800">Erreur</p>
              <p className="text-red-700 text-sm mt-1">{serverError}</p>
            </div>
            <button 
              onClick={closeErrorAlert}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700"
              aria-label="Fermer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        
        {/* Message de compte existant */}
        {existAccount && !serverError && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md flex items-start shadow-sm">
            <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="font-medium text-yellow-800">Compte existant</p>
              <p className="text-yellow-700 text-sm mt-1">
                Cet email est déjà associé à un compte. Veuillez vous{' '}
                <Link to="/login" className="text-yellow-700 underline font-medium">connecter</Link>{' '}
                ou utiliser un autre email.
              </p>
            </div>
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nom complet <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="name"
                className={getInputClass('name')}
                placeholder="Jean Dupont"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                onBlur={() => handleBlur('name')}
                disabled={isLoading}
              />
              {((touched.name || submitAttempted) && !errors.name) && (
                <CheckCircle className="h-5 w-5 text-green-500 absolute right-3 top-3.5" />
              )}
            </div>
            {((touched.name || submitAttempted) && errors.name) && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="email"
                className={getInputClass('email')}
                placeholder="exemple@domaine.com"
                type="email"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                disabled={isLoading}
              />
              {((touched.email || submitAttempted) && !errors.email) && (
                <CheckCircle className="h-5 w-5 text-green-500 absolute right-3 top-3.5" />
              )}
            </div>
            {((touched.email || submitAttempted) && errors.email) && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
              État/Région <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="state"
                className={getInputClass('state')}
                placeholder="Québec"
                value={form.state}
                onChange={(e) => handleChange('state', e.target.value)}
                onBlur={() => handleBlur('state')}
                disabled={isLoading}
              />
              {((touched.state || submitAttempted) && !errors.state) && (
                <CheckCircle className="h-5 w-5 text-green-500 absolute right-3 top-3.5" />
              )}
            </div>
            {((touched.state || submitAttempted) && errors.state) && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.state}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
              electionName <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="state"
                className={getInputClass('electionName')}
                placeholder="vote president de la cooperative"
                value={form.electionName}
                onChange={(e) => handleChange('electionName', e.target.value)}
                onBlur={() => handleBlur('electionName')}
                disabled={isLoading}
              />
              {((touched.electionName || submitAttempted) && !errors.electionName) && (
                <CheckCircle className="h-5 w-5 text-green-500 absolute right-3 top-3.5" />
              )}
            </div>
            {((touched.electionName || submitAttempted) && errors.electionName) && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.electionName}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                className={getInputClass('password') + " pr-10"}
                placeholder={`Minimum ${passwordMinLength} caractères`}
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => handleChange('password', e.target.value)}
                onBlur={() => handleBlur('password')}
                disabled={isLoading}
              />
              <button 
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-500 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {((touched.password || submitAttempted) && errors.password) && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.password}
              </p>
            )}
            
            {form.password && (
              <div className="mt-2 bg-blue-50 p-3 rounded-lg border border-blue-100">
                <p className="text-xs font-medium text-gray-700 mb-2 flex items-center">
                  <Shield className="h-3 w-3 mr-1 text-blue-500" />
                  Exigences de sécurité du mot de passe:
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li className={`flex items-center ${form.password.length >= passwordMinLength ? 'text-green-600' : ''}`}>
                    {form.password.length >= passwordMinLength ? (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    ) : (
                      <AlertCircle className="h-3 w-3 mr-1" />
                    )}
                    Au moins {passwordMinLength} caractères
                  </li>
                  <li className={`flex items-center ${/(?=.*[a-z])/.test(form.password) ? 'text-green-600' : ''}`}>
                    {/(?=.*[a-z])/.test(form.password) ? (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    ) : (
                      <AlertCircle className="h-3 w-3 mr-1" />
                    )}
                    Au moins une lettre minuscule
                  </li>
                  <li className={`flex items-center ${/(?=.*[A-Z])/.test(form.password) ? 'text-green-600' : ''}`}>
                    {/(?=.*[A-Z])/.test(form.password) ? (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    ) : (
                      <AlertCircle className="h-3 w-3 mr-1" />
                    )}
                    Au moins une lettre majuscule
                  </li>
                  <li className={`flex items-center ${/(?=.*\d)/.test(form.password) ? 'text-green-600' : ''}`}>
                    {/(?=.*\d)/.test(form.password) ? (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    ) : (
                      <AlertCircle className="h-3 w-3 mr-1" />
                    )}
                    Au moins un chiffre
                  </li>
                  <li className={`flex items-center ${/(?=.*[@$!%*?&])/.test(form.password) ? 'text-green-600' : ''}`}>
                    {/(?=.*[@$!%*?&])/.test(form.password) ? (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    ) : (
                      <AlertCircle className="h-3 w-3 mr-1" />
                    )}
                    Au moins un caractère spécial (@$!%*?&)
                  </li>
                </ul>
              </div>
            )}
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-lg shadow-md transition duration-200 ease-in-out ${
              isLoading || !isFormValid()
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium hover:shadow-lg transform hover:-translate-y-0.5'
            }`}
            disabled={isLoading || !isFormValid()}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Création du compte...
              </div>
            ) : (
              <span className="flex items-center justify-center">
                <Vote className="h-5 w-5 mr-2" />
                S'inscrire pour voter
              </span>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Déjà inscrit ?{' '}
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-700 font-medium transition duration-200 hover:underline"
          >
            Se connecter
          </Link>
        </p>

        <div className="border-t border-gray-200 pt-4 mt-4">
          <p className="text-xs text-gray-500 text-center">
            En cliquant sur «S'inscrire pour voter» ci-dessus, vous acceptez nos{' '}
            <Link to="/terms" className="text-blue-500 hover:text-blue-700 hover:underline font-medium">
              Conditions d'utilisation
            </Link>{' '}
            et reconnaissez avoir lu notre{' '}
            <Link to="/privacy" className="text-blue-500 hover:text-blue-700 hover:underline font-medium">
              Politique de confidentialité
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;