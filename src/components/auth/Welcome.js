import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ResetPassword from './ResetPassword';

const Welcome = ({ newMessage, onSignInSuccess }) => {
  const [page, setPage] = useState(newMessage || 'signin');
  const [existAccount, setExistAccount] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [candidats, setCandidats] = useState([]);
  const [info, setInfo] = useState({
    adminAcess: { isLog: false, role: '' },
    data: {}
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("access_token");
  }, []);

  useEffect(() => {
    if (info.adminAcess.role !== '') {
      onSignInSuccess(info.adminAcess);
    }
  }, [info.data]);

  const handleRegister = async (formData) => {
    try {
      const response = await fetch("http://192.168.178.194:8000/voters/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          role: 'user'
        }),
      });

      const result = await response.json();

      if (result.info === "exist") {
        setExistAccount(true); 
      } else if (result.info === "success") {
        setPage("signin");
        setHasVoted(false);
        setExistAccount(false); 
        alert("Inscription réussie");
      } else {
        alert("Erreur inconnue");
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      alert("Une erreur est survenue");
    }
  };

  const handleLogin = async (loginData) => {
    setHasVoted(false);
    try {
      const response = await fetch("http://192.168.178.194:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || "Échec de la connexion");

      setInfo({
        adminAcess: { isAuth: true, role: data.user.role },
        data: data.user
      });

      setPage("vote");
      getCandidatData(data.access_token);
    } catch (error) {
      console.error("Erreur de connexion:", error);
      alert("Échec de la connexion");
    }
  };

  const getCandidatData = async (token) => {
    try {
      const response = await fetch("http://192.168.178.194:8000/candidats", {
        method: "GET",
        headers: {
          'User-agent': 'learning app',
          "Accept": 'application/json',
          "Authorization": `Bearer ${token}`, 
        },
      });
      
      if (!response.ok) throw new Error("Échec de la récupération des données");

      const data = await response.json();
      setCandidats(data);
    } catch(error) {
      console.error("Erreur:", error);
    }
  };

  const sendResetLink = async (email) => {
    try {
      const response = await fetch("https://massive-primate-climbing.ngrok-free.app/forgotpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const msg = await response.json();
      localStorage.setItem("access_token", msg.access_token);
      alert("Vérifiez votre email pour le lien de réinitialisation");
    } catch (error) {
      console.error("Erreur:", error);
      alert("Une erreur est survenue");
    }
  };

  const startVoting = async (candidatEmail) => {  
    try {  
      const response = await fetch("http://192.168.178.194:8000/vote/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          voter_email: info.data.email, 
          candidat_email: candidatEmail 
        }),
      });
      
      if (!response.ok) {
        const errorText = await response.text(); 
        throw new Error(`Erreur ${response.status}: ${errorText}`);
      }
 
      const data = await response.json();
      if (data.status === "has already voted") {
        setHasVoted(true);
      } else {
        alert("Vote enregistré avec succès");
      }
    } catch(error) {
      console.error("Erreur:", error);
    }
  };

  switch(page) {
    case 'signup':
      return (
        <SignUp 
          onRegister={handleRegister}
          onNavigateToSignIn={() => setPage('signin')}
          existAccount={existAccount}
        />
      );
    
    case 'signin':
      return (
        <SignIn 
          onLogin={handleLogin}
          onNavigateToSignUp={() => setPage('signup')}
          onNavigateToReset={() => setPage('reset')}
        />
      );
    
    case 'reset':
      return (
        <ResetPassword 
          onReset={sendResetLink}
          onNavigateToSignIn={() => setPage('signin')}
        />
      );
    
    case 'vote':
      return (
        <VoteSection 
          userInfo={info}
          onStartVote={startVoting}
        />
      );
    
    default:
      return <SignIn 
        onLogin={handleLogin}
        onNavigateToSignUp={() => setPage('signup')}
        onNavigateToReset={() => setPage('reset')}
      />;
  }
};

export default Welcome;