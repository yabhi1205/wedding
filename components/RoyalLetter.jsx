'use client';
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const RoyalLetter = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Load texture
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/images/royal-letter.png', () => {
      startUnrolling();
    });

    // Create plane with more subdivisions for smooth animation
    const width = 4;
    const height = 6;
    const geometry = new THREE.PlaneGeometry(width, height, 1, 100); // 100 segments vertically for smooth roll
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide
    });

    const scroll = new THREE.Mesh(geometry, material);
    scene.add(scroll);

    // Store original positions
    const originalPositions = geometry.attributes.position.array.slice();

    // Animation variables
    let unrolling = false;
    let progress = 0;
    const animationDuration = 3; // 3 seconds for smooth unrolling
    const lastTime = { value: Date.now() };

    function startUnrolling() {
      unrolling = true;
      progress = 0;
      lastTime.value = Date.now();
    }

    function applyUnrollEffect(progress) {
      const positions = geometry.attributes.position.array;
      const TWO_PI = Math.PI * 2;

      for (let i = 0; i < positions.length; i += 3) {
        const x = originalPositions[i];
        const y = originalPositions[i + 1];

        // Normalize y from top (0) to bottom (1)
        const normalizedY = (y + height / 2) / height;

        // If the section is already unrolled
        if (normalizedY <= progress) {
          positions[i] = x;
          positions[i + 1] = y;
          positions[i + 2] = 0;
        } else {
          // Roll intensity
          const rollFactor = 3; // Adjust for tightness
          const rollAmount = (normalizedY - progress) / (1 - progress);
          
          // Rolling radius decreasing as it unrolls
          const radius = 0.7 * (1 - Math.pow(1 - rollAmount, 2));

          // Compute roll angle
          const angle = rollAmount * TWO_PI * rollFactor;

          // Circular displacement
          positions[i] = x;
          positions[i + 1] = y - radius * (1 - Math.cos(angle)); // Adjust y to unroll downwards
          positions[i + 2] = radius * Math.sin(angle); // Z creates the roll effect
        }
      }

      geometry.attributes.position.needsUpdate = true;
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (unrolling) {
        const currentTime = Date.now();
        const deltaTime = (currentTime - lastTime.value) / 1000;
        lastTime.value = currentTime;

        progress += deltaTime / animationDuration;

        if (progress >= 1.0) {
          progress = 1.0;
          unrolling = false;
        }

        applyUnrollEffect(progress);
      }

      renderer.render(scene, camera);
    };
    
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Restart animation when component enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !unrolling && progress < 0.1) {
          startUnrolling();
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();

      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="flex flex-col items-center py-16">
      <h2 className="text-3xl font-semibold mb-8 text-center">Wedding Invitation</h2>
      <div 
        ref={containerRef} 
        className="w-full max-w-2xl h-[60vh] mx-auto"
      ></div>
    </div>
  );
};

export default RoyalLetter;
