"use client";
import React, { useEffect, useState, useRef } from "react";
import { FaHeart, FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";

const Footer = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const particlesRef = useRef([]);
  const controls = Array(20)
    .fill()
    .map(() => useAnimation());
  const animationFrameRef = useRef();
  const lastTimeRef = useRef(0);

  // Initialize particle positions with velocity property
  useEffect(() => {
    if (typeof window === "undefined") return; // Prevent SSR issues
    particlesRef.current = Array(20)
      .fill()
      .map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * 300 + 50,
        size: Math.random() * 25 + 8,
        initialX: Math.random() * window.innerWidth,
        initialY: Math.random() * 300 + 50,
        vx: 0, // x velocity
        vy: 0, // y velocity
        color: `rgba(${Math.floor(Math.random() * 255)}, ${
          Math.floor(Math.random() * 100) + 155
        }, ${Math.floor(Math.random() * 255)}, ${Math.random() * 0.3 + 0.2})`,
        idleSpeed: Math.random() * 0.5 + 0.2, // Base speed when idle
      }));

    // Start animation loop
    animateParticles();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Setup mouse movement listener
  useEffect(() => {
    if (typeof window === "undefined") return; // Prevent SSR issues
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Smooth animation loop with time-based movement
  const animateParticles = () => {
    if (typeof window === "undefined") return; // Prevent SSR issues
    const currentTime = performance.now();
    const deltaTime = (currentTime - lastTimeRef.current) / 1000; // seconds
    lastTimeRef.current = currentTime;

    particlesRef.current.forEach((particle, index) => {
      const { x: mouseX, y: mouseY } = mousePosition;
      const dx = mouseX - particle.x;
      const dy = mouseY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Speed factor based on distance to cursor
      const interactionRadius = 250;
      const distanceFactor = Math.max(0, 1 - distance / interactionRadius);
      const speedFactor =
        distanceFactor > 0 ? 5 + distanceFactor * 10 : particle.idleSpeed;

      // Calculate forces
      let forceX = 0;
      let forceY = 0;

      if (distance < interactionRadius) {
        // Strong repulsion when cursor is near
        const force = Math.pow(1 - distance / interactionRadius, 2) * 800;
        forceX = (dx / distance) * force * -1;
        forceY = (dy / distance) * force * -1;
      }

      // Return to original position with elastic effect
      const returnForceX =
        (particle.initialX - particle.x) * (0.03 + distanceFactor * 0.05);
      const returnForceY =
        (particle.initialY - particle.y) * (0.03 + distanceFactor * 0.05);

      // Add small random movement when idle
      const idleForceX = (Math.random() - 0.5) * particle.idleSpeed;
      const idleForceY = (Math.random() - 0.5) * particle.idleSpeed;

      // Calculate acceleration (force)
      const ax =
        forceX + returnForceX + (distance > interactionRadius ? idleForceX : 0);
      const ay =
        forceY + returnForceY + (distance > interactionRadius ? idleForceY : 0);

      // Update velocity with damping
      particle.vx = particle.vx * 0.9 + ax * deltaTime;
      particle.vy = particle.vy * 0.9 + ay * deltaTime;

      // Apply velocity - faster when cursor is near, slower when far
      particle.x += particle.vx * speedFactor;
      particle.y += particle.vy * speedFactor;

      // Animate to new position with dynamic speed
      controls[index].start({
        x: particle.x,
        y: particle.y,
        transition: {
          type: "spring",
          stiffness: 50 + distanceFactor * 200,
          damping: 20 - distanceFactor * 10,
          mass: 1 - distanceFactor * 0.5,
        },
      });
    });

    animationFrameRef.current = requestAnimationFrame(animateParticles);
  };

  return (
    <footer className="relative overflow-hidden !pt-20 !pb-10">
      {/* Funky animated background */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-pink-100 via-white to-purple-100"
        style={{
          backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,192,203,0.3) 0%, rgba(255,255,255,0) 50%)`,
        }}
      >
        {/* Smooth interactive particles */}
        {particlesRef.current.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full shadow-sm"
            custom={i}
            animate={controls[i]}
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              filter: i % 3 === 0 ? "blur(1px)" : "none",
            }}
          />
        ))}

        {/* Wave SVG separator */}
        <div className="absolute top-0 left-0 w-full overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block h-16 w-full"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-white"
            ></path>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="flex flex-col items-center">
          {/* Monogram */}
          <div className="mb-8 relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center shadow-lg">
              <h2 className="text-3xl font-serif text-white font-bold">A&R</h2>
            </div>
            <motion.div
              className="absolute -top-2 -right-2 text-pink-500"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <FaHeart size={20} />
            </motion.div>
          </div>

          {/* Wedding date */}
          <h3 className="text-xl font-serif text-gray-700 mb-6">
            April 15, 2025
          </h3>

          {/* Social media links */}
          <div className="flex space-x-6 mb-10">
            <a
              href="#"
              className="transform transition-transform hover:scale-110 hover:-translate-y-1 duration-300"
            >
              <FaInstagram size={24} className="text-pink-500" />
            </a>
            <a
              href="#"
              className="transform transition-transform hover:scale-110 hover:-translate-y-1 duration-300"
            >
              <FaFacebook size={24} className="text-pink-500" />
            </a>
            <a
              href="#"
              className="transform transition-transform hover:scale-110 hover:-translate-y-1 duration-300"
            >
              <FaTwitter size={24} className="text-pink-500" />
            </a>
          </div>

          {/* Divider */}
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-pink-300 to-transparent mb-6"></div>

          {/* Copyright */}
          <p className="text-gray-500 text-center mb-2">
            © 2025 Abhishek & Prachi
          </p>
          <p className="text-gray-400 text-sm flex items-center">
            Made with <FaHeart className="text-pink-400 mx-1" size={12} /> for
            our special day
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
