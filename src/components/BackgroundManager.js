import React from 'react';
import { useBackground } from '../context/BackgroundContext';

const BackgroundManager = () => {
  const { getCurrentBackground, isLoaded } = useBackground();

  const currentBg = getCurrentBackground();
  
  // Debug log
  console.log('Current Background:', currentBg);

  return (
    <>
      {/* Background Image - Simplified */}
      <div 
        className="fixed inset-0 transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: currentBg ? `url("${currentBg.url}")` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: -50
        }}
      >
        {/* Light overlay for text readability */}
        <div 
          className="absolute inset-0 bg-black/40"
          style={{ zIndex: -49 }}
        ></div>
      </div>
    </>
  );
};

export default BackgroundManager;
