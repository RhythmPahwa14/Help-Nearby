import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from "react-router-dom";
import { useAuth, AuthProvider } from "./context/AuthContext";
import "leaflet/dist/leaflet.css";
import { ThemeProvider } from "./context/ThemeContext";
import { BackgroundProvider } from "./context/BackgroundContext";
import Home from "./pages/Home";
import HelpRequest from "./pages/HelpRequest";
import ViewRequests from "./pages/ViewRequests";
import MapView from "./pages/MapView";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import TrustAndSafety from "./pages/TrustAndSafety";
import ContactUs from "./pages/ContactUs";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BackgroundProvider>
          <Router>
            <AppContent />
          </Router>
        </BackgroundProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

function AppContent() {
  const { user: currentUser, logout, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Use light (white bg) navbar on pages with light backgrounds
  const lightNavPages = ['/requests', '/map', '/privacy-policy', '/terms-of-service', '/trust-and-safety', '/contact-us'];
  const useLightNav = lightNavPages.includes(location.pathname);

  const handleLogout = () => {
    logout();
  };

  // Show loading screen while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
      <div className="font-sans min-h-screen relative">
          {/* Conditional Navigation - White for Requests page, Transparent for others */}
          <header className={`absolute ${useLightNav ? 'bg-white shadow-sm border-b border-neutral-soft' : 'bg-transparent'} top-0 left-0 w-full z-50`}>
            <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 py-3">
              <NavLink to="/" className="flex items-center gap-3">
                <div className={`${useLightNav ? 'text-primary bg-primary/10' : 'text-primary'} p-2 rounded-lg`}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
                <h1 className={`${useLightNav ? 'text-slate-900' : 'text-white'} text-xl font-bold tracking-tight`}>Help Nearby</h1>
              </NavLink>
              <div className="hidden md:flex items-center gap-8">
                <div className="flex gap-6">
                  <NavLink className={({ isActive }) => useLightNav 
                    ? `${isActive ? 'text-primary font-bold' : 'text-slate-600'} hover:text-primary text-sm font-medium transition-colors`
                    : `${isActive ? 'text-primary font-bold' : 'text-white/90'} hover:text-primary text-sm font-medium transition-colors`
                  } to="/requests">Requests</NavLink>
                  <NavLink className={({ isActive }) => useLightNav 
                    ? `${isActive ? 'text-primary font-bold' : 'text-slate-600'} hover:text-primary text-sm font-medium transition-colors`
                    : `${isActive ? 'text-primary font-bold' : 'text-white/90'} hover:text-primary text-sm font-medium transition-colors`
                  } to="/map">Map</NavLink>
                  {!currentUser ? (
                    <NavLink className={({ isActive }) => useLightNav 
                      ? `${isActive ? 'text-primary font-bold' : 'text-slate-600'} hover:text-primary text-sm font-medium transition-colors`
                      : `${isActive ? 'text-primary font-bold' : 'text-white/90'} hover:text-primary text-sm font-medium transition-colors`
                    } to="/login">Login</NavLink>
                  ) : (
                    <NavLink className={({ isActive }) => useLightNav 
                      ? `${isActive ? 'text-primary font-bold' : 'text-slate-600'} hover:text-primary text-sm font-medium transition-colors`
                      : `${isActive ? 'text-primary font-bold' : 'text-white/90'} hover:text-primary text-sm font-medium transition-colors`
                    } to="/contact">Contact</NavLink>
                  )}
                </div>
                {!currentUser ? (
                  <NavLink 
                    to="/register"
                    className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all transform hover:scale-105 shadow-sm"
                  >
                    Get Started
                  </NavLink>
                ) : (
                  <div className="flex items-center gap-3">
                    <NavLink 
                      to="/post-request"
                      className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all transform hover:scale-105 shadow-sm"
                    >
                      Post Request
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all transform hover:scale-105 shadow-sm"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`md:hidden ${useLightNav ? 'text-slate-900' : 'text-white'}`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </nav>
          </header>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="fixed inset-0 z-40 md:hidden" onClick={() => setIsMenuOpen(false)}>
              <div className="fixed top-[60px] left-0 right-0 bg-white shadow-lg border-t border-neutral-soft p-6">
                <nav className="space-y-4">
                  <NavLink 
                    to="/requests" 
                    className="block text-slate-900 font-medium py-3 px-4 rounded-lg hover:bg-primary/10 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Requests
                  </NavLink>
                  <NavLink 
                    to="/map" 
                    className="block text-slate-900 font-medium py-3 px-4 rounded-lg hover:bg-primary/10 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Map
                  </NavLink>
                  {currentUser ? (
                    <>
                      <NavLink 
                        to="/post-request" 
                        className="block text-white font-medium py-3 px-4 rounded-lg bg-primary hover:bg-primary-dark transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Post Request
                      </NavLink>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="block w-full text-left text-white font-semibold py-3 px-4 rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <NavLink 
                        to="/login" 
                        className="block text-slate-900 font-medium py-3 px-4 rounded-lg hover:bg-primary/10 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Login
                      </NavLink>
                      <NavLink 
                        to="/register" 
                        className="block text-white font-medium py-3 px-4 rounded-lg bg-primary hover:bg-primary-dark transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign Up
                      </NavLink>
                    </>
                  )}
                </nav>
              </div>
            </div>
          )}

          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/post-request"
                element={
                  <ProtectedRoute>
                    <HelpRequest />
                  </ProtectedRoute>
                }
              />
              <Route path="/requests" element={<ViewRequests />} />
              <Route path="/map" element={<MapView />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/trust-and-safety" element={<TrustAndSafety />} />
              <Route path="/contact-us" element={<ContactUs />} />
            </Routes>
          </main>
        </div>
  );
}

export default App;
