import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, Eye, Share2, BarChart3, Settings, Save, Users, Trophy,Check, Clock,  Vote, Maximize } from 'lucide-react';
import './index.css';
import LiveElection from '../LiveElection';
import { useNavigate } from 'react-router-dom'; 
import { useLocation } from 'react-router-dom';

const Election =  ({listElection = 'create', user={} ,isFromLogin=false}) => {
      const [newElection , setNewElection] = useState({"title":'', "requireAuth":false, "description":'', "candidates":[], "isActive": true, "startDate":'', "endDate":'' })
      const [elections,setElections] = useState([])
      const [newCandidate,setNewCandidate] = useState({"name":'',"photo":'',"description":'',"party":''})
      const [electionId,setElectionId] = useState(null)
      const [isElectionCreate,setIsElectionCreate] = useState(false)
      const [currentView, setCurrentView] = useState(listElection);
      const [startVote,setStartVote]  = useState(false)
      const [loading, setLoading] = useState(true);      // pour savoir si c’est en train de charger
      const [error, setError] = useState(null); 
      const [election, setElection] = useState({}); 
      const [isExist, setIsExist] = useState(false);
      const [deleteId,setDeleteId] = useState(null);
      const [totalVote,setTotalVote] = useState(0)
      const [totalVoter,setTotalVoter] = useState(0)
      const [staticMessage,setStaticMessage] = useState([])
      const [isRealTime, setIsRealTime] = useState(false)
      const [votingInfo , setVotingInfo] = useState([])
      const [selectedElection, setSelectedElection] = useState(null)
      const [sortedList,setSortedList] = useState([])
      const [dateError,setDateError]  = useState('')
      const [endElection,setEndElection] = useState(false)



      const navigate = useNavigate(); 


      const location = useLocation();
      const isFromAdmin = location.state?.isFromLogin || false; 
      const userRoleAdmin = location.state?.userRole || ''; 
      const isUser = isFromLogin && !isFromAdmin ? user.role : userRoleAdmin;

      

      const give_election_result = async (election, electionId) => {
          console.log("elleleee",election)
          try {
            const res = await fetch(`http://192.168.178.194:8000/resultvote/${electionId}`); 

            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
          
            const resp = await res.json();

            // Supprimer les doublons basés sur le nom du candidat
            const unique = new Map();
            
            resp.data.forEach(item => {
              if (!unique.has(item.candidat_name)) {
                unique.set(item.candidat_name, item);
              }
            });


            const uniqueList = Array.from(unique.values());
            // Mettre à jour les états React
            setVotingInfo(uniqueList);
            setStaticMessage(uniqueList);
            setTotalVote(resp.totalVote);
            setTotalVoter(resp.totalVoter);
            setSelectedElection(election);
            
          } catch (err) {
            console.error("Fetch error:", err);
          }
      };



      const toggleElectionStatus = (electionId) => {
          setElections(elections.map(election => 
            election.id === electionId 
              ? { ...election, isActive: !election.isActive }
              : election
          ));
      };


    // sorted list_voting result
      useEffect(() => {
          if (votingInfo.length > 0) {
            const sorted = [...votingInfo].sort((a, b) => b.vote_count - a.vote_count);
            setSortedList(sorted)
          }
      }, [votingInfo]);




      useEffect(() => {
          if(sortedList.length > 1){
            setCurrentView('results'); 
          }
      }, [sortedList]);

    // result vote .............................


      /**  Chargement initial (HTTP fetch)
      useEffect(() => {
        const fetchInitialData = async () => {
          try {
            const res = await fetch("http://192.168.178.194:8000/resultvote");
            const resp = await res.json();

            // Supprimer les doublons par candidat_name
            const unique = new Map();
            resp.data.forEach(item => {
              if (!unique.has(item.candidat_name)) {
                unique.set(item.candidat_name, item);
              }
            });

            const uniqueList = Array.from(unique.values());
            setStaticMessage(uniqueList);
            setVotingInfo(uniqueList);
            setTotalVote(resp.totalVote);
            setTotalVoter(resp.totalVoter);
          } catch (err) {
            console.error("Fetch error:", err);
          }
        };

        fetchInitialData();
      }, []);


    */




 




    useEffect(() => {
        const getElection = async () => {
          try {
            setLoading(true);
            const resp = await fetch("http://192.168.178.194:8000/election/candidat", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });

            if (!resp.ok) {
              throw new Error(`Erreur HTTP: ${resp.status}`);
            }

            const data = await resp.json();
            setElections(data);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };

        getElection();
    }, []);

    useEffect(() => {
       if (!elections)return;
       const newDate = new Date()
       for (const election of elections) {
          const formattedEndDate = new Date(election.endDate.replace(/\./g, "-"));
          if (formattedEndDate >= newDate){
             setEndElection(true) 
          }

       }


    }, [election]);

    useEffect(() => {
            
        const deleteElection = async () => {
            try{
                if (deleteId !== null){
                    const response = await fetch(`http://192.168.178.194:8000/election/${electionId}` , {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                    },

                  });

                }

                if (!response.ok){
                    alert("error lors de la creation d'election contacter le service")
                    const errorData = await response.json();
                    console.error('API Error:', errorData);
                    throw new Error(`HTTP error! status: ${response.status}`);
                
                }
          
              }catch(e){
                  console.log(e)
              }
              
        }

        deleteElection();
                
    }, [deleteId]);


      


    useEffect(() => {
        const createCandidat = async () => {
              if (electionId !== null){
              try{
                
                    for (const candidat of newElection.candidates) {
                              console.log("my_candidate",candidat)
                              const formData = new FormData();
                              formData.append("name", candidat.name);
                              formData.append("description", candidat.description);
                              formData.append("party", candidat.party);
                              formData.append("photo", candidat.photo);

                              const response = await fetch(`http://192.168.178.194:8000/elections/${electionId}/candidates`, {
                                method: "POST",
                            
                                body: formData,
                              });
                                

                              if (!response.ok) {
                                const errorData = await response.json();
                                console.error('API Error:', errorData);
                                throw new Error(`HTTP error! status: ${response.status}`);
                              }
                              setIsElectionCreate(true)
                    }
                  
              
              }catch(e){
                console.error('Error creating candidate:', e);
                setDeleteId(electionId)

              }

          }
        }

        createCandidat()

    }, [electionId]);




      

    const findId = (id) => {
        const election = elections.find(election => election.id === id);
        return election
    };

    const startVoting = (id) => {
        const election = findId(id);
        setElection(election)
        setCurrentView('vote')
        setStartVote(true)

    };

      
    const addCandidate = () => {
        const candidat = newElection.candidates.find(c => c.party === newCandidate.party)
        try{
            if (candidat){
                throw new Error("This party already exists. Please change it.");
              
            }
            setIsExist(false)
            setNewElection({...newElection,candidates:[...newElection.candidates,newCandidate]})

          }catch(e){
            setIsExist(true)
            
          }

    };
    
  function buildDateWithTime(dateStr, hour, minute, second = 0) {
      const [year, month, day] = dateStr.split('-').map(Number);
      return new Date(year, month - 1, day, hour, minute, second);
  };

  function formatDate(date) {
      const d = new Date(date);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      const hh = String(d.getHours()).padStart(2, '0');
      const mi = String(d.getMinutes()).padStart(2, '0');
      const ss = String(d.getSeconds()).padStart(2, '0');

      return `${yyyy}/${mm}/${dd} ${hh}:${mi}:${ss}`;
  };
      
    const simpleElection = async () => {
        const startDate = buildDateWithTime(newElection.startDate, 14, 55, 0);
        const endDate = buildDateWithTime(newElection.endDate, 14, 59, 0);
        try{

            const response = await fetch("http://192.168.178.194:8000/elections" , {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body:JSON.stringify({ title: newElection.title, 
                  description: newElection.description, 
                  isActive: newElection.isActive,
                  startDate: formatDate(startDate),
                  endDate: formatDate(endDate),
                  requireAuth: newElection.requireAuth
              }),
            });

            if (!response.ok) {
              
              const errorData = await response.json();
              console.error('API Error:', errorData);
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data =  await response.json()
            setElectionId(data.id)
            
          


        }catch(e){
          console.error(e)

        }

    };


    const backToListElection = () => {
          setCurrentView('list') 
          setIsElectionCreate(false)      

    };


    const createElection = async () => {
        const now = new Date();
        const formattedStartDate = new Date(newElection.startDate.replace(/\./g, "-"));
        const formattedEndDate = new Date(newElection.endDate.replace(/\./g, "-"));

        if (formattedStartDate < now ){
              setDateError("check you given date  startDate muss be greather or equals to Date now")
        }

        if(formattedEndDate < formattedStartDate){
              setDateError("check you given date the endDate muss be greather or equals to startDate ")
        }

        else{
            setDateError('')
            await simpleElection()
        }
            
    };


    const backToHome = () => {
        navigate('/')
    };


    const removeCandidate = (candidatParty) => {
        setNewElection(prev => ({
            ...prev,
            candidates: prev.candidates.filter(candidate => candidate.party !== candidatParty)
        }));
        
    };



      
    if (loading) return <div className='m-32'>Chargement des élections...</div>;
    if (error) return <div className='m-32'>Erreur: {error}</div>;

    if(isElectionCreate){
      return <ElectionConfirmation election={newElection} backToListElection={backToListElection}/>
    }


    return (

      <>

        <FormContainer currentView={currentView} 
          removeCandidate={removeCandidate}
          setCurrentView={setCurrentView}
          createElection={createElection} 
          addCandidate={addCandidate}
          setNewElection={setNewElection}
          setNewCandidate={setNewCandidate}
          newCandidate={newCandidate}
          newElection={newElection}
          toggleElectionStatus={toggleElectionStatus}
          elections={elections}
          startVoting={startVoting}
          election={election}
          isExist={isExist}
          selectedElection={selectedElection}
          setSelectedElection={setSelectedElection}
          sortedList={sortedList}
          totalVote={totalVote}
          totalVoter={totalVoter}
          backToHome={backToHome}
          dateError={dateError}
          isFromAdmin = {isFromAdmin}
          isUser = {isUser}
          user={user}
          give_election_result={give_election_result}
          endElection={endElection}

        />
      </>

    )


    }




    const FormContainer = ({newElection,setNewElection,
                            setNewCandidate, 
                            newCandidate,
                            addCandidate,
                            createElection,
                            currentView,
                            setCurrentView,
                            toggleElectionStatus,
                            elections,
                            startVoting,
                            election,
                            isExist,
                            selectedElection,
                            setSelectedElection,
                            votingInfo,
                            sortedList,
                            totalVote,
                            totalVoter,
                            backToHome,
                            removeCandidate,
                            dateError,
                            isUser,
                            user,
                            give_election_result,
                            endElection

                      
                        }) => {


    if (currentView === 'create') {

        return (
          <div className="election-creator">
          
            <div className="creator-header">
              {isExist && <p style={{color:"red"}}>this party already exist please give another!!!!!</p>}
              <button 
                onClick={() => backToHome()}
                className="back-button"
              >
                ← Back to HomePage
              </button>
              <h1>Créer une nouvelle élection</h1>
              <button 
                onClick={() => setCurrentView('list')}
                className="back-button"
              >
                ← Retour aux élections
              </button>
            
            </div>

            <div className="creator-content">
              <div className="election-info">
                <div className="form-group">
                  <label>Titre de l'élection *</label>
                  <input
                    type="text"
                    value={newElection.title || ''}
                    onChange={(e) => setNewElection({...newElection, title: e.target.value})}
                    placeholder="Ex: Élection présidentielle 2024"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={newElection.description || ''}
                    onChange={(e) => setNewElection({...newElection, description: e.target.value})}
                    placeholder="Décrivez l'objectif de cette élection..."
                    className="form-textarea"
                    rows={3}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Date de début</label>
                    <input
                      type="date"
                      value={newElection.startDate || ''}
                      onChange={(e) => setNewElection({...newElection, startDate: e.target.value})}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Date de fin</label>
                    <input
                      type="date"
                      value={newElection.endDate || ''}
                      onChange={(e) => setNewElection({...newElection, endDate: e.target.value})}
                      className="form-input"
                    />
                  
                  </div>
                </div>

                <div className="form-options">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={newElection.requireAuth || false}
                      onChange={(e) => setNewElection({...newElection, requireAuth: e.target.checked})}
                    />
                    Authentification requise pour voter
                  </label>
                </div>
              </div>

              <div className="candidates-section">
                <h3>Candidats ({newElection.candidates?.length || 0})</h3>
                <CandidatsCreated candidats={newElection.candidates}/>
                <AddCandidatForm newCandidate={newCandidate} setNewCandidate={setNewCandidate} addCandidate={addCandidate}/>
                
              </div>

              <div className="creator-actions">
                {dateError && <p style={{color:"red"}}>error: {dateError} </p>}
                <button 
                  onClick={createElection}
                  disabled={!newElection.title || !newElection.candidates?.length || newElection.candidates.length < 2 }
                  className="save-election-btn"
                >
                  <Save className="icon-sm" /> Créer l'élection
                </button>
              </div>
            </div>
          </div>
        );
      }

      if (currentView === 'results') {
        const maxVote = sortedList[0]
        const bulletinNull = totalVoter - totalVote
        
        return (
          <div className="election-results">
            <div className="results-header">
              <button 
                onClick={() => setCurrentView('list')}
                className="back-button"
              >
                ← Retour aux élections
              </button>
              <h1>Résultats: {selectedElection.title}</h1>
              <div className="results-stats">
                <span className="stat-item">{totalVote} Totalvotes</span>
                <span className="stat-item">{totalVoter} Totalvoter</span>
                <span className="stat-item">{bulletinNull} BulletinNull</span>
                <span className={`status ${selectedElection.isActive ? 'active' : 'inactive'}`}>
                  {selectedElection.isActive ? '🟢 En cours' : '🔴 Terminée'}
                </span>
              </div>
            </div>

            <div className="results-content">
              <div className="winner-section">
                <div className="winner-card">
                  <Trophy className="winner-icon" />
                  <h2>Candidat en tête</h2>
                  <h3>{maxVote.candidat_name}</h3>
                  <p>{maxVote.candidat_bio}</p>
                  <div className="winner-votes">
                    <span className="vote-count">{maxVote.vote_count}</span>
                    <span className="vote-percentage">
                      {maxVote.vote_percent?.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="candidates-results">
                <h3>Résultats détaillés</h3>
                {sortedList.map((candidate, index) => {
                  
                  return (
                    <div key={candidate.id} className="result-candidate">
                      <div className="candidate-rank">#{index + 1}</div>
                      <div className="candidate-details">
                        <h4>{candidate.candidat_name}</h4>
                        <p>{candidate.candidat_bio}</p>
                      </div>
                      <div className="vote-bar">
                        <div className="bar-container">
                          <div 
                            className="bar-fill" 
                            style={{width:`${candidate.vote_percent?.toFixed(2)}%`}}
                          >{candidate.vote_percent?.toFixed(2)}%</div>
                        </div>
                        <div className="vote-stats">
                          <span className="votes">{candidate.vote_count} votes</span>
                          <span className="percentage">{candidate.vote_percent?.toFixed(2)}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      }

      return (
        <div className="election-dashboard">
          <div className="dashboard-header">
            <h1>Mes Élections</h1>

            <button 
              onClick={() => setCurrentView('create')}
              className="create-election-btn"
              disabled={isUser==='user'}
            >
              <Plus className="icon-sm" /> Créer une élection
            </button>
          </div>
          {currentView=="vote"&& <LiveElection election={election} userInfo={user}/> }
          
          {currentView === "list"&&<div className="elections-grid">

            {elections.map((election) => (
              <>
            
              <div key={election.id} className="election-card">
                <div className="card-header">
                  <h3>{election.title}</h3>
                  <div className="card-actions">
                    <button 
                      onClick={() => 
                          give_election_result(election,election.id)
                      }
                      className="action-btn"
                      title="Voir les résultats"
                    >
                      <BarChart3 className="icon-sm" />
                    </button>
                    <button className="action-btn" title="Partager">
                      <Share2 className="icon-sm" />
                    </button>
                    <button className="action-btn" title="Paramètres">
                      <Settings className="icon-sm" />
                    </button>
                    <button 
                      onClick={() => deleteElection(election.id)}
                      className="action-btn delete"
                      title="Supprimer"
                    >
                      <Trash2 className="icon-sm" />
                    </button>
                  </div>
                </div>

                <p className="card-description">{election.description}</p>

                <div className="election-period">
                  <span>📅 Du {election.startDate} au {election.endDate}</span>
                </div>

                <div className="card-stats">
                  <div className="stat">
                    <span className="stat-value">{election.candidates.length}</span>
                    <span className="stat-label">Candidats</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">3690</span>
                    <span className="stat-label">Votes</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">En tête</span>
                  </div>
                </div>

                <div className="leading-candidate">
                  {election.candidates.length > 0 && (
                    <div className="leader-info">
                      <Users className="leader-icon" />
                      <span>En tête: Herve</span>
                    </div>
                  )}
                </div>

                <div className="card-footer">
                  <span className={`status ${election.isActive ? 'active' : 'inactive'}`}>
                    {election.isActive ? '🟢 En cours' : '🔴 Terminée'}
                  </span>
                  <button 
                        onClick={ () => 
                          startVoting(election.id)}
                        className="start-vote-btn"
                        disabled={!election.isActive}
                >
                        🗳️ Commencer à voter
                  </button>
                  <button 
                    onClick={() => toggleElectionStatus(election.id)}
                    className="toggle-btn"
                    disabled={isUser==="user" || !election.isActive}
                  >
                    {election.isActive ? 'Terminer' : 'Activer'}
                  </button>

                </div>

                
              </div>
            </>
            ))}
          </div>}
      

          {elections.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">🗳️</div>
              <h3>Aucune élection créée</h3>
              <p>Créez votre première élection pour commencer à collecter des votes</p>
              <button 
                onClick={() => setCurrentView('create')}
                className="create-first-election"
              >
                <Plus className="icon-sm" /> Créer ma première élection
              </button>
            </div>
          )}
        </div>
      );
    };






   const AddCandidatForm = ({newCandidate,setNewCandidate,addCandidate}) => {
      return (
        <>
        
          <div className="add-candidate-form">
                  <h4>Ajouter un candidat</h4>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Nom du candidat *</label>
                      <input
                        type="text"
                        value={newCandidate.name || ''}
                        onChange={(e) => setNewCandidate({...newCandidate, name: e.target.value})}
                        placeholder="Nom complet du candidat"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Parti politique *</label>
                      <input
                        type="text"
                        value={newCandidate.party || ''}
                        onChange={(e) => setNewCandidate({...newCandidate, party: e.target.value})}
                        placeholder="Nom du parti ou liste"
                        className="form-input"
                      />
                  
                    </div>

                    <div className="form-group">
                      <label>load photo*</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          const updated = { ...newCandidate, photo: file };
                          setNewCandidate(updated);
                        }}
                        className="form-input-file"
                      />
                    </div>
                  
                  </div>

                  <div className="form-group">
                    <label>Description du candidat</label>
                    <textarea
                      value={newCandidate.description || ''}
                      onChange={(e) => setNewCandidate({...newCandidate, description: e.target.value})}
                      placeholder="Expérience, programme, qualifications..."
                      className="form-textarea"
                      rows={3}
                    />
                  </div>


                  <button 
                    onClick={addCandidate}
                    disabled={!newCandidate.name || !newCandidate.party || !newCandidate.photo}
                    className="add-candidate-btn"
                  >
                    <Plus className="icon-sm" /> Ajouter le candidat
                  </button>
          </div>
        </>


      )

    }


    const CandidatsCreated = ({candidats}) => {
       return (
              <>
                {candidats?.map((candidate, index) => (
                  <div key={candidate.id} className="candidate-item">
                    <div className="candidate-header">
                      <span className="candidate-number">#{index + 1}</span>
                      <div className="candidate-info">
                        <h4>{candidate.name}</h4>
                        <span className="party-name">{candidate.party}</span>
                      </div>
                      <button 
                        onClick={() => removeCandidate(candidate.party)}
                        className="remove-candidate"
                      >
                        <Trash2 className="icon-sm" />
                      </button>
                    </div>
                    <p className="candidate-description">{candidate.description}</p>
                  </div>
                ))}
              </>
          ) 

    }


    const ElectionConfirmation = ({ election ,backToListElection}) => {
      return (
        <>
          <div className="dashboard-header">
            <h1>Election Confirmation</h1>
            <button 
              onClick={() => backToListElection()}
              className="create-election-btn"
            >
            ←   back to list élection
            </button>
          </div>
          <div className="live-election completed">
            <div className="completion-animation">
              <div className="success-icon">
                <Check className="check-icon" />
              </div>
              <h2>election enregistré avec succès !</h2>
              <p>Merci d'avoir creer une élection .</p>
              <div className="vote-confirmation">
                <div className="confirmation-details">
                  <div className="detail-item">
                    <Vote className="detail-icon" />
                    <span>creation d'une elction sécurisé et anonyme</span>
                  </div>
                  <div className="detail-item">
                    <Clock className="detail-icon" />
                    <span>Enregistré le {new Date().toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="detail-item">
                    <Users className="detail-icon" />
                    <span>Élection: {election.title}</span>
                  </div>
                </div>
              </div>
              <div className="next-steps">
                <p>Les utilisateur peuvent deja commencer les votes.</p>
                

              </div>
            </div>
          </div>
        </>
        );
  

  }


export default  Election