import React from 'react';

const Player = ({ position, reverseGravity }) => {
  return (
    <div 
      className="absolute"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '30px',
        height: '40px',
        transition: 'transform 0.1s',
        transform: reverseGravity ? 'rotate(180deg)' : 'rotate(0deg)'
      }}
    >
      {/* If image asset is available, use it, otherwise use a colored div */}
      <div className="w-full h-full bg-cyan-500 rounded-sm">
        {/* Character features */}
        <div className="absolute top-1 left-1 w-2 h-2 bg-purple-300 rounded-full"></div>
        <div className="absolute top-1 right-1 w-2 h-2 bg-purple-300 rounded-full"></div>
        <div className="absolute bottom-2 left-0 right-0 mx-auto w-4 h-1 bg-gray-800 rounded"></div>
      </div>
      
      {/* Optional particle effect when moving */}
      <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 opacity-75">
        <div className="w-3 h-3 animate-pulse bg-cyan-300 opacity-30 rounded-full"></div>
      </div>
    </div>
  );
};

export default Player;