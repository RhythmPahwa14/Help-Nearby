import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function Home() {
  const { t } = useTranslation();
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Create floating particles
    const newParticles = [];
    for (let i = 0; i < 30; i++) {
      newParticles.push({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 20,
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div 
      className="min-h-screen relative overflow-hidden transition-colors duration-300"
      style={{
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        backgroundImage: `
          linear-gradient(rgba(var(--bg-primary-rgb), 0.95), rgba(var(--bg-primary-rgb), 0.95)),
          url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23000000' stroke-width='1' stroke-opacity='0.05'%3E%3Ccircle cx='20' cy='20' r='8'/%3E%3Ccircle cx='80' cy='20' r='8'/%3E%3Ccircle cx='50' cy='50' r='12'/%3E%3Ccircle cx='20' cy='80' r='8'/%3E%3Ccircle cx='80' cy='80' r='8'/%3E%3Cpath d='M20 20l30 30m30-30l-30 30m-30 30l30-30m30 30l-30-30'/%3E%3C/g%3E%3C/svg%3E")
        `,
        backgroundSize: '100px 100px'
      }}
    >
      {/* Animated Background Particles */}
      <div className="particles">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.left}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>
      
      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          
          {/* Main Heading with Animation */}
          <div className="slide-in-bottom">
            <h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8 px-1 sm:px-2"
              style={{
                wordBreak: 'break-word', 
                overflowWrap: 'break-word', 
                hyphens: 'none', 
                whiteSpace: 'normal',
                fontFamily: 'Outfit, sans-serif',
                color: 'var(--text-primary)'
              }}
            >
              <span 
                style={{
                  background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {t('hero_title_1')}
              </span>
              <br />
              <span 
                className="drop-shadow-2xl"
                style={{
                  color: 'var(--text-primary)', 
                  fontWeight: '600'
                }}
              >
                {t('hero_title_2')}
              </span>
            </h1>
          </div>
          
          {/* Subtitle with Delay Animation */}
          <div className="slide-in-left" style={{ animationDelay: '0.3s' }}>
            <p 
              className="text-sm sm:text-base md:text-lg lg:text-xl max-w-4xl mx-auto mb-12 leading-relaxed px-1 sm:px-2"
              style={{
                wordBreak: 'break-word', 
                overflowWrap: 'break-word', 
                hyphens: 'none', 
                whiteSpace: 'normal',
                color: 'var(--text-secondary)', 
                fontWeight: '500'
              }}
            >
              {t('hero_subtitle')}
            </p>
          </div>
          
          {/* Interactive Stats */}
          <div className="slide-in-right mb-12" style={{ animationDelay: '0.6s' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center group">
                <div 
                  className="text-4xl font-bold mb-2 transition-all duration-300"
                  style={{ 
                    color: 'var(--text-primary)',
                    fontFamily: 'Outfit, sans-serif'
                  }}
                >
                  500+
                </div>
                <div 
                  className="text-sm font-medium"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Requests Fulfilled
                </div>
              </div>
              <div className="text-center group">
                <div 
                  className="text-4xl font-bold mb-2 transition-all duration-300"
                  style={{ 
                    color: 'var(--text-primary)',
                    fontFamily: 'Outfit, sans-serif'
                  }}
                >
                  1000+
                </div>
                <div 
                  className="text-sm font-medium"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Active Volunteers
                </div>
              </div>
              <div className="text-center group">
                <div 
                  className="text-4xl font-bold mb-2 transition-all duration-300"
                  style={{ 
                    color: 'var(--text-primary)',
                    fontFamily: 'Outfit, sans-serif'
                  }}
                >
                  50+
                </div>
                <div 
                  className="text-sm font-medium"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Communities
                </div>
              </div>
            </div>
          </div>
          
          {/* Call to Action Buttons */}
          <div className="slide-in-bottom flex flex-col sm:flex-row justify-center items-center gap-4" style={{ animationDelay: '0.9s' }}>
            <Link
              to="/view-requests"
              className="px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:opacity-80"
              style={{
                backgroundColor: 'var(--text-primary)',
                color: 'var(--bg-primary)',
                fontFamily: 'Outfit, sans-serif'
              }}
            >
              {t('see_requests')}
            </Link>
            
            <Link
              to="/request"
              className="px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:opacity-80 border"
              style={{
                backgroundColor: 'transparent',
                color: 'var(--text-primary)',
                borderColor: 'var(--text-primary)',
                fontFamily: 'Outfit, sans-serif'
              }}
            >
              {t('post_request')}
            </Link>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bounce">
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
