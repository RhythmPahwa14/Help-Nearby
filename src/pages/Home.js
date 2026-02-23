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
    <div className="font-display text-slate-900 dark:text-slate-100">
      <div className="relative min-h-screen flex flex-col">
        {/* Hero Background Container */}
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center" 
            style={{ 
              backgroundImage: "url('/annie-spratt-9VpI3gQ1iUo-unsplash.jpg')" 
            }}
          >
            <div className="w-full h-full hero-overlay"></div>
          </div>
        </div>

        {/* Header/Navigation */}
        <header className="relative z-20 px-6 lg:px-20 py-6">
          <nav className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-primary">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
                </svg>
              </div>
              <h1 className="text-white text-2xl font-extrabold tracking-tight">Help Nearby</h1>
            </div>
            <div className="hidden md:flex items-center gap-10">
              <div className="flex gap-8">
                <Link className="text-white/90 hover:text-primary text-sm font-semibold tracking-wide transition-colors uppercase" to="/requests">Requests</Link>
                <Link className="text-white/90 hover:text-primary text-sm font-semibold tracking-wide transition-colors uppercase" to="/map">Map</Link>
                {!user ? (
                  <Link className="text-white/90 hover:text-primary text-sm font-semibold tracking-wide transition-colors uppercase" to="/login">Login</Link>
                ) : (
                  <Link className="text-white/90 hover:text-primary text-sm font-semibold tracking-wide transition-colors uppercase" to="/privacy-policy">Contact Us</Link>
                )}
              </div>
              {!user ? (
                <button 
                  onClick={() => navigate('/register')}
                  className="bg-primary hover:bg-primary/90 text-deep-teal px-6 py-2.5 rounded-lg text-sm font-bold transition-all transform hover:scale-105"
                >
                  Get Started
                </button>
              ) : (
                <button 
                  onClick={() => navigate('/post-request')}
                  className="bg-primary hover:bg-primary/90 text-deep-teal px-6 py-2.5 rounded-lg text-sm font-bold transition-all transform hover:scale-105"
                >
                  Post Request
                </button>
              )}
            </div>
            {/* Mobile Menu Button */}
            <button className="md:hidden text-white">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </nav>
        </header>

        {/* Main Content Area */}
        <main className="relative z-10 flex-1 flex flex-col justify-center px-6 lg:px-20 max-w-7xl mx-auto w-full pt-12 pb-24">
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
                    className="bg-primary hover:bg-primary/90 text-deep-teal px-10 py-4 rounded-xl text-base font-extrabold transition-all shadow-lg shadow-primary/20"
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
                <span className="material-symbols-outlined">location_on</span>
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
                <span className="material-symbols-outlined">notifications_active</span>
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
                <span className="material-symbols-outlined">groups</span>
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
              <h2 className="text-4xl font-extrabold mt-4 mb-6 text-slate-900 dark:text-slate-100">Simple, safe, and secure help.</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                Our platform is designed to make neighborly assistance effortless. Whether you need a hand with groceries, technical help, or just a quick check-in, Help Nearby connects verified neighbors safely.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                  <span className="text-slate-700 dark:text-slate-300">Verified community members for safety</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                  <span className="text-slate-700 dark:text-slate-300">Easy-to-use map interface for requests</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                  <span className="text-slate-700 dark:text-slate-300">Private and secure communication channels</span>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl h-[400px]">
              <img 
                alt="Interactive map showing neighbor help requests" 
                className="w-full h-full object-cover" 
                src="/background.jpg"
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
                  <span className="material-symbols-outlined text-primary">volunteer_activism</span>
                  <span className="text-2xl font-bold tracking-tight">Help Nearby</span>
                </div>
                <p className="max-w-sm mb-8">
                  A platform dedicated to bringing neighbors together through acts of kindness and community support.
                </p>
                <div className="flex gap-4">
                  <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors" href="#">
                    <span className="material-symbols-outlined text-lg">public</span>
                  </a>
                  <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors" href="#">
                    <span className="material-symbols-outlined text-lg">mail</span>
                  </a>
                  <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors" href="#">
                    <span className="material-symbols-outlined text-lg">share</span>
                  </a>
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
              <p>© 2023 Help Nearby. All rights reserved.</p>
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