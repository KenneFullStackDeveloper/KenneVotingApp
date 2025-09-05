import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 

const SignIn = ({ onLogin, isLoading = false, errorMessage = '' }) => {
  const [login, setLogin] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isLogin,setIsLogin] = useState(false)
  const navigate = useNavigate(); 
  
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

   const handleFacebookLogin =()=>{
        // window.location.href = "http://localhost:8081/oauth2/authorization/facebook"
         window.location.href = "`${backendUrl}/oauth2/authorization/facebook`"
       
       
  }



  const handleLogin = async (login) => {
    try {
      const response = await fetch("http://localhost:8081/api/auth/logintest", {
        method: "POST",
        headers: {
           "Content-Type": "application/json",
        },
        body:JSON.stringify({
          email: login.email,
          password: login.password,
        }),
      });
      const data = await response.json();
      localStorage.setItem('token',data.token)
      console.log("url backeng....",backendUrl)


      //fetch user details by passing this token in header http://192.168.178.194:8081
      const resp = await fetch("http://localhost:8081/api/auth/details", 
        {
            method: "GET",
            headers: {
            "Authorization": "Bearer " + data.token,
            }  
        });
        const respon = await resp.json()
       
      if (!response.ok){
         throw error(response.msg)
         
      }
      setIsLogin(true)
      console.log(respon)
         navigate('/');

    }catch (error) {
        console.error("Error during registry :", error);
      }
  
  };
 





  const validateField = (field, value) => {
    let error = '';
    
    switch(field) {
      case 'email':
        if (!value.trim()) error = 'L\'email est requis';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Veuillez entrer une adresse email valide';
        break;
      case 'password':
        if (!value) error = 'Le mot de passe est requis';
        break;
      default:
        break;
    }
    
    setErrors({ ...errors, [field]: error });
    return error === '';
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    validateField(field, login[field]);
  };

  const handleChange = (field, value) => {
    setLogin({ ...login, [field]: value });
    
    // Valider au fur et à mesure si le champ a déjà été touché
    if (touched[field]) {
      validateField(field, value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Marquer tous les champs comme touchés pour afficher les erreurs
    setTouched({ email: true, password: true });
    
    // Valider tous les champs
    const isEmailValid = validateField('email', login.email);
    const isPasswordValid = validateField('password', login.password);

    if (isEmailValid && isPasswordValid) {
      // onLogin(login);
      handleLogin(login)
    }
  };

  const getInputClass = (field) => {
    let classes = "w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all duration-200 ";
    
    if (touched[field]) {
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
           Object.values(login).every(value => value.trim() !== '');
  };

  // Composant GoogleLoginButton intégré
  const GoogleLoginButton = ({ onClick, isLoading = false }) => {
    return (
      <button
        onClick={onClick}
        disabled={isLoading}
        className="relative w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 py-3 px-4 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed group overflow-hidden"
      >
        {/* Effet de fond animé */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {isLoading ? (
          <div className="flex items-center relative z-10">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-gray-700 font-medium">Connexion en cours...</span>
          </div>
        ) : (
          <>
            <div className="relative z-10 flex items-center">
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-gray-700 font-medium">Se connecter avec Google</span>
            </div>
            
            {/* Animation subtle au survol */}
            <div className="absolute inset-0 transform scale-110 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-blue-500 rounded-lg"></div>
          </>
        )}
      </button>
    );
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
            Connexion
          </h2>
          <p className="mt-2 text-gray-600">
            Accédez à votre espace de vote sécurisé
          </p>
        </div>

        {/* Message d'erreur */}
        {errorMessage && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md flex items-start shadow-sm">
            <svg className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-red-700 text-sm">{errorMessage}</p>
            </div>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                id="email"
                className={getInputClass('email')}
                placeholder="exemple@domaine.com"
                type="email"
                value={login.email}
                onChange={(e) => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                disabled={isLoading}
              />
            </div>
            {touched.email && errors.email && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                id="password"
                className={getInputClass('password') + " pr-10"}
                placeholder="Votre mot de passe"
                type={showPassword ? "text" : "password"}
                value={login.password}
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
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {touched.password && errors.password && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.password}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <Link
              to="/reset-password"
              className="text-sm text-blue-500 hover:text-blue-700 hover:underline transition-colors"
            >
              Mot de passe oublié ?
            </Link>
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
                Connexion...
              </div>
            ) : (
              "Se connecter"
            )}
          </button>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500 text-sm">OU</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <GoogleLoginButton 
          onClick={handleFacebookLogin}
          isLoading={isLoading}
        />

        <p className="text-center text-sm text-gray-600">
          Pas encore inscrit ?{' '}
          <Link
            to="/register"
            className="text-blue-500 hover:text-blue-700 font-medium transition duration-200 hover:underline"
          >
            Créer un compte
          </Link>
        </p>

        <div className="border-t border-gray-200 pt-4 mt-4">
          <p className="text-xs text-gray-500 text-center">
            En cliquant sur «Se connecter» ci-dessus, vous acceptez nos{' '}
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

export default SignIn;