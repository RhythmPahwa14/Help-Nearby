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
  if (strength === 0) return { label: '', color: 'bg-gray-300' };
  if (strength <= 2) return { label: 'Weak', color: 'bg-red-400' };
  if (strength <= 3) return { label: 'Fair', color: 'bg-yellow-400' };
  if (strength <= 4) return { label: 'Good', color: 'bg-blue-400' };
  return { label: 'Strong', color: 'bg-primary' };
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
      {/* Background image with blur */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)',
          filter: 'blur(6px)',
        }}
      ></div>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-muted-grey/40">

          {/* Header */}
          <div className="mb-7">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Create Account</h1>
            <p className="text-gray-500 text-sm">Join our local network of neighbors helping neighbors.</p>
          </div>

          {/* Academic Project Disclaimer */}
          <div className="flex items-start gap-3 bg-primary/10 border border-primary/30 rounded-xl px-4 py-3 mb-6">
            <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </span>
            <div>
              <p className="text-xs font-semibold" style={{ color: '#7d8a6f' }}>Student Academic Project</p>
              <p className="text-xs leading-relaxed text-gray-600 mt-0.5">
                This is a <strong>student project for educational purposes</strong>. Do NOT use real passwords. Not affiliated with any financial institution.
              </p>
            </div>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                  style={{ '--tw-ring-color': '#a6b697' }}
                  onFocus={e => e.target.style.boxShadow = '0 0 0 2px #a6b69766'}
                  onBlur={e => e.target.style.boxShadow = ''}
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                  onFocus={e => e.target.style.boxShadow = '0 0 0 2px #a6b69766'}
                  onBlur={e => e.target.style.boxShadow = ''}
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                  onFocus={e => e.target.style.boxShadow = '0 0 0 2px #a6b69766'}
                  onBlur={e => e.target.style.boxShadow = ''}
                  placeholder="••••••••"
                  required
                />
              </div>
              <p className="text-xs text-gray-400 mt-1.5 ml-0.5">Must be at least 8 characters with one special symbol.</p>

              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Password Strength</span>
                    <span className={`text-xs font-semibold ${strength <= 2 ? 'text-red-500' : strength <= 3 ? 'text-yellow-500' : strength <= 4 ? 'text-blue-500' : 'text-primary'}`}>
                      {strengthLabel}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${level <= strength ? strengthColor : 'bg-gray-200'}`}
                      />
                    ))}
                  </div>
                  <ul className="text-xs space-y-1 mt-1">
                    {[
                      [checks.length, 'At least 8 characters'],
                      [checks.lowercase, 'Lowercase letter'],
                      [checks.uppercase, 'Uppercase letter'],
                      [checks.number, 'Number'],
                      [checks.special, 'Special character (!@#$%^&*)'],
                    ].map(([ok, label]) => (
                      <li key={label} className={`flex items-center gap-1.5 ${ok ? 'text-primary' : 'text-gray-400'}`}>
                        {ok ? '✓' : '○'} {label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all duration-200 shadow-md shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                  Creating Account...
                </>
              ) : (
                <>Sign Up <span className="ml-1">→</span></>
              )}
            </button>

            {/* Footer links */}
            <div className="text-center pt-1">
              <p className="text-sm text-gray-500">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold transition-colors duration-200" style={{ color: '#a6b697' }}>
                  Sign in
                </Link>
              </p>
              <p className="text-gray-400 text-xs mt-3">
                <Link to="/privacy-policy" className="hover:text-gray-600 underline transition-colors duration-200">
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