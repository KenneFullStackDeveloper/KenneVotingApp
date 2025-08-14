
import React, { useState, useEffect } from 'react';


import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import Election from '../CreateElection';

const Welcome = ({newMessage,onSignInSuccess}) => {
  const [page, setPage] = useState(newMessage);
  const [form, setForm] = useState({ name: '', email: '', password: '',state: '' });
  const [login, setLogin] = useState({ email: '', password: ''});
  const [user, setUser] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [vote, setVote] = useState('');
  const [candidats, setCandidats] = useState([])
  const [existAcount , setExistAcount] = useState(false)
  const [visible, setVisible] = useState(true);
  const [isResetPass,setIsResetPass] = useState(false)
  const [success,setSuccess] = useState(false)
  // const [info,setInfo] = useState({isLog:false, role: ''})
  const [info,setInfo] = useState({adminAcess:{isLog:false, role: ''},data:{}})

  const navigate = useNavigate(); 
  



useEffect(() => {
    localStorage.removeItem("access_token");
    console.log("Token supprimé !");
  }, []);






useEffect(() => {
    if (info.role != ''){
      onSignInSuccess(info.adminAcess)
    }
 }, [info.data]);
  
  const loginwithGoog = useGoogleLogin({
     onSuccess: tokenResponse => console.log(tokenResponse),
  });


  const startvoting = async (candidat_email) => {  
      try{  
          const response = await fetch("http://192.168.178.194:8000/vote/", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body:JSON.stringify({ voter_email: login.email, candidat_email: candidat_email}),
              });
            if (!response.ok) {
            const errorText = await response.text(); 
            console.error("Erreur HTTP:", response.status, errorText);
            throw new Error(`Erreur ${response.status}: ${errorText}`);
          }
 
          const data = await response.json()
          if (data.status === "has already voted"){
              setHasVoted(true)

          }

          else{
             setSuccess(true)

          }
       } catch(error){

        console.error("myerror:", error)


       }



  }


   const loginWithGoogle = () => {
    window.location.href = "https://massive-primate-climbing.ngrok-free.app/loginwithgoogle";
  };

  const sendLinkToSetupPass = async () => {

    try {
              const response = await fetch("https://massive-primate-climbing.ngrok-free.app/forgotpassword", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body:JSON.stringify({ email: login.email}),
              });

              const msg = await  response.json()
              localStorage.setItem("access_token", msg.access_token);
              if (msg) {
          
                alert("check your email and click to the link to reset your password if you dont see a message cause is this email not exist try another mail or go to registy")
              }
        }catch (error) {
              console.error("Error during registry :", error);
              alert("error occure");
          }
  }

  
  const passwordforgoten = async () => {
    setPage("reset")
  }
  


  const handleStartVote = () => {
    setVisible(false);
  };
     
  const getCandidatData = async (token) => {
      try{
               
              const response = await fetch("http://192.168.178.194:8000/candidats", {
                                method: "GET",
                                headers: {
                                  'User-agent': 'learning app',
                                  "Accept": 'application/json',
                                  "Authorization": `Bearer ${token}`, 
                                   
                                  
                                },
                              });
              
              if (!response.ok){
                  throw new Error("Failed to get responsse from the server");
                }

              const data = await response.json();
              console.log("Candidats :", data);
              setCandidats(data)
          

        } catch(error){
          console.error("Error",error)
          alert("Failed to send message.")

        }
  };


  const handleRegister = async (token) => {
    try {
              const response = await fetch("http://192.168.178.194:8000/voters/", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: form.name,
                  email: form.email,
                  passwort: form.password,
                  state: form.state,
                  role: 'user'
                }),
              });

              const result = await response.json();

              if (result.info === "exist") {
                setExistAcount(true); 
              } else if (result.info === "success") {
                setPage("signin");
                setHasVoted(false)
                setExistAcount(false); 
                alert("registry success")
                
              } else {
                alert("unknow error");
              }
        } catch (error) {
              console.error("Error during registry :", error);
              alert("error occure");
          }
  };


 


  const handleLogin = async () => {
    setHasVoted(false)
    
    try {
      const response = await fetch("http://192.168.178.194:8000/login", {
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
      if (!response.ok){
         throw error(response.msg)
           
      }

      const userInfo = {
      isAuth: true,
      role:data.user.role,
      // ... other user-related data from the sign-in process
    };

    setInfo({
      adminAcess: userInfo,
      data: data.user
    });

      setPage("vote")
      getCandidatData(data.access_token)
    }catch (error) {
        console.error("Error during registry :", error);
      }
  
  }


  const handleVote = async () => {
    if (!vote || hasVoted) return;
    await axios.post('/api/vote', { userId: user.id, vote });
    setHasVoted(true);
  };






  if (page === 'signup') {
    return (
      <FormContainer>
        <h2 >Sign up</h2>
        {existAcount?<p style={{ color: "red" }} >this account already exist go to login</p>:null}
        <input  placeholder="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <input placeholder="state" value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} />
        <input type="password" placeholder="Mot de passe" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        <button  onClick={handleRegister}>Signup</button>
        <p >already signup ? <span className="text-blue-600 cursor-pointer" onClick={() => setPage('signin')}>signin</span></p>
     </FormContainer>
    );
  }

  if (page === 'signin' ) {
    return (
       <FormContainer>
        <p >Only login via email, Google, or +86 phone number login is supported in your region.</p>
        <input  placeholder="Email" value={login.email} onChange={e => setLogin({ ...login, email: e.target.value })} />
        <input type="password" placeholder="Mot de passe" value={login.password} onChange={e => setLogin({ ...login, password: e.target.value })} />
        <button  onClick={handleLogin}>Signin</button>
        <PasswordAndRegistry> 
          <p>not yet signup ? <span className="text-green-600 cursor-pointer" onClick={() => setPage('signup')}>signup</span></p>
          <p>password forgeten ? <span className="text-green-600 cursor-pointer" onClick={() => setPage('signup')}>resetpassword</span></p>
        </PasswordAndRegistry>
        <Separator><div></div>OR<div></div></Separator>
        <button onClick={loginWithGoogle}>Login With Google 🚀</button>
       </FormContainer>
    );
  }

  if (page === "reset"){
     return(
     
       <FormContainer>
        <h2> <span>Reset password</span></h2>
        <p>Enter your  email address and we will send you a link to reset your password.</p>
        <input  placeholder="Email" value={login.email} onChange={e => setLogin({ ...login, email: e.target.value })} />
        <button  onClick={sendLinkToSetupPass}>Continue</button>
        <p>go back to login ? <span className="text-green-600 cursor-pointer" onClick={() => setPage('signin')}>signin</span></p>
       </FormContainer>
    );


  }


 if (page === "vote"){

 return (
          <>
            
            <SelectCandidat>
                <Election listElection='list' user={info.data} isFromLogin={true}/>
                
                {visible && (
                  
                <BoxSchadow>
                    <StartVoteBtn  onClick={handleStartVote}>start vote</StartVoteBtn >
                </BoxSchadow>
                
                )}
                
            </SelectCandidat>
          </>      

        );

      }


};

export default Welcome;
