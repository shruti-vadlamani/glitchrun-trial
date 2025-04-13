import React, { useEffect, useState, useRef } from 'react';
import GroqChat from './GroqChat';
import ChaosEvent from './ChaosEvent';

const GAME_WIDTH = 800;
const GAME_HEIGHT = 400;

function Game() {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [playerPosition, setPlayerPosition] = useState({ x: 100, y: 300 });
  const [playerVelocity, setPlayerVelocity] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [platforms, setPlatforms] = useState([
    { x: 0, y: 350, width: GAME_WIDTH, height: 50 }
  ]);
  const [obstacles, setObstacles] = useState([]);
  const [chaosActive, setChaosActive] = useState(false);
  const [chaosMessage, setChaosMessage] = useState('');
  const [reverseGravity, setReverseGravity] = useState(false);
  const [reverseControls, setReverseControls] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  
  const gameLoopRef = useRef(null);
  const chaosTimerRef = useRef(null);
  const obstacleTimerRef = useRef(null);
  
  // Game loop
  useEffect(() => {
    if (!gameStarted) return;
    
    // Handle player movement and physics
    const updateGame = () => {
      // Update player position based on physics
      setPlayerPosition(prev => {
        const gravity = reverseGravity ? -0.5 : 0.5;
        let newY = prev.y + playerVelocity;
        let newVelocity = playerVelocity + gravity;
        
        // Check collision with platforms
        for (const platform of platforms) {
          if (!reverseGravity && 
              newY + 40 >= platform.y && 
              prev.y + 40 <= platform.y &&
              prev.x + 30 > platform.x && 
              prev.x < platform.x + platform.width) {
            newY = platform.y - 40;
            newVelocity = 0;
            setIsJumping(false);
          } else if (reverseGravity && 
                    newY <= platform.y + platform.height && 
                    prev.y >= platform.y + platform.height &&
                    prev.x + 30 > platform.x && 
                    prev.x < platform.x + platform.width) {
            newY = platform.y + platform.height;
            newVelocity = 0;
            setIsJumping(false);
          }
        }
        
        // Boundary checks
        if (reverseGravity) {
          if (newY < 0) {
            newY = 0;
            newVelocity = 0;
          }
        } else {
          if (newY > GAME_HEIGHT - 40) {
            newY = GAME_HEIGHT - 40;
            newVelocity = 0;
            setIsJumping(false);
          }
        }
        
        setPlayerVelocity(newVelocity);
        return { ...prev, y: newY };
      });
      
      // Move obstacles
      setObstacles(prev => {
        return prev.map(obs => ({ ...obs, x: obs.x - 5 }))
                  .filter(obs => obs.x > -30);
      });
      
      // Check collision with obstacles
      for (const obstacle of obstacles) {
        if (playerPosition.x + 30 > obstacle.x && 
            playerPosition.x < obstacle.x + 30 &&
            playerPosition.y + 40 > obstacle.y &&
            playerPosition.y < obstacle.y + 30) {
          // Handle collision (lose health, etc.)
          console.log("Collision with obstacle!");
        }
      }
      
      // Increment score
      setScore(prev => prev + 1);
    };
    
    gameLoopRef.current = setInterval(updateGame, 20);
    
    // Generate obstacles periodically
    obstacleTimerRef.current = setInterval(() => {
      setObstacles(prev => [...prev, { 
        x: GAME_WIDTH, 
        y: Math.random() * (GAME_HEIGHT - 80) + 30, 
        width: 30, 
        height: 30 
      }]);
    }, 2000);
    
    // Trigger chaos event every 30 seconds
    chaosTimerRef.current = setInterval(() => {
      triggerChaosEvent();
    }, 30000);
    
    return () => {
      clearInterval(gameLoopRef.current);
      clearInterval(obstacleTimerRef.current);
      clearInterval(chaosTimerRef.current);
    };
  }, [gameStarted, playerVelocity, platforms, obstacles, reverseGravity]);

  // Handle keyboard input
  useEffect(() => {
    if (!gameStarted) return;
    
    const handleKeyDown = (e) => {
      const moveDirection = reverseControls ? -1 : 1;
      
      switch (e.key) {
        case 'ArrowLeft':
          setPlayerPosition(prev => ({ ...prev, x: Math.max(0, prev.x - (10 * moveDirection)) }));
          break;
        case 'ArrowRight':
          setPlayerPosition(prev => ({ ...prev, x: Math.min(GAME_WIDTH - 30, prev.x + (10 * moveDirection)) }));
          break;
        case 'ArrowUp':
        case ' ':
          if (!isJumping) {
            const jumpVelocity = reverseGravity ? 10 : -10;
            setPlayerVelocity(jumpVelocity);
            setIsJumping(true);
          }
          break;
        case 'g':
          setChatVisible(prev => !prev);
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted, isJumping, reverseGravity, reverseControls]);

  const triggerChaosEvent = () => {
    // Simulate Groq API response for now
    const chaosEvents = [
      { message: "Gravity? Who needs it!", effect: "reverse-gravity" },
      { message: "Controls scrambled. Have fun!", effect: "reverse-controls" },
      { message: "Chaos mode activated!", effect: "platform-shuffle" },
      { message: "Speed boost engaged!", effect: "speed-up" },
      { message: "Everything is fine... or is it?", effect: "random-obstacles" }
    ];
    
    const randomEvent = chaosEvents[Math.floor(Math.random() * chaosEvents.length)];
    setChaosMessage(randomEvent.message);
    setChaosActive(true);
    
    // Apply effect based on the event
    switch (randomEvent.effect) {
      case "reverse-gravity":
        setReverseGravity(prev => !prev);
        break;
      case "reverse-controls":
        setReverseControls(prev => !prev);
        break;
      case "platform-shuffle":
        // Shuffle platform layout
        setPlatforms([
          { x: 0, y: 350, width: GAME_WIDTH, height: 50 },
          { x: Math.random() * (GAME_WIDTH - 200), y: Math.random() * 150 + 150, width: 200, height: 20 },
          { x: Math.random() * (GAME_WIDTH - 200), y: Math.random() * 150 + 150, width: 200, height: 20 }
        ]);
        break;
      case "speed-up":
        // Speed up obstacles temporarily
        setObstacles(prev => prev.map(obs => ({ ...obs, x: obs.x - 50 })));
        break;
      case "random-obstacles":
        // Spawn multiple random obstacles
        const newObstacles = [];
        for (let i = 0; i < 5; i++) {
          newObstacles.push({
            x: Math.random() * GAME_WIDTH,
            y: Math.random() * (GAME_HEIGHT - 80) + 30,
            width: 30,
            height: 30
          });
        }
        setObstacles(prev => [...prev, ...newObstacles]);
        break;
      default:
        break;
    }
    
    // Reset chaos message after 3 seconds
    setTimeout(() => {
      setChaosActive(false);
    }, 3000);
  };

  const handleGroqMessage = (message) => {
    // This would be replaced with actual Groq API call
    console.log("Player message to Groq:", message);
    
    // Simulate Groq response
    setTimeout(() => {
      const responses = [
        "Reverse gravity it is! Enjoy floating around!",
        "You asked for chaos? Here's some random obstacles!",
        "I'm feeling generous. Have some platforms to jump on!",
        "Controls reversed. Good luck figuring that out!"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      // Send this response to the chat and trigger a chaos event
      triggerChaosEvent();
    }, 1000);
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setPlayerPosition({ x: 100, y: 300 });
    setPlayerVelocity(0);
    setObstacles([]);
    setReverseGravity(false);
    setReverseControls(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      {!gameStarted ? (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
            GlitchRun
          </h1>
          <p className="text-xl mb-8 text-gray-300">
            Trapped in a digital battlefield controlled by chaos-causing AI Groq
          </p>
          <button
            onClick={startGame}
            className="py-3 px-8 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold rounded-md shadow-lg hover:from-purple-700 hover:to-cyan-600 transition duration-300"
          >
            Enter the Arena
          </button>
          <p className="text-sm mt-4 text-gray-400">
            Press Arrow keys to move, Space to jump, 'G' to chat with Groq
          </p>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute top-4 left-4 z-10 bg-black bg-opacity-70 p-2 rounded">
            <div className="text-cyan-400 font-mono">SCORE: {score}</div>
          </div>
          
          <button 
            className="absolute top-4 right-4 z-10 bg-purple-700 hover:bg-purple-600 p-2 rounded-full"
            onClick={() => setChatVisible(prev => !prev)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </button>
          
          <div 
            className="relative overflow-hidden bg-gray-800 border-4 border-purple-600 rounded-lg shadow-lg"
            style={{ width: `${GAME_WIDTH}px`, height: `${GAME_HEIGHT}px` }}
          >
            {/* Game background with grid effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-black to-purple-900">
              <div className="absolute inset-0" style={{ 
                backgroundImage: 'linear-gradient(#2a0e61 1px, transparent 1px), linear-gradient(90deg, #2a0e61 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}></div>
            </div>
            
            {/* Player character */}
            <div 
              className="absolute bg-cyan-500 rounded-sm"
              style={{
                left: `${playerPosition.x}px`,
                top: `${playerPosition.y}px`,
                width: '30px',
                height: '40px',
                transition: 'transform 0.1s',
                transform: reverseGravity ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            ></div>
            
            {/* Platforms */}
            {platforms.map((platform, index) => (
              <div 
                key={`platform-${index}`}
                className="absolute bg-purple-700"
                style={{
                  left: `${platform.x}px`,
                  top: `${platform.y}px`,
                  width: `${platform.width}px`,
                  height: `${platform.height}px`
                }}
              ></div>
            ))}
            
            {/* Obstacles */}
            {obstacles.map((obstacle, index) => (
              <div 
                key={`obstacle-${index}`}
                className="absolute bg-red-500 rounded-md"
                style={{
                  left: `${obstacle.x}px`,
                  top: `${obstacle.y}px`,
                  width: `${obstacle.width}px`,
                  height: `${obstacle.height}px`
                }}
              ></div>
            ))}
            
            {/* Chaos event notification */}
            {chaosActive && (
              <ChaosEvent message={chaosMessage} />
            )}
          </div>
          
          {/* Groq chat interface */}
          {chatVisible && (
            <GroqChat onSendMessage={handleGroqMessage} />
          )}
        </div>
      )}
    </div>
  );
}

export default Game;