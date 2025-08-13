import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  
  // Using grey cards with dark text for better visibility
  const heroTextClass = 'text-white';
  const cardBgClass = 'bg-gray-100';
  const iconBgClass = 'bg-green-100';
  
  const backgroundImages = useMemo(() => [
    'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', // Helping hands together
    'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', // Community support
    'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', // People on beach helping
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', // Team collaboration
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', // Four person hands wrap around shoulders at sunset
    'https://plus.unsplash.com/premium_photo-1678837404951-578690ddd9c7?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' // Premium community image
  ], []);

  useEffect(() => {
    document.title = 'Help Nearby';
    
    // Preload all background images for smooth transitions
    backgroundImages.forEach((imageSrc) => {
      const img = new Image();
      img.src = imageSrc;
    });
  }, [backgroundImages]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 5000); // Change background every 5 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out z-0"
        style={{
          backgroundImage: `url(${backgroundImages[currentBgIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 min-h-screen flex flex-col">
        {/* Hero Section */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <div className="max-w-6xl mx-auto text-center">
            {/* Main Title */}
            <div className="mb-16">
              <h1 
                className={`text-5xl md:text-7xl font-bold mb-6 leading-tight ${heroTextClass}`}
              >
                A world where , helping is just next door.
              </h1>
              
              <p 
                className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-12 ${heroTextClass} opacity-95`}
              >
                Find help. Offer help. Build community.
              </p>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="relative z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Request Help Card */}
              <div className={`${cardBgClass} rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 service-card`}>
                <div className={`w-16 h-16 ${iconBgClass} rounded-2xl flex items-center justify-center mb-6`}>
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 service-card-title">Request Help</h3>
                <p className="mb-6 leading-relaxed service-card-text">
                  Need assistance? Post your request and connect with helpful community members nearby.
                </p>
                <Link 
                  to="/post-request" 
                  className="inline-flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors"
                >
                  Learn More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Offer Help Card */}
              <div className={`${cardBgClass} rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 service-card`}>
                <div className={`w-16 h-16 ${iconBgClass} rounded-2xl flex items-center justify-center mb-6`}>
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 service-card-title">Offer Help</h3>
                <p className="mb-6 leading-relaxed service-card-text">
                  Ready to help? Browse community requests and make a positive impact in your neighborhood.
                </p>
                <Link 
                  to="/requests" 
                  className="inline-flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors"
                >
                  Learn More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Community Map Card */}
              <div className={`${cardBgClass} rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 service-card`}>
                <div className={`w-16 h-16 ${iconBgClass} rounded-2xl flex items-center justify-center mb-6`}>
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 service-card-title">Community Map</h3>
                <p className="mb-6 leading-relaxed service-card-text">
                  Explore help requests and community activities on an interactive map of your area.
                </p>
                <Link 
                  to="/map" 
                  className="inline-flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors"
                >
                  Learn More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Support Network Card */}
              <div className={`${cardBgClass} rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 service-card`}>
                <div className={`w-16 h-16 ${iconBgClass} rounded-2xl flex items-center justify-center mb-6`}>
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 service-card-title">Support Network</h3>
                <p className="mb-6 leading-relaxed service-card-text">
                  Join a growing network of community helpers building stronger neighborhoods together.
                </p>
                <Link 
                  to="/register" 
                  className="inline-flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors"
                >
                  Learn More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
