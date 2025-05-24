"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

const PhotoSlider = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);
  const bgElementsRef = useRef(null);
  const animationFrameRef = useRef(null);
  const particlesRef = useRef([]);

  const photos = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=1200&q=80",
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1200&h=1200&q=80",
    "https://images.unsplash.com/photo-1497671954146-59a89ff626ff?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=1200&q=80",
    "https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=1200&q=80",
    "https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=1200&q=80",
    "https://images.unsplash.com/photo-1573480813647-552e9b7b5394?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=1200&q=80",
    "https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1200&h=1200&q=80",
    "https://images.unsplash.com/photo-1544568104-5b7eb8189dd4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=1200&q=80",
    "https://images.unsplash.com/photo-1555424221-250de2a343ad?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1200&h=1200&q=80",
  ];

  // Set isMounted to true after component mounts on client
  useEffect(() => {
    setIsMounted(true);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  
  // Track scroll position
  useEffect(() => {
    if (!isMounted) return;
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMounted]);

  // Initialize and animate background particles
  useEffect(() => {
    if (!isMounted || !containerRef.current) return;

    // Get container dimensions
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerHeight = containerRef.current.scrollHeight;
    const containerWidth = containerRect.width;
    
    // Create floating elements container - positioned behind everything else
    const bgElements = document.createElement("div");
    bgElements.className = "absolute inset-0 pointer-events-none";
    bgElements.style.zIndex = "-1"; // Behind everything
    bgElements.style.height = `${containerHeight}px`;
    bgElements.style.width = "100%";
    containerRef.current.appendChild(bgElements);
    bgElementsRef.current = bgElements;

    // Create particles array
    const particleCount = 50;
    particlesRef.current = Array(particleCount)
      .fill()
      .map(() => {
        // Randomly select particle type: 0 = heart, 1 = petal, 2 = flower, 3 = star
        const type = Math.floor(Math.random() * 4);

        // Create particle element
        const element = document.createElement("div");
        element.className = "absolute opacity-70";

        // Set content based on type
        if (type === 0) {
          element.innerHTML = "❤️";
          element.style.fontSize = `${Math.random() * 20 + 10}px`;
        } else if (type === 1) {
          element.innerHTML = "🌸";
          element.style.fontSize = `${Math.random() * 20 + 10}px`;
        } else if (type === 2) {
          element.innerHTML = "✨";
          element.style.fontSize = `${Math.random() * 15 + 8}px`;
        } else {
          element.innerHTML = "💫";
          element.style.fontSize = `${Math.random() * 18 + 9}px`;
        }

        bgElements.appendChild(element);

        // Distribute particles evenly across the container
        return {
          element,
          x: Math.random() * containerWidth,
          y: Math.random() * (containerHeight + window.innerHeight) - window.innerHeight/2,
          baseY: Math.random() * containerHeight,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: -0.2 - Math.random() * 0.5,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 0.5,
          amplitude: Math.random() * 15 + 5,
          frequency: Math.random() * 0.02 + 0.01,
          phase: Math.random() * Math.PI * 2,
          scale: 0.5 + Math.random() * 0.8,
        };
      });

    // Animation function
    const animate = () => {
      // Calculate relative scroll position within the container
      const containerTop = containerRef.current.getBoundingClientRect().top;
      const scrollPosition = -containerTop;
      const scrollFactor = 0.8; // Increased for more pronounced effect
      
      particlesRef.current.forEach((particle) => {
        // Base movement
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.phase += 0.01;

        // Add wave motion for side-to-side movement
        const waveOffset = Math.sin(particle.phase) * particle.amplitude;
        
        // Scroll-based position adjustment
        const scrollOffset = scrollPosition * scrollFactor;
        
        // Update rotation
        particle.rotation += particle.rotationSpeed;

        // Wrap around screen edges horizontally
        if (particle.x < -50) particle.x = containerWidth + 50;
        if (particle.x > containerWidth + 50) particle.x = -50;
        
        // Wrap around vertically within container bounds
        if (particle.y < -window.innerHeight) {
          particle.y = containerHeight + window.innerHeight/2;
        }
        if (particle.y > containerHeight + window.innerHeight/2) {
          particle.y = -window.innerHeight;
        }

        // Apply position with scroll influence
        particle.element.style.transform = `translate(${
          particle.x + waveOffset
        }px, ${particle.y - scrollOffset}px) rotate(${particle.rotation}deg) scale(${particle.scale})`;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      if (bgElementsRef.current && containerRef.current.contains(bgElementsRef.current)) {
        containerRef.current.removeChild(bgElementsRef.current);
      }
    };
  }, [isMounted]);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ perspective: "500px" }}
    >
      {/* Added mt-8 to the heading */}
      <div className="sticky top-0 z-50 pt-8 mt-8 pb-6 text-center max-w-screen">
        <h2 className="text-4xl font-bold">Our Journey Together</h2>
      </div>

      {photos.map((photo, index) => {
        const totalPhotos = photos.length;
        const rotationFactor = index / (totalPhotos - 1) - 0.5;
        const rotation = rotationFactor * 25;

        return (
          <figure
            key={index}
            className="sticky top-0 flex items-center justify-center w-[90vw] mx-auto overflow-x-hidden h-screen"
          >
            <img
              src={photo}
              alt={`Wedding photo ${index + 1}`}
              className="rounded-md shadow-lg"
              style={{
                width: "100vmin",
                height: "100vmin",
                objectFit: "cover",
                transform: `scale(0.6) rotate(${rotation}deg)`,
              }}
            />
          </figure>
        );
      })}
    </div>
  );
};

export default PhotoSlider;