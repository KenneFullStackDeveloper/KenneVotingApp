import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, Eye, Share2, BarChart3, Settings, Save, Users, Trophy,Check, Clock,  Vote, Download, Maximize } from 'lucide-react';
import './index.css';
import LiveElection from '../liveElection';
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
      const [fileName,setFileName]  = useState(null)
      const [isAuthorizedFileExtention,setIsAuthorizedFileExtention] = useState(false)
      const [urlApi,setUrlApi] = useState("")
      const [loadFileMessage,setLoadFileMessage] = useState({"errorSchema":"","errorsColType":[]})
      const  [messageToAnalyseFile,setMessageToAnalyseFile] = useState("")
      const[selectedOption,setSelectedOption] = useState([])
      const[firstCandidat,setFirstCandidat] = useState({})
  

      const listOption = ["delete duplicat","date valide","file schema", "file test and validation","miss data"]


       console.log("mymessage",user)
      

      const navigate = useNavigate(); 


      const location = useLocation();
      const isFromAdmin = location.state?.isFromLogin || false; 
      const userRoleAdmin = location.state?.userRole || ''; 
      const userInfoAdmin = location.state?.userInfo || ''; 
      const isUser = isFromLogin && !isFromAdmin ? user.role : userRoleAdmin;
      const infoUser = isFromLogin && !isFromAdmin ? user.email : userInfoAdmin;
      
      



      const handleFileChange = (e) => {
          const file = e.target.files[0];
          if (file) {
            console.log("myfile",file.name)
            setFileName(file);
          } else {
            setFileName("No photo selected");
          }
      };

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
            setFirstCandidat(sorted[0])
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


    const getElection = async () => {

        const resp = await fetch(urlApi, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });

            if (!resp.ok) {
              throw new Error(`Erreur HTTP: ${resp.status}`);
            }

            const data = await resp.json();
            console.log("election",data)


    };

  const deleteElection = async() => {

        try{
                
                const response = await fetch(`http://192.168.178.194:8000/election/${electionId}` , {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                    },

                });

                

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

    const addFileCandidat =async() => {
        if (urlApi) return await getElection()
        if (!['csv', 'json', 'excell'].includes(fileName.name.split('.').pop().toLowerCase())) return setIsAuthorizedFileExtention(true)
        const formData = new FormData();
        formData.append("file", fileName);
        try {
              const res =  await fetch("http://192.168.178.194:8000/upload",  {
              method: "POST",         
              body: formData,
            });

            if (!res.ok){
       
                 const errorJson = await res.json();
                 throw new Error(`Erreur ${res.status}: ${errorJson.error || "Erreur inconnue"}`);

            }
            const data = await res.json()
            console.log("give me my data",data)
            
            setLoadFileMessage({...loadFileMessage,errorSchema:data.schema_error,errorsColType:data.error_col_type})
         




        } catch (err) {
            console.log(err);
      }

    };

   

    const handleDownload = async (apiName,fileName) => {
      try {
        const response = await fetch(`http://192.168.178.194:8000/elections/${apiName}`);
        if (!response.ok) throw new Error("Network response was not ok");

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = fileName
        document.body.appendChild(a);
        a.click();
        a.remove();
        //
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading file:", error);
      }
    };






      
    if (loading) return <div>Chargement des élections...</div>;
    if (error) return <div>Erreur: {error}</div>;

    if(isElectionCreate){
      return <ElectionConfirmation election={newElection} backToListElection={backToListElection}/>
    }


    return (

      <>

        <FormContainer 
          currentView={currentView} 
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
          fileName={fileName}
          handleFileChange={handleFileChange}
          addFileCandidat={addFileCandidat}
          isAuthorizedFileExtention={isAuthorizedFileExtention}
          setIsAuthorizedFileExtention={setIsAuthorizedFileExtention}
          setFileName={setFileName}
          setUrlApi = {setUrlApi}
          urlApi={urlApi}
          loadFileMessage={loadFileMessage}
          setLoadFileMessage={setLoadFileMessage}
          messageToAnalyseFile={messageToAnalyseFile}
          setMessageToAnalyseFile={setMessageToAnalyseFile}
          listOption={listOption}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          handleDownload={handleDownload}
          infoUser={infoUser}
          firstCandidat={firstCandidat}

        />
      </>

    )


    }




    const FormContainer = ({
                            newElection,
                            setNewElection,
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
                            sortedList,
                            totalVote,
                            totalVoter,
                            backToHome,
                            dateError,
                            isUser,
                            user,
                            give_election_result,
                            fileName,
                            setFileName,
                            handleFileChange,
                            addFileCandidat,
                            isAuthorizedFileExtention,
                            setIsAuthorizedFileExtention,
                            setUrlApi,
                            urlApi,
                            loadFileMessage,
                            setLoadFileMessage,
                            messageToAnalyseFile,
                            setMessageToAnalyseFile,
                            listOption,
                            selectedOption,
                            setSelectedOption,
                            handleDownload,
                            infoUser,
                            firstCandidat,
                            

                      
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
                < MyTestArea 
                  state={{
                      value:newElection.description,
                      setValue: (desc) =>
                                  setNewElection((prev) => ({
                                    ...prev,
                                    description: desc
                      }))
                      
                  }}
                />

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
              
              <AddCandidatWithFileOrApi 
                   urlApi={urlApi} 
                   setUrlApi={setUrlApi} 
                   handleFileChange={handleFileChange} 
                   addFileCandidat={addFileCandidat}
                   isAuthorizedFileExtention={isAuthorizedFileExtention}
                   setIsAuthorizedFileExtention={setIsAuthorizedFileExtention}
                   fileName={fileName}
                   setFileName={setFileName}
                   loadFileMessage={loadFileMessage}
                   setLoadFileMessage={setLoadFileMessage}
                   messageToAnalyseFile={messageToAnalyseFile}
                   setMessageToAnalyseFile={setMessageToAnalyseFile}
                   listOption = {listOption}
                   selectedOption = {selectedOption}
                   setSelectedOption = {setSelectedOption}
                   handleDownload= {handleDownload}
              />

              <CreateNewCandidat 
                   candidats={newElection.candidates}
                   newCandidate={newCandidate}
                   setNewCandidate={setNewCandidate}
                   addCandidate={addCandidate}
              />
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
          {currentView=="vote"&& <LiveElection election={election} userInfo={infoUser}/> }
          
          {currentView === "list"&&
          
                <div className="elections-grid">

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
                    <span className="stat-value">{totalVote}</span>
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
                      {!firstCandidat? <span>En tête: no vote rigth now</span>:<span>En tête: {firstCandidat.candidat_name}</span>}
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



  


  const SaveCandidats = ({addFileCandidat,giveStatusSaveFile}) => {
    const callFunction = () =>{
           addFileCandidat()
           giveStatusSaveFile()

    }

    

     return  <button onClick={callFunction} className="save-election-btn">
                <Save className="icon-sm" /> Add File candidats
             </button>

  }
  




  const DownloadFile =  ({handleDownloadFile, apiName, fileName,children}) => {
      
       const onClickDownload = async () => {
          await handleDownloadFile(apiName, fileName);
       };
      return <button onClick={onClickDownload} className="save-election-btn">
                 <Download className="icon-sm" /> {children}
             </button>
  }
  
  const ChangeFile = ({changeFile}) =>{
       return <button onClick={changeFile} className="save-election-btn">
                  change file
             </button>

  }

  const CloseOrOpen = ({isOpen,setIsOpen,addType}) => {

      
     return  (
             <>
              <div style={{ padding: "10px" ,display:"flex",flexDirection:"row",justifyContent:"space-between",background:"rgb(183 201 230)",borderRadius:"6px"}}
                   onClick={() => setIsOpen(!isOpen)}

              >
                {isOpen ? addType + " ❌" :addType + "✅"}
              </div>
            </>
     )
  }


  const AddCandidatWithFileOrApi = ({
                                     urlApi,
                                     setUrlApi,
                                     fileName,
                                     setFileName,
                                     loadFileMessage,
                                     addFileCandidat,
                                     isAuthorizedFileExtention,
                                     setIsAuthorizedFileExtention,
                                     setLoadFileMessage,
                                     messageToAnalyseFile,
                                     setMessageToAnalyseFile,
                                     listOption,
                                     selectedOption,
                                     setSelectedOption,
                                     handleDownload,
                                    }) => {
        
         const [isOpen, setIsOpen] = useState(false);
          
         return (
               <>  
                   <CloseOrOpen isOpen={isOpen} setIsOpen={setIsOpen} addType="AddCandidatWithFileOrApi"/>
                   {isOpen&&<div className="candidates-section"> 
                    
                        <AddCandidatWithFile 
                          fileName={fileName} 
                          setFileName={setFileName}
                          addFileCandidat={addFileCandidat} 
                          isAuthorizedFileExtention={isAuthorizedFileExtention}
                          setIsAuthorizedFileExtention={setIsAuthorizedFileExtention}
                          loadFileMessage={loadFileMessage}
                          setLoadFileMessage={setLoadFileMessage}
                          messageToAnalyseFile={messageToAnalyseFile}
                          setMessageToAnalyseFile={setMessageToAnalyseFile}
                          listOption={listOption}
                          selectedOption={selectedOption}
                          setSelectedOption={setSelectedOption}
                          handleDownload={handleDownload}
  
                   
                        />
                        <AddCandidatWithApi setUrlApi={setUrlApi} urlApi={urlApi}/>
                        
                     
                      </div>
                   }
               </>


         )

  }
  
  const AddCandidatWithApi = ({urlApi,setUrlApi}) => {

      return (
             <>
                <div className="form-group">
                      <label>load data*</label>
                      <input
                        type="text"
                        placeholder="Entrez l'URL de l'API"
                        value={urlApi}
                       
                        onChange={(e) => setUrlApi( e.target.value)}
                        className="form-input-file"
                      />
                </div>
             </>

      )


  }


  
  const AddCandidatWithFile = ({
                                 fileName,
                                 setFileName,
                                 loadFileMessage,
                                 setLoadFileMessage,
                                 isAuthorizedFileExtention,
                                 setIsAuthorizedFileExtention,
                                 messageToAnalyseFile,
                                 setMessageToAnalyseFile,
                                 listOption,
                                 selectedOption,
                                 setSelectedOption,
                                 handleDownload,
                                 addFileCandidat
                                }) => {

   
    const [isYes,setIsYes] = useState(false)
    const [isFileSaveCorrectly,setIsFileSaveCorrectly] = useState(false)
    

    

    useEffect(() => {
      if(fileName){
        console.log("lennnnn",fileName.name)
        setIsFileSaveCorrectly(false)
      }
    }, [fileName]);

    



    const handleDownloadFile = async (apiName,fileName) => {
          console.log("nmssss", apiName ,fileName)
          try {
            const response = await fetch(`http://192.168.178.194:8000/${apiName}`);
            if (!response.ok) throw new Error("Network response was not ok");

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = fileName
            document.body.appendChild(a);
            a.click();
            a.remove();
            //
            window.URL.revokeObjectURL(url);
          } catch (error) {
            console.error("Error downloading file:", error);
          }
    };


    const giveStatusSaveFile = () =>{
         setIsFileSaveCorrectly(true)

    }

    const changeFile = () => {
         resetFileState()

    }
  

    const deleteFile = () =>{
        setIsAuthorizedFileExtention(false)
        resetFileState()
    };

    const resetFileState = () => {
      setFileName(null);
      setLoadFileMessage({
        errorSchema: "",
        errorsColType: [],
      });
};


    const handleFileChange = (e) => {
          const file = e.target.files?.[0];
          if (file) {
            setFileName(file);
            setLoadFileMessage({...loadFileMessage,errorSchema:"",errorsColType:[]})
          } 

          // Réinitialise la valeur de l’input pour pouvoir recharger le même fichier
          e.target.value = null;
    };

    const analyseFile = () =>{
         setIsYes(true)
          
    }
    const analyseFile1 = () =>{
         setIsYes(false)
          
    }

    return (
             <>
                  <div className="form-group">
                     <div style={{display:"flex",flexDirection:"row",gap:"2px"}}>
                         <div>
                              <label>load file*</label>
                              <input
                                type="file"
                                accept=".csv, .json, .xlsx, .xls"
                                id="fileInput"
                                style={{ display: "none" }}
                                onChange={handleFileChange}

                                className="form-input-file"
                              />
                              {/* bouton personnalisé pour ouvrir l’explorateur */}
                              <label htmlFor="fileInput" className="form-input-file custom-upload-button">
                                Upload a file Accepted formats: CSV,JSON,EXCELL
                              </label>
                          </div>
                          <div>
                              <DownloadFile handleDownloadFile={handleDownloadFile} apiName="download-format" fileName="expected_format.csv">  
                                  download expected File Format
                              </DownloadFile>
                          </div>
                      </div>
                      { fileName && <>
                               {!isFileSaveCorrectly && <div style={{display:"flex", flexDirection:"column",gap:"4px",height:"180px",backgroundColor:"#e5e7eb",padding:"1rem",borderRadius:"6px"}}>
                                  <div style={{display:"flex", flexDirection:"row",justifyContent:"space-between",backgroundColor:"#e5e7eb",borderRadius:"6px"}}>
                                      <p className="file-name">{fileName.name}  <span style={{color:"red"}}>is correct fille you want to insert ?? </span></p>
                                      <button onClick={deleteFile} className="close-button">×</button>
                                  </div>
                                   <div style={{display:"flex", flexDirection:"row",backgroundColor:"#e5e7eb",gap:"3px"}}>
                                      <ChangeFile changeFile={changeFile}/>
                                      <SaveCandidats addFileCandidat={addFileCandidat} giveStatusSaveFile={giveStatusSaveFile}/>
                                    </div>

                                 </div>
                                
                               }
                         </>
                      }



                      {isAuthorizedFileExtention&&<p style={{color:"red"}}>this file is not authorized give csv or json or excell file!!</p>}
                      <p style={{color:"red"}}> {loadFileMessage.errorSchema?loadFileMessage.errorSchema:""}</p>
                      {isFileSaveCorrectly &&<div>
                                                          
                              
                                                          <p style={{color:"red"}}> {loadFileMessage.errorsColType?"error column typ and to see all error download errors file!!!!!!!!!!":""}</p>
                                                          <DownloadFile handleDownloadFile={handleDownloadFile} apiName="download-errors" fileName="errors.json"> 
                                                              download errors file
                                                          </DownloadFile>
                                                          <p style={{color:"green"}}>do you want that we anlyse your file with correct schema ? <span onClick={analyseFile}>YES</span> <span onClick={analyseFile1}>NO</span> </p>

                                                          {isYes?
                                                            
                                                              <div>   
                                                                  <h2>Choose our file validation service :</h2>
                                                                  {listOption.map((item)=> (
                                                                    <MycheckBox state={{
                                                                            selected:selectedOption,
                                                                            setSelected:setSelectedOption
                                                                            }}

                                                                            value={item}
                                                                    />
                                                                  )
                                                                    
                                                                  )}

                                                                  <MyTestArea 
                                                                    state = {{
                                                                            value: messageToAnalyseFile,
                                                                            setValue: setMessageToAnalyseFile

                                                                    }}
                                                                    text="describe how i can validate your file..."
                                                                  />
                                                                
                                                                
                                                              </div>
                                                            : ""}  
                                                     </div>
                      
                      
                      }
                      {loadFileMessage.errorsRow&& <p style={{color:"red"}}> {loadFileMessage.errorsRow}</p> }   
                      
                  </div>  
             
             </>


    )


  }

  const MyTestArea = ({state,text}) => {
   
    const {value,setValue} = state 

    const handleChange = (e) => {
          const message = e.target.value;
          if (message){
            setValue(message)

          }

     }
     return (
          <>
               <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={value}
                    onChange={handleChange}
                    placeholder={text}
                    className="form-textarea"
                    rows={3}
                  />
                </div>
            
          
          </>

     )

  }


  const MycheckBox = ({state ,value}) =>{
         const {selected,setSelected} = state

         const handleToggle = (option) => {
             
              setSelected((prev) =>
                   prev.includes(option)
                   ? prev.filter((item) => item !== option)
                   : [...prev,option]    

              );
               

         }

         return (
                  <div>
                     
                      
                      <label>
                        <input
                          type="checkbox"
                          checked={selected.includes(value)}
                          onChange={() => handleToggle(value)}
                        />
                        {value}
                      </label>
                      <br />
                  </div>

         )

  }


  const CreateNewCandidat = ({candidats,newCandidate,setNewCandidate, addCandidate}) => {
     const [isOpen,setIsOpen] = useState(false)

     return(
            <>
              <CloseOrOpen isOpen={isOpen} setIsOpen={setIsOpen} addType="AddCandodatWithForm"/>
              {isOpen&&<div className="candidates-section">
                  <h3>Candidats ({candidats?.length || 0})</h3>
                  <CandidatsCreated candidats={candidats}/>
                  <AddCandidatForm newCandidate={newCandidate} setNewCandidate={setNewCandidate} addCandidate={addCandidate}/>
                
                </div>
              } 
            </>
    
          )
  }


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
                        id="fileInput"
                        style={{ display: "none" }}

                        onChange={(e) => {
                          const file = e.target.files[0];
                          const updated = { ...newCandidate, photo: file };
                          setNewCandidate(updated);
                        }}
                        className="form-input-file"
                      />
                      {/* bouton personnalisé pour ouvrir l’explorateur */}
                      <label htmlFor="fileInput" className="form-input-file custom-upload-button">
                        📷 Upload a photo Accepted formats: JPG, PNG, GIF
                      </label>

                      {/* nom du fichier ou placeholder personnalisé */}
                       <p className="file-name">{newCandidate.photo ? newCandidate.photo.name : "No file selected"}</p>

                            {/* Aperçu de l’image */}
                        {newCandidate.photo && (
                          <img
                            src={URL.createObjectURL(newCandidate.photo)}
                            alt="Preview"
                            style={{ width: 200, height: 200, objectFit: "cover", marginTop: 10 }}
                          />
                        )}
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