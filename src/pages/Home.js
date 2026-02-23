import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="fixed inset-0 -mt-16">
      {/* Full Screen Background */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-top" 
        style={{ 
          backgroundImage: "url('/annie-spratt-9VpI3gQ1iUo-unsplash.jpg')" 
        }}
      >
        <div className="w-full h-full hero-overlay"></div>
      </div>
      
      {/* Content Container */}
      <div className="relative min-h-screen flex flex-col overflow-y-auto pt-16">

        {/* Main Content Area */}
        <main className="relative z-10 flex-1 flex flex-col justify-center px-6 lg:px-20 max-w-7xl mx-auto w-full pb-24">
          {/* Hero Content */}
          <div className={`max-w-3xl mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
              Help Nearby
            </h2>
            <p className="text-lg lg:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl">
              Connect with your community. Request help or offer assistance to those in need around you. Building trust through local action.
            </p>
            <div className="flex flex-wrap gap-4">
              {!user ? (
                <>
                  <button 
                    onClick={() => navigate('/login')}
                    className="bg-primary hover:bg-primary/90 text-black px-10 py-4 rounded-xl text-base font-extrabold transition-all shadow-lg shadow-primary/20"
                  >
                    Get Started
                  </button>
                  <button 
                    onClick={() => navigate('/register')}
                    className="glass-card hover:bg-white/20 text-white border-white/30 px-10 py-4 rounded-xl text-base font-extrabold transition-all"
                  >
                    Create Account
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => navigate('/post-request')}
                    className="bg-primary hover:bg-primary/90 text-deep-teal px-10 py-4 rounded-xl text-base font-extrabold transition-all shadow-lg shadow-primary/20"
                  >
                    Post a Request
                  </button>
                  <button 
                    onClick={() => navigate('/requests')}
                    className="glass-card hover:bg-white/20 text-white border-white/30 px-10 py-4 rounded-xl text-base font-extrabold transition-all"
                  >
                    Help Someone
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Features Grid (Overlapping) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="glass-card rounded-xl p-8 flex flex-col gap-4 transform hover:-translate-y-2 transition-all duration-300">
              <div className="bg-primary/20 text-primary w-12 h-12 rounded-lg flex items-center justify-center">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-white text-xl font-bold mb-2">Location Based</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Find help requests near you and connect with neighbors instantly using our interactive mapping tools.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="glass-card rounded-xl p-8 flex flex-col gap-4 transform hover:-translate-y-2 transition-all duration-300">
              <div className="bg-primary/20 text-primary w-12 h-12 rounded-lg flex items-center justify-center">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-white text-xl font-bold mb-2">Real-time</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Get instant notifications when someone in your vicinity needs help. Never miss an opportunity to assist.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="glass-card rounded-xl p-8 flex flex-col gap-4 transform hover:-translate-y-2 transition-all duration-300">
              <div className="bg-primary/20 text-primary w-12 h-12 rounded-lg flex items-center justify-center">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-white text-xl font-bold mb-2">Community</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Build stronger communities by helping each other. Foster trust and safety through meaningful interactions.
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Sub-content / Map Section */}
        <section className="relative z-10 bg-background-light dark:bg-background-dark py-24 px-6 lg:px-20 border-t border-muted-grey/10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary font-bold uppercase tracking-widest text-xs">How it works</span>
              <h2 className="text-4xl font-extrabold mt-4 mb-6 text-black">Simple, safe, and secure help.</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                Our platform is designed to make neighborly assistance effortless. Whether you need a hand with groceries, technical help, or just a quick check-in, Help Nearby connects verified neighbors safely.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-primary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span className="text-slate-700 dark:text-slate-300">Verified community members for safety</span>
                </li>
                <li className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-primary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span className="text-slate-700 dark:text-slate-300">Easy-to-use map interface for requests</span>
                </li>
                <li className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-primary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span className="text-slate-700 dark:text-slate-300">Private and secure communication channels</span>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl h-[400px]">
              <img 
                alt="Interactive map showing neighbor help requests" 
                className="w-full h-full object-contain bg-white" 
                src="/map vector.png"
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 bg-deep-teal py-16 px-6 lg:px-20 text-white/80">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 mb-6 text-white">
                  <svg className="w-7 h-7 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L8 5v6H5l3 4 4-1-1 1-1 1v7h2v-5l3-3h3v-2h-3l-2-2 2-1V5zm0 3.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/>
                  </svg>
                  <span className="text-2xl font-bold tracking-tight">Help Nearby</span>
                </div>
                <p className="max-w-sm mb-8">
                  A platform dedicated to bringing neighbors together through acts of kindness and community support.
                </p>
                <div className="flex gap-4">
                  <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors" aria-label="Visit website">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors" aria-label="Send email">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors" aria-label="Share">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <h4 className="text-white font-bold mb-6">Quick Links</h4>
                <ul className="space-y-4 text-sm">
                  <li><Link className="hover:text-primary transition-colors" to="/requests">Requests</Link></li>
                  <li><Link className="hover:text-primary transition-colors" to="/map">Map Search</Link></li>
                  <li><Link className="hover:text-primary transition-colors" to="/privacy-policy">Community Guidelines</Link></li>
                  <li><Link className="hover:text-primary transition-colors" to="/privacy-policy">Trust &amp; Safety</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-6">Support</h4>
                <ul className="space-y-4 text-sm">
                  <li><Link className="hover:text-primary transition-colors" to="/privacy-policy">Privacy Policy</Link></li>
                  <li><Link className="hover:text-primary transition-colors" to="/privacy-policy">Terms of Service</Link></li>
                  <li><Link className="hover:text-primary transition-colors" to="/privacy-policy">Cookie Policy</Link></li>
                  <li><Link className="hover:text-primary transition-colors" to="/privacy-policy">Contact Us</Link></li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
              <p>© 2026 Help Nearby. All rights reserved.</p>
              <div className="flex gap-6">
                <span>Made with love for the community</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;