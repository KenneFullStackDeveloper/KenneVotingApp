
import React, { useState } from 'react';
import './admin.css'; // Don't forget to create this CSS file
import { Plus, Trash2, Edit3, Eye, Share2, BarChart3, Settings, Save, Users, Trophy,Check, Clock,  Vote, Maximize } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 




const AdminDropdownMenu = ({isLogin}) => {
  const [isOpen, setIsOpen] = useState(false);
   const navigate = useNavigate(); 



   const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleAddUser = () => {
    alert("Navigating to Add User page...");
    setIsOpen(false); 
  };

  const handleCreateElection = () => {
    console.log("LE LOO",isLogin)
    if (isLogin.isLog === true && isLogin.role === "admin" ){
        navigate('/Election', { state: { isFromAdmin: true ,userRole: isLogin.role} });
    }
    else{
      navigate('/')
    }
    
    setIsOpen(false); // Close dropdown after clicking
  };

  return (
    <div className="admin-dropdown-container">
      <button className="dropdown-toggle-button" onClick={toggleDropdown}>
        ADMIN <span className={`arrow ${isOpen ? 'up' : 'down'}`}>  <Settings className="icon-sm" /> </span>
      </button>

      {isOpen && (
        <ul className="dropdown-menu">
          <li className="dropdown-item" onClick={handleAddUser}>
            Ajouter utilisateur et droits
          </li>
          <li className="dropdown-item" onClick={handleCreateElection}>
            Créer une élection
          </li>
        </ul>
      )}
    </div>
  );
};

export default AdminDropdownMenu;