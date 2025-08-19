import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// A single, reusable component for a particle
const FloatingDot = () => {
  // useMemo ensures these random values are calculated only once per component instance
  const { size, initialX, initialY, duration, animationPath, delay, opacity, blur } = useMemo(() => {
    // Create varied sizes for depth effect
    const random = Math.random();
    let size, opacity, blur;
    
    if (random < 0.3) {
      // Small particles (background) - 30%
      size = Math.random() * 2 + 0.5; // 0.5px to 2.5px
      opacity = Math.random() * 0.3 + 0.1; // Very faint
      blur = 0;
    } else if (random < 0.6) {
      // Medium particles - 30%
      size = Math.random() * 4 + 2; // 2px to 6px
      opacity = Math.random() * 0.4 + 0.2; // Medium opacity
      blur = 0;
    } else if (random < 0.85) {
      // Large particles (foreground) - 25%
      size = Math.random() * 6 + 4; // 4px to 10px
      opacity = Math.random() * 0.5 + 0.3; // More visible
      blur = 0;
    } else {
      // Extra large blurred particles for depth - 15%
      size = Math.random() * 12 + 8; // 8px to 20px
      opacity = Math.random() * 0.2 + 0.05; // Very faint but large
      blur = Math.random() * 3 + 1; // 1px to 4px blur
    }

    const initialX = Math.random() * 100; // Initial horizontal position in %
    const initialY = Math.random() * 100; // Initial vertical position in %
    const duration = Math.random() * 20 + 15; // Fast duration: 15 to 35 seconds
    const delay = Math.random() * 10; // Staggered start times

    // Creates fast, free movement across the entire page
    const moveDistanceX = Math.random() * 300 + 200; // 200px to 500px horizontal movement
    const moveDistanceY = Math.random() * 300 + 200; // 200px to 500px vertical movement
    
    // Random waypoints for free movement
    const randomX1 = (Math.random() - 0.5) * moveDistanceX;
    const randomY1 = (Math.random() - 0.5) * moveDistanceY;
    const randomX2 = (Math.random() - 0.5) * moveDistanceX;
    const randomY2 = (Math.random() - 0.5) * moveDistanceY;
    const randomX3 = (Math.random() - 0.5) * moveDistanceX;
    const randomY3 = (Math.random() - 0.5) * moveDistanceY;

    return {
      size,
      initialX,
      initialY,
      duration,
      delay,
      opacity,
      blur,
      animationPath: {
        x: [0, randomX1, randomX2, randomX3, 0],
        y: [0, randomY1, randomY2, randomY3, 0],
      },
    };
  }, []);

  return (
    <motion.div
      style={{
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        background: `rgba(33, 150, 243, ${opacity})`,
        borderRadius: '50%',
        left: `${initialX}%`,
        top: `${initialY}%`,
        zIndex: 1,
        filter: blur > 0 ? `blur(${blur}px)` : 'none',
      }}
      initial={{ x: 0, y: 0 }}
      animate={animationPath}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: 'linear',
        delay: delay,
      }}
    />
  );
};

// The main component that renders all the particles
const ParticleBackground = () => {
  // More particles for better depth effect
  const PARTICLE_COUNT = 800;

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {[...Array(PARTICLE_COUNT)].map((_, i) => (
        <FloatingDot key={`dot-${i}`} />
      ))}
    </div>
  );
};

export default ParticleBackground;