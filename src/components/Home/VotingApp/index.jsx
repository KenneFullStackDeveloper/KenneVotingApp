
import React, { useState, useEffect } from 'react';
import {
    SelectCandidat, BoxSchadow,StartVoteBtn
} from "./VotingApp.styled"

const VotingApp =  () => {
    
    const [visible, setVisible] = useState(true); 
    const [candidats, setCandidats] = useState([])
    const [token,setToken] = useState(localStorage.getItem("access_token"))
    
    const handleStartVote = () => {
        ge_data_candidats()
        setVisible(false);
      


    };
 
    
    const ge_data_candidats = async () => {
        try{
             
                const response = await fetch("192.168.178.194:8000/candidats", {
                                    method: "GET",
                                    headers: {
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
 
        return (
        
            <SelectCandidat>
                {candidats.map(candidat => (

                            <div key={candidat.id}>
                                <div>
                                    <div > 
                                        <img src={`http://192.168.178.194:8000/${candidat.photo_url}`} alt={candidat.name} width="200" />
                                         
                                    </div>
                                    <div>
                                        <p>biography: {candidat.biography}</p>
                                        <p>name: {candidat.name}</p>
                                    </div>

                                </div>
                            </div>
                ))}

                {visible && (
                <BoxSchadow>
                    <StartVoteBtn  onClick={handleStartVote}>Démarrer le vote</StartVoteBtn >
                </BoxSchadow>
                )}
                
            </SelectCandidat>
                  

        );


}


export default VotingApp;