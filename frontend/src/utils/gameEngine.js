/**
 * Game Engine - Handles game physics and core logic
 */

const GRAVITY = 0.5;
const JUMP_FORCE = -10;
const MOVE_SPEED = 5;
const GAME_WIDTH = 800;
const GAME_HEIGHT = 400;

// Game physics calculations
export const applyPhysics = (entity, platforms, reverseGravity = false) => {
  // Apply gravity
  const gravityForce = reverseGravity ? -GRAVITY : GRAVITY;
  entity.velocity.y += gravityForce;
  
  // Update position based on velocity
  entity.position.y += entity.velocity.y;
  entity.position.x += entity.velocity.x;
  
  // Handle platform collisions
  let onGround = false;
  
  for (const platform of platforms) {
    // Check if entity is on a platform
    if (!reverseGravity) {
      // Normal gravity collision check
      if (entity.position.y + entity.height >= platform.y && 
          entity.position.y + entity.height <= platform.y + platform.height/2 &&
          entity.position.x + entity.width > platform.x && 
          entity.position.x < platform.x + platform.width) {
        entity.position.y = platform.y - entity.height;
        entity.velocity.y = 0;
        onGround = true;
      }
    } else {
      // Reverse gravity collision check
      if (entity.position.y <= platform.y + platform.height && 
          entity.position.y >= platform.y + platform.height/2 &&
          entity.position.x + entity.width > platform.x && 
          entity.position.x < platform.x + platform.width) {
        entity.position.y = platform.y + platform.height;
        entity.velocity.y = 0;
        onGround = true;
      }
    }
  }
  
  // Handle world boundaries
  if (entity.position.x < 0) {
    entity.position.x = 0;
    entity.velocity.x = 0;
  }
  
  if (entity.position.x + entity.width > GAME_WIDTH) {
    entity.position.x = GAME_WIDTH - entity.width;
    entity.velocity.x = 0;
  }
  
  if (!reverseGravity) {
    if (entity.position.y + entity.height > GAME_HEIGHT) {
      entity.position.y = GAME_HEIGHT - entity.height;
      entity.velocity.y = 0;
      onGround = true;
    }
  } else {
    if (entity.position.y < 0) {
      entity.position.y = 0;
      entity.velocity.y = 0;
      onGround = true;
    }
  }
  
  return { ...entity, onGround };
};

// Make entity jump
export const jump = (entity, reverseGravity = false) => {
  if (entity.onGround) {
    const force = reverseGravity ? -JUMP_FORCE : JUMP_FORCE;
    return {
      ...entity,
      velocity: {
        ...entity.velocity,
        y: force
      }
    };
  }
  return entity;
};

// Move entity horizontally
export const move = (entity, direction, reverseControls = false) => {
  const dir = reverseControls ? -direction : direction;
  return {
    ...entity,
    velocity: {
      ...entity.velocity,
      x: MOVE_SPEED * dir
    }
  };
};

// Stop horizontal movement
export const stopMoving = (entity) => {
  return {
    ...entity,
    velocity: {
      ...entity.velocity,
      x: 0
    }
  };
};

// Check collision between two entities
export const checkCollision = (entity1, entity2) => {
  return entity1.position.x < entity2.position.x + entity2.width &&
         entity1.position.x + entity1.width > entity2.position.x &&
         entity1.position.y < entity2.position.y + entity2.height &&
         entity1.position.y + entity1.height > entity2.position.y;
};

// Generate a random platform
export const generateRandomPlatform = () => {
  return {
    x: Math.random() * (GAME_WIDTH - 200),
    y: Math.random() * (GAME_HEIGHT - 100) + 50,
    width: Math.random() * 100 + 100,
    height: 20
  };
};

// Generate a random obstacle
export const generateRandomObstacle = () => {
  return {
    x: GAME_WIDTH,
    y: Math.random() * (GAME_HEIGHT - 80) + 30,
    width: 30,
    height: 30,
    velocity: {
      x: -(Math.random() * 3 + 2),
      y: 0
    }
  };
};

// Create initial game state
export const createInitialGameState = () => {
  return {
    player: {
      position: { x: 100, y: 300 },
      velocity: { x: 0, y: 0 },
      width: 30,
      height: 40,
      onGround: false
    },
    platforms: [
      { x: 0, y: 350, width: GAME_WIDTH, height: 50 }
    ],
    obstacles: [],
    score: 0,
    gameOver: false,
    reverseGravity: false,
    reverseControls: false
  };
};