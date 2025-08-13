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
    url: 'https://t3.ftcdn.net/jpg/01/43/11/00/360_F_143110026_C4EmjmmVVYlcXpTtmCwil5Xv0wSfVCrY.jpg',
    name: 'Community Help',
    description: 'People helping in community'
  },
  {
    id: 2,
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx5AUZQ_HHgpmwiPQX6cRQVmsVCFr1_XJ0Tw&s',
    name: 'Volunteer Support',
    description: 'Volunteers helping others'
  },
  {
    id: 3,
    url: 'https://media.istockphoto.com/id/1435661969/photo/close-up-of-children-holding-a-planet-at-the-beach.jpg?s=612x612&w=0&k=20&c=TuZTL8KEdqNQxS5nlsH5i1tTOKNWopj2dHWkm9yk2uo=',
    name: 'Global Care',
    description: 'Children caring for the planet'
  },
  {
    id: 4,
    url: 'https://cdn.pixabay.com/photo/2016/04/01/15/18/help-1300942_640.png',
    name: 'Help Network',
    description: 'Community support network'
  },
  {
    id: 5,
    url: 'https://t3.ftcdn.net/jpg/01/04/99/68/360_F_104996865_GybGfQbBMaPRkMpcsE5z70ZLHUZsqJqw.jpg',
    name: 'Helping Hands',
    description: 'Extended helping hands'
  }
];

export const BackgroundProvider = ({ children }) => {
  const [currentBackground, setCurrentBackground] = useState(0);
  const [autoRotate, setAutoRotate] = useState(false); // Disable auto-rotate initially
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

  // Auto-rotate backgrounds every 10 seconds for testing
  useEffect(() => {
    if (!autoRotate) return;

    const interval = setInterval(() => {
      setCurrentBackground(prev => {
        const next = (prev + 1) % backgroundImages.length;
        console.log('Auto-rotating to background:', next, backgroundImages[next]);
        return next;
      });
    }, 10000);

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
