import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import "leaflet/dist/leaflet.css";

import { AuthContext } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { auth } from "./firebase";
import Home from "./pages/Home";
import HelpRequest from "./pages/HelpRequest";
import ViewRequests from "./pages/ViewRequests";
import MapView from "./pages/MapView";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import ThemeSelector from "./components/ThemeSelector";

function App() {
  const { t, i18n } = useTranslation();
  const { currentUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    auth.signOut();
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <ThemeProvider>
      <Router>
        <div 
          className="font-sans min-h-screen transition-colors duration-300"
          style={{
            backgroundColor: 'var(--bg-primary)',
            color: 'var(--text-primary)'
          }}
        >
          <header 
            className="fixed top-0 left-0 w-full z-50 backdrop-blur-md"
            style={{
              backgroundColor: 'rgba(var(--bg-secondary-rgb, 17, 17, 17), 0.8)',
              borderBottom: '1px solid var(--border-primary)'
            }}
          >
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
              <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <NavLink to="/" className="flex items-center group">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center mr-3 
                               group-hover:scale-110 transition-all duration-300
                               shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)'
                    }}
                  >
                    <span className="font-bold text-lg text-white">H</span>
                  </div>
                  <span 
                    className="text-xl font-bold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Help Nearby
                  </span>
                </NavLink>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-4">
                <NavLink 
                  to="/request" 
                  className="flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200
                           hover:scale-105 active:scale-95"
                  style={{
                    background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
                    color: 'white'
                  }}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  {t('post_request')}
                </NavLink>
                
                <NavLink 
                  to="/view-requests" 
                  className="flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200
                           hover:scale-105 active:scale-95"
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? 'var(--bg-tertiary)' : 'transparent',
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)'
                  })}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {t('view_requests')}
                </NavLink>
                
                <NavLink 
                  to="/map" 
                  className="flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200
                           hover:scale-105 active:scale-95"
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? 'var(--bg-tertiary)' : 'transparent',
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)'
                  })}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  {t('map_view')}
                </NavLink>
              </nav>

                {/* Controls Row */}
                <div className="flex items-center space-x-3">
                  {/* Theme Selector */}
                  <ThemeSelector />
                  
                  {/* Language Switcher */}
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => changeLanguage('en')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        i18n.language === 'en' 
                          ? 'text-white' 
                          : 'hover:text-white'
                      }`}
                      style={{
                        backgroundColor: i18n.language === 'en' ? 'var(--accent-primary)' : 'transparent',
                        color: i18n.language === 'en' ? 'white' : 'var(--text-secondary)'
                      }}
                    >
                      EN
                    </button>
                    <button
                      onClick={() => changeLanguage('hi')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        i18n.language === 'hi' 
                          ? 'text-white' 
                          : 'hover:text-white'
                      }`}
                      style={{
                        backgroundColor: i18n.language === 'hi' ? 'var(--accent-primary)' : 'transparent',
                        color: i18n.language === 'hi' ? 'white' : 'var(--text-secondary)'
                      }}
                    >
                      हि
                    </button>
                  </div>
                </div>

                {/* User Menu */}
                {currentUser ? (
                  <div className="flex items-center space-x-4 ml-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          {currentUser.email?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-slate-300 text-sm font-medium">
                        {t('welcome_user', { email: currentUser.email?.split('@')[0] })}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="btn-secondary px-4 py-2 text-sm"
                    >
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        {t('logout')}
                      </span>
                    </button>
                  </div>
                ) : (
                  <NavLink
                    to="/login"
                    className="btn-secondary px-6 py-3 text-base ml-4"
                  >
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      {t('login')}
                    </span>
                  </NavLink>
                )}
              </div>
            </div>
          </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg transition-colors"
                style={{
                  color: 'var(--text-secondary)'
                }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="md:hidden py-4 border-t border-slate-700/50 slide-in-top">
                <div className="flex flex-col space-y-3">
                  <NavLink 
                    to="/request" 
                    className="btn-primary px-4 py-3 text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('post_request')}
                  </NavLink>
                  
                  <NavLink 
                    to="/view-requests" 
                    className="text-slate-300 hover:text-white px-4 py-3 rounded-xl transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('view_requests')}
                  </NavLink>
                  
                  <NavLink 
                    to="/map" 
                    className="text-slate-300 hover:text-white px-4 py-3 rounded-xl transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('map_view')}
                  </NavLink>

                  {/* Mobile Language Switcher */}
                  <div className="flex justify-center space-x-2 py-2">
                    <button
                      onClick={() => changeLanguage('en')}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                        i18n.language === 'en' 
                          ? 'bg-slate-700 text-white' 
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      EN
                    </button>
                    <button
                      onClick={() => changeLanguage('hi')}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                        i18n.language === 'hi' 
                          ? 'bg-slate-700 text-white' 
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      हि
                    </button>
                  </div>

                  {currentUser ? (
                    <div className="border-t border-slate-700/50 pt-3">
                      <div className="text-center text-slate-300 text-sm mb-3">
                        {t('welcome_user', { email: currentUser.email?.split('@')[0] })}
                      </div>
                      <button
                        onClick={handleLogout}
                        className="btn-secondary w-full py-3"
                      >
                        {t('logout')}
                      </button>
                    </div>
                  ) : (
                    <NavLink
                      to="/login"
                      className="btn-secondary px-4 py-3 text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('login')}
                    </NavLink>
                  )}
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="pt-20 px-4 sm:px-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/request"
              element={
                <ProtectedRoute>
                  <HelpRequest />
                </ProtectedRoute>
              }
            />
            <Route path="/view-requests" element={<ViewRequests />} />
            <Route path="/map" element={<MapView />} />
          </Routes>
        </main>
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
