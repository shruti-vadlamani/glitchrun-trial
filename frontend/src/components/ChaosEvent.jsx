import React, { useEffect, useState } from 'react';

function ChaosEvent({ message }) {
  const [visible, setVisible] = useState(true);
  const [scale, setScale] = useState(1);
  
  useEffect(() => {
    // Animation effect
    const scaleInterval = setInterval(() => {
      setScale(prev => prev === 1 ? 1.1 : 1);
    }, 200);
    
    // Hide after 3 seconds
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(scaleInterval);
    };
  }, [message]);
  
  if (!visible) return null;
  
  return (
    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
      <div 
        className="bg-black bg-opacity-70 text-center p-4 rounded-lg border-2 border-cyan-500 shadow-lg"
        style={{ 
          transform: `scale(${scale})`,
          transition: 'transform 0.2s ease-in-out'
        }}
      >
        <div className="text-xl font-bold text-red-500 mb-1">CHAOS EVENT</div>
        <div className="text-2xl font-mono text-cyan-400">{message}</div>
      </div>
    </div>
  );
}

export default ChaosEvent;