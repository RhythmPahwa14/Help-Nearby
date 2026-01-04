import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { useAuth } from "./contexts/AuthContextNew";
import "leaflet/dist/leaflet.css";

import { AuthProvider } from "./contexts/AuthContextNew";
import { ThemeProvider } from "./context/ThemeContext";
import { BackgroundProvider } from "./context/BackgroundContext";
import Home from "./pages/Home";
import HelpRequest from "./pages/HelpRequest";
import ViewRequests from "./pages/ViewRequests";
import MapView from "./pages/MapView";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BackgroundProvider>
          <AppContent />
        </BackgroundProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

function AppContent() {
  const { user: currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Using dark theme only
  const textColorClass = 'text-white';
  const hoverColorClass = 'hover:text-green-300';
  // Clean App component without text shadows
  const handleLogout = () => {
    logout();
  };

  return (
    <Router>
      <div 
        className="font-sans min-h-screen transition-colors duration-300 relative"
      >
          {/* Modern Clean Navigation */}
          <header className="fixed top-0 left-0 w-full z-50 bg-black/10 backdrop-blur-sm border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
              <div className="flex items-center justify-between h-16">
                {/* Logo - Clean Style */}
                <NavLink to="/" className="flex items-center group">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                        <img 
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKmU9dSLiRVEXb4zI0EqhwJg3LCrW_HdvLH6IP7_K_74Fi2lMh9nyBkYIGiD8elEKSRyw&usqp=CAU" 
                          alt="Help Nearby Logo" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="hidden sm:block">
                      <span className={`font-bold text-lg tracking-tight ${textColorClass}`}>Help</span>
                      <span className={`font-bold text-lg ml-1 ${textColorClass}`}>Nearby</span>
                    </div>
                  </div>
                </NavLink>

                {/* Desktop Navigation - Clean Style */}
                <div className="hidden md:flex items-center space-x-8">
                  <nav className="flex items-center space-x-8">
                    <NavLink 
                      to="/requests" 
                      className={({ isActive }) =>
                        `font-medium transition-colors duration-200 nav-link ${
                          isActive ? 'text-green-300' : textColorClass
                        } ${hoverColorClass}`
                      }
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      ＲＥＱＵＥＳＴＳ
                    </NavLink>
                    <NavLink 
                      to="/map" 
                      className={({ isActive }) =>
                        `font-medium transition-colors duration-200 nav-link ${
                          isActive ? 'text-green-300' : textColorClass
                        } ${hoverColorClass}`
                      }
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      ＭＡＰ
                    </NavLink>
                  </nav>

                  <div className="flex items-center space-x-8">

                    {/* User Authentication */}
                    {currentUser ? (
                      <div className="flex items-center space-x-8">
                        <NavLink 
                          to="/post-request" 
                          className={({ isActive }) =>
                            `font-medium transition-colors duration-200 nav-link ${
                              isActive ? 'text-green-300' : textColorClass
                            } ${hoverColorClass}`
                          }
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          ＰＯＳＴ ＲＥＱＵＥＳＴ
                        </NavLink>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center">
                          <span className="text-white text-sm font-bold" style={{ whiteSpace: 'nowrap' }}>
                            {currentUser.email?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="px-6 py-2 bg-blue-600 rounded-lg text-white font-semibold transition-all duration-300 hover:bg-blue-700 hover:scale-105 nav-button"
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          ＬＯＧＯＵＴ
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-3">
                        <NavLink
                          to="/login"
                          className={`px-4 py-2 font-medium transition-all duration-300 nav-link ${textColorClass} ${hoverColorClass}`}
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          ＬＯＧＩＮ
                        </NavLink>
                        <NavLink
                          to="/register"
                          className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 nav-button text-blue-400 hover:text-blue-300`}
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          ＣＯＮＴＡＣＴ ＵＳ
                        </NavLink>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 rounded-lg transition-colors text-white/80 hover:text-white"
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
            <div className="fixed inset-0 z-40 md:hidden" onClick={() => setIsMenuOpen(false)}>
              <div className="fixed top-16 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-white/10 p-6">
                <nav className="space-y-4">
                  <NavLink 
                    to="/requests" 
                    className="block text-white font-medium py-3 px-4 rounded-lg hover:bg-white/10 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Requests
                  </NavLink>
                  <NavLink 
                    to="/map" 
                    className="block text-white font-medium py-3 px-4 rounded-lg hover:bg-white/10 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Map
                  </NavLink>
                  {currentUser ? (
                    <>
                      <NavLink 
                        to="/post-request" 
                        className="block text-white font-medium py-3 px-4 rounded-lg hover:bg-white/10 transition-colors nav-link"
                        style={{ whiteSpace: 'nowrap' }}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Post Request
                      </NavLink>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="block w-full text-left text-white font-semibold py-3 px-4 rounded-lg bg-red-600 hover:bg-red-700 transition-colors nav-button"
                        style={{ whiteSpace: 'nowrap' }}
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <NavLink 
                        to="/login" 
                        className="block text-white font-medium py-3 px-4 rounded-lg hover:bg-white/10 transition-colors nav-link"
                        style={{ whiteSpace: 'nowrap' }}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Login
                      </NavLink>
                      <NavLink 
                        to="/register" 
                        className="block text-white font-medium py-3 px-4 rounded-lg hover:bg-white/10 transition-colors nav-link"
                        style={{ whiteSpace: 'nowrap' }}
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
            </Routes>
          </main>
        </div>
      </Router>
    );
  }

export default App;
