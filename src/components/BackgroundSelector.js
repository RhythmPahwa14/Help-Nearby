import React, { useState } from 'react';
import { useBackground } from '../context/BackgroundContext';

const BackgroundSelector = () => {
  const { 
    backgroundImages, 
    currentBackground, 
    autoRotate,
    nextBackground, 
    prevBackground, 
    setSpecificBackground,
    toggleAutoRotate,
    getCurrentBackground
  } = useBackground();

  const [isOpen, setIsOpen] = useState(false);

  const currentBg = getCurrentBackground();

  // Simple SVG Icons
  const PhotoIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );

  const ChevronLeftIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );

  const ChevronRightIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );

  const PlayIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5v14l11-7z" />
    </svg>
  );

  const PauseIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
    </svg>
  );

  return (
    <div className="relative">
      {/* Background Selector Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 text-white font-medium transition-all duration-300 hover:bg-white/20 hover:scale-105 nav-button"
        style={{ whiteSpace: 'nowrap' }}
      >
        <PhotoIcon />
        <span className="hidden md:inline">Background</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Menu */}
          <div className="absolute right-0 mt-2 w-80 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl z-50 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-white/20">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-semibold">Background Settings</h3>
                <button
                  onClick={toggleAutoRotate}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 nav-button ${
                    autoRotate ? 'bg-green-500/20 text-green-300' : 'bg-white/10 text-white/70'
                  }`}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {autoRotate ? <PauseIcon /> : <PlayIcon />}
                  <span>{autoRotate ? 'Auto' : 'Manual'}</span>
                </button>
              </div>

              {/* Current Background Info */}
              <div className="text-sm text-white/80 mb-3">
                <div className="font-medium">{currentBg.name}</div>
                <div className="text-xs text-white/60">{currentBg.description}</div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={prevBackground}
                  className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors nav-button"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  <ChevronLeftIcon />
                </button>
                
                <span className="text-white font-medium nav-text" style={{ whiteSpace: 'nowrap' }}>
                  {currentBackground + 1} / {backgroundImages.length}
                </span>
                
                <button
                  onClick={nextBackground}
                  className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors nav-button"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  <ChevronRightIcon />
                </button>
              </div>
            </div>

            {/* Background Grid */}
            <div className="p-4">
              <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                {backgroundImages.map((bg, index) => (
                  <button
                    key={bg.id}
                    onClick={() => {
                      setSpecificBackground(index);
                      setIsOpen(false);
                    }}
                    className={`relative group overflow-hidden rounded-lg aspect-video transition-all duration-300 nav-button ${
                      index === currentBackground 
                        ? 'ring-2 ring-blue-400 ring-offset-2 ring-offset-transparent' 
                        : 'hover:scale-105'
                    }`}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${bg.url})` }}
                    >
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                    </div>
                    
                    {/* Background Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="text-white text-xs font-medium truncate nav-text" style={{ whiteSpace: 'nowrap' }}>
                        {bg.name}
                      </div>
                    </div>

                    {/* Current Selection Indicator */}
                    {index === currentBackground && (
                      <div className="absolute top-2 right-2">
                        <div className="w-3 h-3 bg-blue-400 rounded-full border-2 border-white"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/20 text-center">
              <div className="text-xs text-white/60 nav-text" style={{ whiteSpace: 'nowrap' }}>
                {autoRotate ? 'Backgrounds change every 30 seconds' : 'Auto-rotation disabled'}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BackgroundSelector;
