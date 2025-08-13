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
              backgroundColor: 'rgba(17, 17, 17, 0.8)',
              borderBottom: '1px solid var(--border-primary)'
            }}
          >
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
              <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <NavLink to="/" className="flex items-center group">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center mr-3 
                               group-hover:scale-110 transition-all duration-300 shadow-lg"
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
                <div className="hidden md:flex items-center space-x-6">
                  <nav className="flex items-center space-x-4">
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

                  <div className="flex items-center space-x-3">
                    {/* Theme Selector */}
                    <ThemeSelector />
                    
                    {/* Language Switcher */}
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => changeLanguage('en')}
                        className="px-3 py-2 rounded-lg text-sm font-medium transition-all"
                        style={{
                          backgroundColor: i18n.language === 'en' ? 'var(--accent-primary)' : 'transparent',
                          color: i18n.language === 'en' ? 'white' : 'var(--text-secondary)'
                        }}
                      >
                        EN
                      </button>
                      <button
                        onClick={() => changeLanguage('hi')}
                        className="px-3 py-2 rounded-lg text-sm font-medium transition-all"
                        style={{
                          backgroundColor: i18n.language === 'hi' ? 'var(--accent-primary)' : 'transparent',
                          color: i18n.language === 'hi' ? 'white' : 'var(--text-secondary)'
                        }}
                      >
                        हि
                      </button>
                    </div>

                    {/* User Menu */}
                    {currentUser ? (
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{
                            background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)'
                          }}
                        >
                          <span className="text-white text-sm font-bold">
                            {currentUser.email?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="flex items-center px-3 py-2 rounded-lg font-medium transition-all duration-200"
                          style={{
                            backgroundColor: 'var(--bg-tertiary)',
                            color: 'var(--text-primary)'
                          }}
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          {t('logout')}
                        </button>
                      </div>
                    ) : (
                      <NavLink
                        to="/login"
                        className="flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200"
                        style={{
                          backgroundColor: 'var(--bg-tertiary)',
                          color: 'var(--text-primary)'
                        }}
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        {t('login')}
                      </NavLink>
                    )}
                  </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 rounded-lg transition-colors"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                  </svg>
                </button>
              </div>
            </div>
          </header>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div 
              className="fixed inset-0 z-40 md:hidden"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
              onClick={() => setIsMenuOpen(false)}
            >
              <div 
                className="fixed top-16 left-0 right-0 p-4"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderBottom: '1px solid var(--border-primary)'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <nav className="space-y-2">
                  <NavLink 
                    to="/request"
                    className="flex items-center px-4 py-3 rounded-lg font-medium transition-all"
                    style={{
                      backgroundColor: 'var(--accent-primary)',
                      color: 'white'
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    {t('post_request')}
                  </NavLink>
                  
                  <NavLink 
                    to="/view-requests"
                    className="flex items-center px-4 py-3 rounded-lg font-medium transition-all"
                    style={{ color: 'var(--text-primary)' }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {t('view_requests')}
                  </NavLink>
                  
                  <NavLink 
                    to="/map"
                    className="flex items-center px-4 py-3 rounded-lg font-medium transition-all"
                    style={{ color: 'var(--text-primary)' }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    {t('map_view')}
                  </NavLink>
                </nav>

                <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--border-primary)' }}>
                  <div className="flex items-center justify-between mb-3">
                    <span style={{ color: 'var(--text-secondary)' }} className="text-sm font-medium">Theme</span>
                    <ThemeSelector />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span style={{ color: 'var(--text-secondary)' }} className="text-sm font-medium">Language</span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => changeLanguage('en')}
                        className="px-3 py-1 rounded text-sm font-medium"
                        style={{
                          backgroundColor: i18n.language === 'en' ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                          color: i18n.language === 'en' ? 'white' : 'var(--text-primary)'
                        }}
                      >
                        EN
                      </button>
                      <button
                        onClick={() => changeLanguage('hi')}
                        className="px-3 py-1 rounded text-sm font-medium"
                        style={{
                          backgroundColor: i18n.language === 'hi' ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                          color: i18n.language === 'hi' ? 'white' : 'var(--text-primary)'
                        }}
                      >
                        हि
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

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
