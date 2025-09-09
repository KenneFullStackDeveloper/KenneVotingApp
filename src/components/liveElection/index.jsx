import React, { useState,useEffect } from 'react';
import { Check, Users, Clock, Trophy, Vote } from 'lucide-react';
import './index.css';
import { use } from 'react';

const LiveElection = ({ election,userInfo }) => {
    const [hasVoted,setHasVoted] = useState(false)
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userHasReadyVoted,setUserHasReadyVoted] = useState(false)
    const [decrementSecond,setDecrementSecond] = useState(0)
    const [endVote,setEndVote] = useState(false)

    console.log("usssseeeee",userInfo)

    useEffect(() => {
       const interval = setInterval(() => setDecrementSecond(c => c - 1), 1000);
       return () => {
        clearInterval(interval);
       };
    }, []);

   


    const handleVote = async () => {
        if (!selectedCandidate) return;
        
        setIsSubmitting(true);
        // Simulation d'envoi du vote
        setTimeout(() => {
          setHasVoted(true);
          setIsSubmitting(false);
        }, 2000);
    };

    
    


    const startvoting = async () => {  

      console.log("myuserrr",userInfo)
        
        try{  
            const response = await fetch("http://192.168.178.29:8000/VoteElection/", {          
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body:JSON.stringify({ voter_email: userInfo, candidat_id: selectedCandidate}),
            });

            if (!response.ok) {
                const errorText = await response.text(); 
                console.error("Erreur HTTP:", response.status, errorText);
                throw new Error(`Erreur ${response.status}: ${errorText}`);
            }

            const voter_data = await response.json() 
            console.log("list des voteur",voter_data)
                   
            setIsSubmitting(true);

            setTimeout(() => {
                if (voter_data.status === "has already voted"){
                     setUserHasReadyVoted(true)        
                }
                else{
                    setHasVoted(true);
                   
                }
                setIsSubmitting(false);
            }, 2000);
        } catch(error){

          console.error("myerror:", error)


        }

    };



    const timeRemaining = () => {
        const now = new Date();
        const end = new Date(election.endDate);
        
        const diff = end.getTime() - now.getTime();
        console.log("getdate"+end.getTime()+"  "+"zzzz"+end.getTime())
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
       //setDecrementSecond(seconds)
           
        if(hours === minutes && minutes === seconds){
             setEndVote(true)
             return;
        }
        if (days > 0) {
          return `${days} jour${days > 1 ? 's' : ''} restant${days > 1 ? 's' : ''}`;
        } else if (hours > 0) {
          //return `${hours} heure${hours > 1 ? 's' : ''} restante${hours > 1 ? 's' : ''}`;
          return `tempsrestant ${hours}:${minutes}:${seconds}`;
        } 
        else {
          return 'Se termine bientôt';
        }
    };




  if (hasVoted) {
     return <VoteRegistry electionTitle={election.title}/>
  }

  return <CandidatInfo election={election} handleVote={handleVote} 
               timeRemaining={timeRemaining} 
               setSelectedCandidate={setSelectedCandidate} 
               selectedCandidate={selectedCandidate}
               isSubmitting={isSubmitting}
               startvoting={startvoting}
               userHasReadyVoted={userHasReadyVoted}
               decrementSecond={decrementSecond}
               endVote={endVote}
         />

};





