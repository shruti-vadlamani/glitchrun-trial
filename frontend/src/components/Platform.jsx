import React from 'react';

const Platform = ({ platform }) => {
  return (
    <div 
      className="absolute"
      style={{
        left: `${platform.x}px`,
        top: `${platform.y}px`,
        width: `${platform.width}px`,
        height: `${platform.height}px`,
      }}
    >
      {/* If image asset is available, use it, otherwise use a styled div */}
      <div className="w-full h-full bg-purple-700 bg-opacity-80 relative overflow-hidden">
        {/* Grid pattern for cyberpunk style */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(to right, rgba(157, 23, 255, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(157, 23, 255, 0.2) 1px, transparent 1px)',
          backgroundSize: '8px 8px'
        }}></div>
        
        {/* Top edge highlight */}
        <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400"></div>
      </div>
    </div>
  );
};

export default Platform;