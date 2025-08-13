import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useTranslation } from 'react-i18next';

function Register() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError(t('password_mismatch'));
      return;
    }

    if (password.length < 6) {
      setError(t('password_too_short'));
      return;
    }

    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError(t('register_error_email'));
      } else if (err.code === 'auth/weak-password') {
        setError(t('register_error_weak'));
      } else {
        setError(t('register_error_general'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden" style={{background: 'linear-gradient(-45deg, #95b5a6, #a8c99a, #d4b894, #c8b598)', backgroundSize: '400% 400%', animation: 'gradientShift 15s ease infinite'}}>
      {/* Background particles */}
      <div className="particles">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-md p-8 space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center slide-in-bottom">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 glow-cyan" style={{background: 'linear-gradient(135deg, #95b5a6 0%, #d4b894 100%)'}}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#2c3e50'}}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 className="text-4xl font-black" style={{background: 'linear-gradient(135deg, #95b5a6 0%, #d4b894 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
            {t('register_title')}
          </h2>
          <p className="mt-2" style={{color: 'rgba(44, 62, 80, 0.8)'}}>Join our community and start helping others</p>
        </div>

        {/* Register Form */}
        <div className="card slide-in-left">
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{color: '#2c3e50'}}>
                {t('email_label')}
              </label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: 'rgba(44, 62, 80, 0.6)'}}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-field pl-10"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold mb-2" style={{color: '#2c3e50'}}>
                {t('password_label')}
              </label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: 'rgba(44, 62, 80, 0.6)'}}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-field pl-10"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-2" style={{color: '#2c3e50'}}>
                Confirm Password
              </label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: 'rgba(44, 62, 80, 0.6)'}}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="input-field pl-10"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-xl p-4 slide-in-bottom" style={{background: 'rgba(220, 38, 38, 0.1)', border: '1px solid rgba(220, 38, 38, 0.2)'}}>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#dc2626'}}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm" style={{color: '#dc2626'}}>{error}</p>
                </div>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed btn-primary"
              style={{
                background: isLoading 
                  ? 'rgba(149, 181, 166, 0.5)' 
                  : 'linear-gradient(135deg, #95b5a6 0%, #d4b894 100%)',
                color: '#2c3e50',
                borderRadius: '12px',
                border: 'none',
                transition: 'all 0.3s ease'
              }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <div className="spinner w-5 h-5 border-2 border-t-current rounded-full mr-2" style={{borderColor: 'rgba(44, 62, 80, 0.3)', borderTopColor: '#2c3e50'}}></div>
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  {t('register_button')}
                </span>
              )}
            </button>
          </form>
        </div>

        {/* Login Link */}
        <div className="text-center slide-in-right">
          <p style={{color: 'rgba(44, 62, 80, 0.8)'}}>
            {t('have_account')}{' '}
            <Link 
              to="/login" 
              className="font-semibold transition-colors hover:underline"
              style={{color: '#95b5a6'}}
              onMouseEnter={(e) => e.target.style.color = '#d4b894'}
              onMouseLeave={(e) => e.target.style.color = '#95b5a6'}
            >
              {t('login_link')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
