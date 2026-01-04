import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContextNew";
import { useBackground } from "../context/BackgroundContext";

function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getCurrentBackground } = useBackground();
  const currentBg = getCurrentBackground();

  return (
    <div className="min-h-screen relative overflow-hidden -mt-16 pt-16">
      {/* Dynamic Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80 z-10"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{
          backgroundImage: currentBg ? `url("${currentBg.url}")` : 'url(https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)'
        }}
      ></div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto">
          {/* Logo/Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-2xl">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKmU9dSLiRVEXb4zI0EqhwJg3LCrW_HdvLH6IP7_K_74Fi2lMh9nyBkYIGiD8elEKSRyw&usqp=CAU" 
                alt="Help Nearby Logo" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Help <span className="text-green-400">Nearby</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Connect with your community. Request help or offer assistance to those in need around you.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            {user ? (
              <>
                <button
                  onClick={() => navigate('/post-request')}
                  className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center"
                >
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Post a Request
                </button>
                <button
                  onClick={() => navigate('/requests')}
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold text-lg rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center"
                >
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Help Someone
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Get Started
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold text-lg rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Create Account
                </button>
              </>
            )}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Location Based</h3>
              <p className="text-white/70 text-sm">Find help requests near your location and connect with neighbors.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Real-time</h3>
              <p className="text-white/70 text-sm">Get instant notifications when someone needs help nearby.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Community</h3>
              <p className="text-white/70 text-sm">Build stronger communities by helping each other.</p>
            </div>
          </div>
        </div>

        {/* View Map Button */}
        <button
          onClick={() => navigate('/map')}
          className="fixed bottom-6 right-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center z-30"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          View Map
        </button>
      </div>
    </div>
  );
}

export default Home;