import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useBackground } from "../context/BackgroundContext";

function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getCurrentBackground } = useBackground();
  const currentBg = getCurrentBackground();
  const [isVisible, setIsVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => setStatsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen relative overflow-hidden -mt-16 pt-16">
      {/* Dynamic Background with enhanced overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/88 via-black/75 to-black/88 z-10"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{
          backgroundImage: currentBg ? `url("${currentBg.url}")` : 'url(https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)'
        }}
      ></div>

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 py-6 text-center overflow-hidden">
        {/* Hero Section */}
        <div className={`max-w-6xl mx-auto w-full transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Logo/Icon with animation */}
          <div className="mb-4">
            <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-green-400 via-green-500 to-green-600 flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300 border-2 border-white/20">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKmU9dSLiRVEXb4zI0EqhwJg3LCrW_HdvLH6IP7_K_74Fi2lMh9nyBkYIGiD8elEKSRyw&usqp=CAU" 
                alt="Help Nearby Logo" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Title with gradient */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-green-100 to-green-400 mb-3 tracking-tight leading-tight">
            Help <span className="text-green-400">Nearby</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-xl lg:text-2xl text-white/90 mb-6 max-w-3xl mx-auto leading-relaxed font-medium">
            Connect with your community. Request help or offer assistance to those in need around you.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-6">
            {user ? (
              <>
                <button
                  onClick={() => navigate('/post-request')}
                  className="group px-8 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold text-base rounded-xl shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 flex items-center relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                  <svg className="w-5 h-5 mr-2 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="relative z-10">Post a Request</span>
                </button>
                <button
                  onClick={() => navigate('/requests')}
                  className="group px-8 py-3 bg-white/10 hover:bg-white/25 backdrop-blur-md text-white font-bold text-base rounded-xl border-2 border-white/30 shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-105 flex items-center relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <svg className="w-5 h-5 mr-2 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="relative z-10">Help Someone</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="group px-8 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold text-base rounded-xl shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                  <span className="relative z-10">Get Started</span>
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="group px-8 py-3 bg-white/10 hover:bg-white/25 backdrop-blur-md text-white font-bold text-base rounded-xl border-2 border-white/30 shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-105 relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative z-10">Create Account</span>
                </button>
              </>
            )}
          </div>

          {/* Features with enhanced cards - Compact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-6">
            <div className="group bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/20 hover:border-green-500/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-green-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-green-500/50 transform group-hover:rotate-6 transition-all duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-green-300 transition-colors">Location Based</h3>
                <p className="text-white/80 text-sm leading-relaxed">Find help requests near you and connect with neighbors.</p>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/20 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-blue-500/50 transform group-hover:rotate-6 transition-all duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-blue-300 transition-colors">Real-time</h3>
                <p className="text-white/80 text-sm leading-relaxed">Get instant notifications when someone needs help.</p>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/20 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-purple-500/50 transform group-hover:rotate-6 transition-all duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-purple-300 transition-colors">Community</h3>
                <p className="text-white/80 text-sm leading-relaxed">Build stronger communities by helping each other.</p>
              </div>
            </div>
          </div>

          {/* Stats Section - Compact
          <div className={`grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-4 transition-all duration-1000 delay-300 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-green-400 mb-1">5K+</div>
              <div className="text-xs md:text-sm text-white/70">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-1">10K+</div>
              <div className="text-xs md:text-sm text-white/70">Requests Fulfilled</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-1">50+</div>
              <div className="text-xs md:text-sm text-white/70">Communities</div>
            </div>
          </div> */}

          {/* Trust Indicators - Compact
          <div className="flex flex-wrap justify-center items-center gap-4 text-white/60 text-xs md:text-sm">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>100% Free</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>Trusted Platform</span>
            </div> */}
          {/* </div> */}
        </div>

        {/* View Map Button - Compact */}
        <button
          onClick={() => navigate('/map')}
          className="fixed bottom-6 right-6 px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold text-sm rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-110 flex items-center z-30 group"
        >
          <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          <span>View Map</span>
        </button>
      </div>
    </div>
  );
}

export default Home;