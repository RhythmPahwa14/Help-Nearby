import React, { createContext, useContext, useState, useEffect } from 'react';

const BackgroundContext = createContext();

export const useBackground = () => {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error('useBackground must be used within a BackgroundProvider');
  }
  return context;
};

const backgroundImages = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&q=80',
    name: 'Community Help',
    description: 'People helping in community'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&q=80',
    name: 'Volunteer Support',
    description: 'Volunteers helping others'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&q=80',
    name: 'Helping Hands',
    description: 'Hands together in unity'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&q=80',
    name: 'Team Unity',
    description: 'Team working together'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&q=80',
    name: 'Charity Work',
    description: 'People doing charity'
  }
];

export const BackgroundProvider = ({ children }) => {
  const [currentBackground, setCurrentBackground] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true); // Enable auto-rotate by default
  const [isLoaded, setIsLoaded] = useState(true);

  // Save background preference
  useEffect(() => {
    localStorage.setItem('help-nearby-background', currentBackground.toString());
    console.log('Background changed to:', currentBackground, backgroundImages[currentBackground]);
  }, [currentBackground]);

  // Save auto-rotate preference
  useEffect(() => {
    localStorage.setItem('help-nearby-auto-rotate', JSON.stringify(autoRotate));
  }, [autoRotate]);

  // Auto-rotate backgrounds every 7 seconds
  useEffect(() => {
    if (!autoRotate) return;

    const interval = setInterval(() => {
      setCurrentBackground(prev => {
        const next = (prev + 1) % backgroundImages.length;
        console.log('Auto-rotating to background:', next, backgroundImages[next]);
        return next;
      });
    }, 7000);

    return () => clearInterval(interval);
  }, [autoRotate]);

  const nextBackground = () => {
    const next = (currentBackground + 1) % backgroundImages.length;
    console.log('Next background:', next, backgroundImages[next]);
    setCurrentBackground(next);
  };

  const prevBackground = () => {
    const prev = currentBackground === 0 ? backgroundImages.length - 1 : currentBackground - 1;
    console.log('Previous background:', prev, backgroundImages[prev]);
    setCurrentBackground(prev);
  };

  const setSpecificBackground = (index) => {
    console.log('Setting background to index:', index, backgroundImages[index]);
    setCurrentBackground(index);
  };

  const toggleAutoRotate = () => {
    setAutoRotate(prev => !prev);
  };

  const getCurrentBackground = () => backgroundImages[currentBackground];

  const value = {
    backgroundImages,
    currentBackground,
    autoRotate,
    isLoaded,
    nextBackground,
    prevBackground,
    setSpecificBackground,
    toggleAutoRotate,
    getCurrentBackground
  };

  return (
    <BackgroundContext.Provider value={value}>
      {children}
    </BackgroundContext.Provider>
  );
};
