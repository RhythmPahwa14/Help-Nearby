import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
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
          {/* Green Transparent Navigation */}
          <header className="fixed top-0 left-0 w-full z-50 px-6 lg:px-20 py-3">
            <nav className="max-w-7xl mx-auto flex items-center justify-between">
              <NavLink to="/" className="flex items-center gap-3">
                <div className="text-primary">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
                  </svg>
                </div>
                <h1 className="text-white text-2xl font-extrabold tracking-tight">Help Nearby</h1>
              </NavLink>
              <div className="hidden md:flex items-center gap-10">
                <div className="flex gap-8">
                  <NavLink className="text-white/90 hover:text-primary text-sm font-semibold tracking-wide transition-colors uppercase" to="/requests">Requests</NavLink>
                  <NavLink className="text-white/90 hover:text-primary text-sm font-semibold tracking-wide transition-colors uppercase" to="/map">Map</NavLink>
                  {!currentUser ? (
                    <NavLink className="text-white/90 hover:text-primary text-sm font-semibold tracking-wide transition-colors uppercase" to="/login">Login</NavLink>
                  ) : (
                    <NavLink className="text-white/90 hover:text-primary text-sm font-semibold tracking-wide transition-colors uppercase" to="/privacy-policy">Contact Us</NavLink>
                  )}
                </div>
                {!currentUser ? (
                  <NavLink 
                    to="/register"
                    className="bg-primary hover:bg-primary/90 text-black px-6 py-2.5 rounded-lg text-sm font-bold transition-all transform hover:scale-105"
                  >
                    Get Started
                  </NavLink>
                ) : (
                  <div className="flex items-center gap-3">
                    <NavLink 
                      to="/post-request"
                      className="bg-primary hover:bg-primary/90 text-black px-6 py-2.5 rounded-lg text-sm font-bold transition-all transform hover:scale-105"
                    >
                      Post Request
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all transform hover:scale-105"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-white"
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
              <div className="fixed top-[60px] left-0 right-0 bg-black/90 backdrop-blur-md border-t border-white/10 p-6">
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
                        className="block text-white font-medium py-3 px-4 rounded-lg hover:bg-white/10 transition-colors"
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
                        className="block text-white font-medium py-3 px-4 rounded-lg hover:bg-white/10 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Login
                      </NavLink>
                      <NavLink 
                        to="/register" 
                        className="block text-white font-medium py-3 px-4 rounded-lg hover:bg-white/10 transition-colors"
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
  );
}

export default App;
