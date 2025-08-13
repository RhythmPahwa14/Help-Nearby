import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    {
      id: 'dark',
      name: 'Dark',
      icon: '🌙',
      description: 'Dark theme for low light'
    },
    {
      id: 'light',
      name: 'Light',
      icon: '☀️',
      description: 'Light theme for bright environments'
    },
    {
      id: 'system',
      name: 'System',
      icon: '💻',
      description: 'Follow system preference'
    }
  ];

  const currentTheme = themes.find(t => t.id === theme);

  return (
    <div className="relative theme-dropdown">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 nav-button"
        style={{ whiteSpace: 'nowrap', wordBreak: 'normal' }}
      >
        <span className="text-lg" style={{ whiteSpace: 'nowrap' }}>{currentTheme?.icon}</span>
        <span className="text-sm font-medium hidden sm:inline" style={{ whiteSpace: 'nowrap' }}>{currentTheme?.name}</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 rounded-xl shadow-2xl z-20 bg-black/90 backdrop-blur-xl border border-white/20 dropdown-menu">
            <div className="p-2">
              {themes.map((themeOption) => (
                <button
                  key={themeOption.id}
                  onClick={() => {
                    setTheme(themeOption.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 text-left group dropdown-item ${
                    theme === themeOption.id 
                      ? 'bg-blue-500 text-white' 
                      : 'hover:bg-white/10 text-white'
                  }`}
                  style={{ whiteSpace: 'nowrap', wordBreak: 'normal' }}
                >
                  <span className="text-xl" style={{ whiteSpace: 'nowrap' }}>{themeOption.icon}</span>
                  <div className="flex-1" style={{ whiteSpace: 'normal' }}>
                    <div className="font-medium text-sm" style={{ whiteSpace: 'nowrap' }}>{themeOption.name}</div>
                    <div className={`text-xs opacity-70 ${
                      theme === themeOption.id ? 'text-white/80' : 'text-gray-400'
                    }`} style={{ whiteSpace: 'normal' }}>
                      {themeOption.description}
                    </div>
                  </div>
                  {theme === themeOption.id && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path 
                        fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeSelector;
