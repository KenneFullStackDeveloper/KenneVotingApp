import React, { useState, useEffect } from 'react';
import {
    ContainerResetPassword,NavTitle,FormResetPassword, FooterPage 
} from "./resetpassword.styled"


class ResetPasswordError extends Error {
  constructor(message) {
    super(message);              
    this.name = message;  
  }
 
  getMessage(){
      return this.name
   }

}

const Resetpassword = () => {
    const [login, setLogin] = useState({ password1: '', password2: '' });
    const [isEqual,setIsEqual] = useState(false)

    const changePassword = async () => {
       
        try{
                if (login.password1 !== login.password2){
                    setIsEqual(true)                  
                }
                else{
                    
                    setIsEqual(false) 
                    const token = localStorage.getItem("access_token")
                    console.log("token:", token);
                    const response = await fetch("http://192.168.178.194:8000/reset-password", {
                                    method: "POST",
                                    headers: {"Content-Type": "application/json",},
                                    body:JSON.stringify({new_password: login.password1, token: token}),
                                });

                    const data = await response.json()
                    if (!data.new_password && data.token || data.new_password && !data.token ){
                        throw new ResetPasswordError("undefine data")
                          
                    }
                    alert("your password has been reset success");
                    console.log(data)
                }
     
            }catch (e){
                if (e instanceof ResetPasswordError) {
                  console.log("error:" ,e.getMessage());     
                }
                console.error("Error during registry :", error);
                alert("error occure time to reset old try to give your email again to recieve a new link");

            }
            
    }


    return (

        <ContainerResetPassword>
            <NavTitle>
                <p>
                   RESET YOUR PASSWORD
                </p>
            </NavTitle>
            <FormResetPassword>
                <input type="password" placeholder="password1" value={login.password1} onChange={e => setLogin({ ...login, password1: e.target.value })} />
                <input type="password" placeholder="password2" value={login.password2} onChange={e => setLogin({ ...login, password2: e.target.value })} />
                {isEqual &&<p style={{ color: "red" }}> both passwort must be the same </p>}
                <button onClick={changePassword} >resetpassword</button>
            </FormResetPassword>
            <FooterPage>
                 <p>
                     THIS IS MY FOOTER PAGE
                </p>
            </FooterPage>
             
        </ContainerResetPassword>

    )

}

export default Resetpassword;
