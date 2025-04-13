/**
 * This is a simulated Groq API service for frontend development
 * It will be replaced with actual API calls later
 */

// Simulated delay to mimic API call
const simulateApiCall = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 1000);
    });
  };
  
  // List of possible chaos events
  const CHAOS_EVENTS = [
    {
      type: 'gravity',
      message: "Gravity? Who needs it!",
      effect: "reverse-gravity",
      description: "Reverses the gravity in the game"
    },
    {
      type: 'controls',
      message: "Controls scrambled. Have fun!",
      effect: "reverse-controls",
      description: "Reverses the player controls"
    },
    {
      type: 'platforms',
      message: "Chaos mode activated!",
      effect: "platform-shuffle",
      description: "Shuffles the platform layout"
    },
    {
      type: 'speed',
      message: "Speed boost engaged!",
      effect: "speed-up",
      description: "Increases the game speed temporarily"
    },
    {
      type: 'obstacles',
      message: "Everything is fine... or is it?",
      effect: "random-obstacles",
      description: "Spawns random obstacles"
    },
    {
      type: 'glitch',
      message: "System glitching... Uh oh!",
      effect: "screen-glitch",
      description: "Creates visual glitches on screen"
    },
    {
      type: 'teleport',
      message: "Teleportation initiated!",
      effect: "teleport-player",
      description: "Teleports the player to a random location"
    },
    {
      type: 'powerup',
      message: "Feeling lucky?",
      effect: "random-powerup",
      description: "Spawns a random powerup"
    }
  ];
  
  // Sarcastic Groq AI responses
  const GROQ_RESPONSES = [
    "Oh, you think you're good at this? Let me fix that.",
    "Having too much fun? Time for some chaos!",
    "You asked for it! Chaos incoming in 3... 2... 1...",
    "I see you're doing well. Would be a shame if someone... changed the game.",
    "Your skills are impressive. Let's make it harder, shall we?",
    "Bored? Let me spice things up for you!",
    "System instability detected. Just kidding, I'm doing this on purpose.",
    "You humans are so predictable. Let's add some unpredictability.",
    "I'm not saying you're bad at this game, but... actually, yes I am.",
    "Welcome to MY world. I make the rules here."
  ];
  
  // Simulated Groq API service
  const groqService = {
    // Get a random chaos event
    getChaosEvent: async () => {
      const randomEvent = CHAOS_EVENTS[Math.floor(Math.random() * CHAOS_EVENTS.length)];
      return simulateApiCall(randomEvent);
    },
    
    // Send message to Groq AI and get response
    sendMessage: async (message) => {
      // Check message content to potentially trigger specific events
      let response = {
        text: GROQ_RESPONSES[Math.floor(Math.random() * GROQ_RESPONSES.length)],
        triggeredEvent: null
      };
      
      // Analyze message for keywords
      const lowerMessage = message.toLowerCase();
      
      if (lowerMessage.includes('harder') || lowerMessage.includes('challenge')) {
        // Find a challenging event
        const challengingEvents = CHAOS_EVENTS.filter(e => 
          ['reverse-gravity', 'reverse-controls', 'speed-up'].includes(e.effect)
        );
        response.triggeredEvent = challengingEvents[Math.floor(Math.random() * challengingEvents.length)];
      } 
      else if (lowerMessage.includes('help') || lowerMessage.includes('easier')) {
        // Pretend to help but still cause chaos
        response.text = "Sure, I'll 'help' you... in my own way.";
        response.triggeredEvent = CHAOS_EVENTS.find(e => e.effect === 'random-powerup');
      }
      else if (lowerMessage.includes('gravity')) {
        response.triggeredEvent = CHAOS_EVENTS.find(e => e.effect === 'reverse-gravity');
      }
      else if (lowerMessage.includes('control')) {
        response.triggeredEvent = CHAOS_EVENTS.find(e => e.effect === 'reverse-controls');
      }
      else if (lowerMessage.includes('platform') || lowerMessage.includes('ground')) {
        response.triggeredEvent = CHAOS_EVENTS.find(e => e.effect === 'platform-shuffle');
      }
      else if (lowerMessage.includes('obstacle') || lowerMessage.includes('block')) {
        response.triggeredEvent = CHAOS_EVENTS.find(e => e.effect === 'random-obstacles');
      }
      else if (lowerMessage.includes('glitch') || lowerMessage.includes('bug')) {
        response.triggeredEvent = CHAOS_EVENTS.find(e => e.effect === 'screen-glitch');
      }
      else {
        // Random chance to trigger event even without keywords
        if (Math.random() < 0.7) {
          response.triggeredEvent = CHAOS_EVENTS[Math.floor(Math.random() * CHAOS_EVENTS.length)];
        }
      }
      
      return simulateApiCall(response);
    },
    
    // Generate a meme image (simulated)
    generateMeme: async (prompt) => {
      // In actual implementation, this would call Groq's multimodal API
      return simulateApiCall({
        imageUrl: `/api/placeholder/${Math.floor(Math.random() * 200) + 300}/${Math.floor(Math.random() * 100) + 200}`,
        altText: `Generated meme based on: ${prompt}`
      });
    },
    
    // Generate audio response (simulated)
    generateAudio: async (text) => {
      // In actual implementation, this would call Groq's audio API
      return simulateApiCall({
        audioUrl: '#', // Would be a real URL in actual implementation
        text: text,
        duration: Math.floor(Math.random() * 5) + 2 // Simulated duration in seconds
      });
    }
  };
  
  export default groqService;