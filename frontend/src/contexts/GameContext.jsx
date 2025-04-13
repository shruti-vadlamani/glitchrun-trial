import React, { createContext, useState, useContext } from 'react';

// Create context
const GameContext = createContext();

// Custom hook to use the game context
export const useGame = () => useContext(GameContext);

// Provider component
export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState({
    score: 0,
    health: 100,
    level: 1,
    achievements: [],
    chaosEvents: []
  });

  // Add chaos event to history
  const addChaosEvent = (event) => {
    setGameState(prev => ({
      ...prev,
      chaosEvents: [...prev.chaosEvents, {
        id: Date.now(),
        type: event.type,
        message: event.message,
        timestamp: new Date().toISOString()
      }]
    }));
  };

  // Add achievement
  const addAchievement = (achievement) => {
    if (!gameState.achievements.some(a => a.id === achievement.id)) {
      setGameState(prev => ({
        ...prev,
        achievements: [...prev.achievements, {
          ...achievement,
          timestamp: new Date().toISOString()
        }]
      }));
    }
  };

  // Update score
  const updateScore = (points) => {
    setGameState(prev => ({
      ...prev,
      score: prev.score + points
    }));
  };

  // Update health
  const updateHealth = (amount) => {
    setGameState(prev => ({
      ...prev,
      health: Math.max(0, Math.min(100, prev.health + amount))
    }));
  };

  // Level up
  const levelUp = () => {
    setGameState(prev => ({
      ...prev,
      level: prev.level + 1
    }));
  };

  // Reset game
  const resetGame = () => {
    setGameState({
      score: 0,
      health: 100,
      level: 1,
      achievements: [],
      chaosEvents: []
    });
  };

  // Value object with state and functions
  const value = {
    ...gameState,
    addChaosEvent,
    addAchievement,
    updateScore,
    updateHealth,
    levelUp,
    resetGame
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;