'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  useEffect(() => {
    if (!isMounted) return;
    
    const leavesContainer = document.getElementById('leaves');
    if (!leavesContainer) return;
    
    // Initial leaf creation
    createInitialLeaves();
    
    // Continuously add new leaves
    const interval = setInterval(() => {
      addNewLeaves(3); // Add 3 new leaves every second
    }, 1000);
    
    // Function to create initial set of leaves
    function createInitialLeaves() {
      // Create 30-40 leaves with staggered animation start times
      const leafCount = 35;
      for (let i = 0; i < leafCount; i++) {
        createLeaf(i * 100); // Stagger creation by 100ms
      }
    }
    
    // Function to add new leaves periodically
    function addNewLeaves(count) {
      for (let i = 0; i < count; i++) {
        createLeaf(i * 200); // Stagger new leaves
      }
    }
    
    // Create a single leaf with specified delay
    function createLeaf(delay) {
      setTimeout(() => {
        const leaf = document.createElement('i');
        
        // Randomize horizontal position
        leaf.style.left = `${Math.random() * 100}%`;
        
        // Start above the viewport
        leaf.style.top = `-${Math.random() * 50 + 20}px`;
        
        // Add animation end listener to remove leaf when animation completes
        leaf.addEventListener('animationend', () => {
          leaf.remove();
        });
        
        leavesContainer.appendChild(leaf);
      }, delay);
    }
    
    return () => clearInterval(interval);
  }, [isMounted]);
  
  return (
    <div className="hero-container relative h-[100dvh] w-full flex justify-center items-center overflow-hidden">
      {/* Falling Leaves */}
      <div id="leaves"></div>
      
      {/* Background elements */}
      <Image
        src="/images/t.png"
        width={1200}
        height={800}
        className="absolute -bottom-10 md:-bottom-[22%] -z-10 max-w-full md:w-[80%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] -translate-x-1/2 left-1/2"
        alt="Background decoration"
      />
      <Image
        src="/images/q.png"
        width={800}
        height={400}
        className="absolute bottom-[20%] md:bottom-[10%] w-[60%] mx-auto md:w-[50%] lg:w-[40%] xl:w-[30%] 2xl:w-[20%] -translate-x-1/2 left-1/2"
        alt="Decoration element"
      />

      <Image
        src={"/images/ganesh-ji.jpeg"}
        width={500}
        height={500}
        className="absolute top-[5%] md:top-[4%] left-1/2 mix-blend-multiply -translate-x-1/2 w-[40%] md:w-[30%] lg:w-[20%] xl:w-[15%] 2xl:w-[10%] z-10"
        alt="Ganesh Ji"
      />

      {/* Wedding text */}
      <div className="absolute top-[30%] text-center z-10">
        <h1 className="font-semibold text-[#86A788] text-4xl italic">
          ABHISHEK
        </h1>
        <h2 className="text-2xl">weds</h2>
        <h1 className="font-semibold text-4xl text-[#86A788] italic">PRACHI</h1>
      </div>

      {/* Grass elements */}
      <div className="absolute bottom-0 left-0 w-full z-20">
        <Image
          src="/images/grass.png"
          width={500}
          height={300}
          className="absolute bottom-[59vh] left-0 h-[60vh] w-auto"
          alt="Decorative grass"
        />
        <Image
          src="/images/grass.png"
          width={500}
          height={300}
          className="absolute bottom-0 left-0 h-[60vh] w-auto"
          alt="Decorative grass"
        />
        <Image
          src="/images/grass.png"
          width={500}
          height={300}
          className="absolute bottom-[59vh] right-0 h-[60vh] w-auto transform rotate-180"
          alt="Decorative grass"
        />
        <Image
          src="/images/grass.png"
          width={500}
          height={300}
          className="absolute bottom-0 right-0 h-[60vh] w-auto transform rotate-180"
          alt="Decorative grass"
        />
      </div>
    </div>
  );
};

export default Hero;
