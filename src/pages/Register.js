import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Password strength calculator
const getPasswordStrength = (password) => {
  let strength = 0;
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
  
  strength = Object.values(checks).filter(Boolean).length;
  
  return { strength, checks };
};

const getStrengthLabel = (strength) => {
  if (strength === 0) return { label: '', color: 'bg-gray-500' };
  if (strength <= 2) return { label: 'Weak', color: 'bg-red-500' };
  if (strength <= 3) return { label: 'Fair', color: 'bg-yellow-500' };
  if (strength <= 4) return { label: 'Good', color: 'bg-blue-500' };
  return { label: 'Strong', color: 'bg-green-500' };
};

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const { strength, checks } = getPasswordStrength(password);
  const { label: strengthLabel, color: strengthColor } = getStrengthLabel(strength);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await register(name, email, password);
      navigate("/");
    } catch (err) {
      if (err.message?.includes('email')) {
        setError('Email is already in use. Please try with a different email.');
      } else if (err.message?.includes('password')) {
        setError('Password is too weak. Please choose a stronger password.');
      } else {
        setError(err.message || 'Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden -mt-16 pt-16">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80 z-10"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)'
        }}
      ></div>

      {/* Content */}
      <div className="relative z-20 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Create Account
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Join the Community
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Sign up to help or request assistance
            </p>
          </div>

          {/* Register Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
            
            {/* Academic Project Disclaimer */}
            <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-xl p-4 mb-6">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-yellow-300 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="font-bold text-yellow-200 text-sm mb-1">⚠ Student Academic Project</h3>
                  <p className="text-yellow-100 text-xs leading-relaxed">
                    This is a <strong>student project for educational purposes</strong>. 
                    Do NOT use real passwords. This website is not affiliated with any financial institution.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
              {error && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-red-200 text-center">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Create a password"
                    required
                  />
                  
                  {/* Password Strength Indicator */}
                  {password && (
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-300">Password Strength</span>
                        <span className={`text-xs font-semibold ${strength <= 2 ? 'text-red-400' : strength <= 3 ? 'text-yellow-400' : strength <= 4 ? 'text-blue-400' : 'text-green-400'}`}>
                          {strengthLabel}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${level <= strength ? strengthColor : 'bg-gray-600'}`}
                          />
                        ))}
                      </div>
                      <ul className="text-xs space-y-1 mt-2">
                        <li className={`flex items-center gap-2 ${checks.length ? 'text-green-400' : 'text-gray-400'}`}>
                          {checks.length ? '✓' : '○'} At least 8 characters
                        </li>
                        <li className={`flex items-center gap-2 ${checks.lowercase ? 'text-green-400' : 'text-gray-400'}`}>
                          {checks.lowercase ? '✓' : '○'} Lowercase letter
                        </li>
                        <li className={`flex items-center gap-2 ${checks.uppercase ? 'text-green-400' : 'text-gray-400'}`}>
                          {checks.uppercase ? '✓' : '○'} Uppercase letter
                        </li>
                        <li className={`flex items-center gap-2 ${checks.number ? 'text-green-400' : 'text-gray-400'}`}>
                          {checks.number ? '✓' : '○'} Number
                        </li>
                        <li className={`flex items-center gap-2 ${checks.special ? 'text-green-400' : 'text-gray-400'}`}>
                          {checks.special ? '✓' : '○'} Special character (!@#$%^&*)
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>

              <div className="text-center">
                <p className="text-gray-300">
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200"
                  >
                    Sign in here
                  </Link>
                </p>
                <p className="text-gray-400 text-xs mt-3">
                  <Link 
                    to="/privacy-policy" 
                    className="hover:text-gray-300 underline transition-colors duration-200"
                  >
                    Privacy Policy
                  </Link>
                  {' • '}
                  <span>Built by Rhythm Pahwa – Chandigarh University</span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;