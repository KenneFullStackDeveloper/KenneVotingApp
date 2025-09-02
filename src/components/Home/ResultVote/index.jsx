import React, { useState } from 'react';
import { 
  FaUser, 
  FaChartLine, 
  FaCalendarAlt, 
  FaCog, 
  FaSignOutAlt,
  FaBell,
  FaSearch,
  FaVoteYea,
  FaChevronDown,
  FaChevronRight,
  FaFilter,
  FaDownload
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const ResultVote = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Données des élections
  const elections = [
    { id: 1, title: "Élection du Conseil d'Administration", date: "15 Nov 2023", status: "Terminé", participants: 245, votes: 198 },
    { id: 2, title: "Référendum sur les Nouvelles Règles", date: "22 Nov 2023", status: "En cours", participants: 312, votes: 267 },
    { id: 3, title: "Élection des Représentants", date: "30 Nov 2023", status: "À venir", participants: 189, votes: 0 },
  ];

  // Statistiques
  const stats = [
    { title: "Élections totales", value: "12", change: "+2", changeType: "positive" },
    { title: "Taux de participation", value: "78%", change: "+5%", changeType: "positive" },
    { title: "Votes en attente", value: "45", change: "-12", changeType: "negative" },
    { title: "Utilisateurs actifs", value: "856", change: "+34", changeType: "positive" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-blue-900 text-white transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex items-center justify-between p-5 border-b border-blue-800">
          <div className="flex items-center space-x-3">
            <FaVoteYea className="h-8 w-8 text-blue-300" />
            <span className="text-xl font-bold">VoteSecure</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-blue-300 hover:text-white"
          >
            <FaChevronRight />
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          {[
            { icon: FaChartLine, label: "Tableau de bord", active: true },
            { icon: FaUser, label: "Électeurs" },
            { icon: FaCalendarAlt, label: "Élections" },
            { icon: FaCog, label: "Paramètres" },
          ].map((item, index) => (
            <motion.button
              key={index}
              whileHover={{ x: 5 }}
              className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${item.active ? 'bg-blue-800 text-white' : 'text-blue-200 hover:bg-blue-800 hover:text-white'}`}
            >
              <item.icon />
              <span>{item.label}</span>
            </motion.button>
          ))}
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-blue-800">
          <button className="flex items-center space-x-3 w-full p-3 text-blue-200 hover:bg-blue-800 hover:text-white rounded-lg transition-colors">
            <FaSignOutAlt />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0 m-24">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600 p-2 rounded-md hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div className="relative flex-1 max-w-md mx-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100">
                <FaBell className="h-5 w-5" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                  KW
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">Kristin Watson</p>
                  <p className="text-xs text-gray-500">Administrateur</p>
                </div>
                <FaChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
            <p className="text-gray-600">Bienvenue dans votre espace administrateur VoteSecure</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
              >
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <div className="flex items-baseline mt-2">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <span className={`ml-2 text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Elections Section */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Élections récentes</h2>
              <div className="flex space-x-3">
                <button className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <FaFilter className="h-4 w-4" />
                  <span>Filtrer</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <FaDownload className="h-4 w-4" />
                  <span>Exporter</span>
                </button>
              </div>
            </div>
            
            <div className="divide-y divide-gray-100">
              {elections.map((election) => (
                <motion.div
                  key={election.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{election.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{election.date}</p>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          election.status === 'Terminé' ? 'bg-green-100 text-green-800' :
                          election.status === 'En cours' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {election.status}
                        </span>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-900">{election.votes}</p>
                        <p className="text-xs text-gray-500">votes</p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-900">{election.participants}</p>
                        <p className="text-xs text-gray-500">participants</p>
                      </div>
                      
                      <button className="text-blue-600 hover:text-blue-800">
                        <FaChevronRight />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Participation Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Taux de participation</h3>
              <div className="h-64 flex items-end space-x-4">
                {[40, 70, 100, 85, 60, 90, 75].map((height, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-gradient-to-b from-blue-400 to-blue-600 rounded-t-lg"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs text-gray-500 mt-2">{['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'][index]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Results Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Résultats des votes</h3>
              <div className="space-y-4">
                {[
                  { label: "Option A", value: 45, color: "bg-blue-500" },
                  { label: "Option B", value: 30, color: "bg-green-500" },
                  { label: "Option C", value: 15, color: "bg-yellow-500" },
                  { label: "Option D", value: 10, color: "bg-red-500" },
                ].map((item, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{item.label}</span>
                      <span className="text-gray-500">{item.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`${item.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default ResultVote;