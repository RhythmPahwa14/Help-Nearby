// src/pages/Requests.js
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useTheme } from '../context/ThemeContext';

function Requests() {
  const [requests, setRequests] = useState([]);
  const { theme } = useTheme();

  // Get current effective theme
  const effectiveTheme = theme === 'system' 
    ? (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme;

  useEffect(() => {
    const fetchRequests = async () => {
      const querySnapshot = await getDocs(collection(db, "helpRequests"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRequests(data);
    };

    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Full Page Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Overlay for better text readability */}
        <div className={`absolute inset-0 ${effectiveTheme === 'dark' ? 'bg-black/70' : 'bg-black/50'}`}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 min-h-screen pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Community Help
              <br />
              <span className="text-green-400">Requests</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Connect with your community and make a difference. Browse help requests or create your own.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300 hover:scale-105 shadow-lg">
              POST REQUEST
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-105 shadow-lg">
              VIEW ALL REQUESTS
            </button>
          </div>

          {/* Requests Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {requests.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-12 max-w-md mx-auto">
                  <h3 className="text-2xl font-bold text-white mb-4">No Requests Yet</h3>
                  <p className="text-white/80 mb-6">Be the first to post a help request in your community.</p>
                  <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300">
                    Create First Request
                  </button>
                </div>
              </div>
            ) : (
              requests.map((req) => (
                <div key={req.id} className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-lg">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2">Help Request</h3>
                    <p className="text-white/90 text-sm leading-relaxed">
                      {req.description || "No description provided"}
                    </p>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-white/80 text-sm">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span>
                        {req.location?.lat && req.location?.lng
                          ? `Lat: ${req.location.lat.toFixed(4)}, Lng: ${req.location.lng.toFixed(4)}`
                          : "Location not available"}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-white/80 text-sm">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span>
                        {req.createdAt?.toDate
                          ? req.createdAt.toDate().toLocaleDateString()
                          : "Date unknown"}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all duration-300 text-sm">
                      I CAN HELP
                    </button>
                    <button className="px-4 py-2 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300 text-sm">
                      VIEW DETAILS
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Requests;