const CandidatInfo = ({ 
  election,
  handleVote ,
  timeRemaining ,
  setSelectedCandidate,
  selectedCandidate,isSubmitting,
  startvoting,
  userHasReadyVoted,
  endVote
}) => {
  return (
    <div className="live-election">
      <div className="election-container">
        {/* Header */}
        <div className="election-header">
          <div className="election-badge">
            <Vote className="badge-icon" />

             {endVote ?(
                  <>
                     Élection termine
                  </>
            
                ):(
                 <>
                   Élection en cours
                 </>
                )
              }
           
          </div>
          <h1>{election.title}</h1>
          <p className="election-description">{election.description}</p>
          
          {/* Election Info */}
          <div className="election-info">
            <div className="info-item">
              <Clock className="info-icon" />
              <span>{timeRemaining()}</span>
            </div>
            <div className="info-item">
              <Users className="info-icon" />
              <span>{election?.candidates?.length ?? 0} candidats</span>
            </div>
            <div className="info-item">
              <Trophy className="info-icon" />
              <span>Vote unique</span>
            </div>
          </div>
        </div>

        {/* Voting Instructions */}
        <div className="voting-instructions">
          <h3>Instructions de vote</h3>
          <ul>
            <li>✓ Sélectionnez un candidat en cliquant sur sa carte</li>
            <li>✓ Vérifiez votre choix avant de confirmer</li>
            <li>✓ Votre vote est secret et sécurisé</li>
            <li>✓ Vous ne pouvez voter qu'une seule fois</li>
          </ul>
        </div>

        {/* Candidates */}
        <div className="candidates-section">
          <h3>Candidats ({election?.candidates?.length ?? 0})</h3>
          <div className="candidates-grid">
            {election?.candidates?.map((candidate) => (
              <div 
                key={candidate.id} 
                className={`candidate-card ${selectedCandidate === candidate.id ? 'selected' : ''}`}
                onClick={() => setSelectedCandidate(candidate.id)}
                disabled={endVote}
              >
                <div className="candidate-header">
                  <div className="candidate-avatar">
                  <img  style={{objectFit: "cover", borderRadius: "50%", overflow: "hidden" ,  width:"39px", height:"39px" }} src={`${candidate.photo}`} 
                  alt={election.candidates.find(c => c.id === selectedCandidate)?.name} 
                  object-fit="cover" border-radius="50%" overflow="hidden"/>
                  </div>
                  <div className="candidate-info">
                    <h4>{candidate.name}</h4>
                    <p className="party">{candidate.party}</p>
                  </div>
                  <div className="selection-indicator">
                    {selectedCandidate === candidate.id && (
                      <div className="selected-dot"></div>
                    )}
                  </div>
                </div>
                
                <div className="candidate-description">
                  <p>{candidate.description}</p>
                </div>
                
                <div className="vote-button-container">
                  <button 
                    className={`vote-for-btn ${selectedCandidate === candidate.id ? 'selected' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCandidate(candidate.id);
                    }}
                    disabled={endVote}
                  >
                    {selectedCandidate === candidate.id ? 'Candidat sélectionné' : 'Voter pour ce candidat'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vote Confirmation */}
        {selectedCandidate && (
          <div className="vote-confirmation-section">
            <div className="confirmation-card">
              <h3>Confirmer votre vote</h3>
              <div className="selected-candidate-summary">
                <div className="summary-avatar">
                  <img src={`${election.candidates.find(c => c.id === selectedCandidate)?.photo}`} 
                  alt={election.candidates.find(c => c.id === selectedCandidate)?.name} 
                  style={{objectFit: "cover", borderRadius: "50%", overflow: "hidden" ,  width:"39px", height:"39px" }}
                  width="200"/>
                </div>
                <div className="summary-info">
                  <h4>{election.candidates.find(c => c.id === selectedCandidate)?.name}</h4>
                  <p>{election.candidates.find(c => c.id === selectedCandidate)?.party}</p>
                </div>
              </div>
              
              <div className="confirmation-warning">
                {userHasReadyVoted ?(
                  <>
                    <p> ❗: vous ne pouvez plus voter vous avez droit a un vote.</p>
                  </>
            
                ):(
                 <>
                   <p>⚠️ Attention : Une fois confirmé, votre vote ne pourra plus être modifié.</p>
                 </>
                )
              }

              </div>
              
              <div className="confirmation-actions">
                <button 
                  onClick={() => setSelectedCandidate('')}
                  className="change-vote-btn"
                >
                  Changer mon choix
                </button>
                <button 
                  onClick={startvoting}
                  disabled={isSubmitting}
                  className="confirm-vote-btn"
                >
                  {isSubmitting ? (
                    <>
                      <div className="loading-spinner"></div>
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      <Vote className="vote-icon" />
                      Confirmer mon vote
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Security Notice */}
        <div className="security-notice">
          <h4>🔒 Sécurité et confidentialité</h4>
          <p>
            Votre vote est chiffré et anonyme. Aucune information personnelle n'est associée à votre choix. 
            Cette élection respecte les standards de sécurité les plus élevés.
          </p>
        </div>
      </div>
    </div>
  );
};






const VoteRegistry = ({ electionTitle }) => {

  return (
      <div className="live-election completed">
        <div className="completion-animation">
          <div className="success-icon">
            <Check className="check-icon" />
          </div>
          <h2>Vote enregistré avec succès !</h2>
          <p>Merci d'avoir participé à cette élection démocratique.</p>
          <div className="vote-confirmation">
            <div className="confirmation-details">
              <div className="detail-item">
                <Vote className="detail-icon" />
                <span>Vote sécurisé et anonyme</span>
              </div>
              <div className="detail-item">
                <Clock className="detail-icon" />
                <span>Enregistré le {new Date().toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="detail-item">
                <Users className="detail-icon" />
                <span>Élection: {electionTitle}</span>
              </div>
            </div>
          </div>
          <div className="next-steps">
            <p>Les résultats seront disponibles après la fermeture du scrutin.</p>
            <button 
              onClick={() => window.location.reload()}
              className="view-results-btn"
            >
              Voir les résultats en temps réel
            </button>
          </div>
        </div>
      </div>
    );
  

  }



export default LiveElection;