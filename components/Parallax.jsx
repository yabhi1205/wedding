'use client';
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function LandingParallax() {
  const [isMounted, setIsMounted] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Text animation: adjusted for smoother effect
  const textY = useTransform(scrollY, [0, 500], [0, -150]);
  const textOpacity = useTransform(scrollY, [0, 400], [1, 0.6]);

  // Grid initial state: adjusted for better 3D appearance
  const initialRotate = 15;
  const initialScale = 0.85;
  
  // Animate grid transformation: smoothed out transitions
  const gridRotateX = useTransform(scrollY, [0, 600], [initialRotate, 0]);
  const gridRotateY = useTransform(scrollY, [0, 600], [initialRotate, 0]);
  const gridRotateZ = useTransform(scrollY, [0, 600], [initialRotate/2, 0]);
  const gridScale = useTransform(scrollY, [0, 500], [initialScale, 1]);

  // Improved parallax effect with wider range
  const parallaxCol1 = useTransform(scrollY, [0, 800], [150, -50]);
  const parallaxCol2 = useTransform(scrollY, [0, 800], [100, -100]);
  const parallaxCol3 = useTransform(scrollY, [0, 800], [50, -150]);

  if (!isMounted) {
    return <div className="min-h-screen bg-gray-100" />;
  }

  return (
    <div className="bg-gray-100">
      {/* Main section with extra height for better scroll effect */}
      <div className="relative min-h-[150vh]">
        {/* Text Section - fixed position for visibility */}
        <motion.div
          className="fixed left-8 md:left-16 top-20 z-20 max-w-md"
          style={{ y: textY, opacity: textOpacity }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Welcome to Our Wedding</h1>
          <p className="mt-4 text-xl text-gray-600">
            Celebrating our love with style, motion, and a touch of magic.
          </p>
        </motion.div>

        {/* Image Grid Container - fixed to stay in view */}
        <motion.div
          className="fixed md:right-0 top-20 inset-x-0 md:inset-x-auto flex justify-center items-start pt-64 md:pt-0 md:pr-8 h-full"
          style={{
            rotateX: gridRotateX,
            rotateY: gridRotateY,
            rotateZ: gridRotateZ,
            scale: gridScale,
            perspective: "1000px",
          }}
        >
          <div className="grid grid-cols-3 gap-3 w-full max-w-md md:max-w-xl">
            {/* Column 1 */}
            <motion.div style={{ y: parallaxCol1 }} className="flex flex-col gap-3">
              <img src="https://picsum.photos/500/700?random=1-1" alt="" className="w-full h-32 md:h-48 object-cover rounded-lg shadow-md" />
              <img src="https://picsum.photos/500/700?random=1-2" alt="" className="w-full h-32 md:h-48 object-cover rounded-lg shadow-md" />
              <img src="https://picsum.photos/500/700?random=1-3" alt="" className="w-full h-32 md:h-48 object-cover rounded-lg shadow-md" />
            </motion.div>

            {/* Column 2 */}
            <motion.div style={{ y: parallaxCol2 }} className="flex flex-col gap-3">
              <img src="https://picsum.photos/500/700?random=2-1" alt="" className="w-full h-32 md:h-48 object-cover rounded-lg shadow-md" />
              <img src="https://picsum.photos/500/700?random=2-2" alt="" className="w-full h-32 md:h-48 object-cover rounded-lg shadow-md" />
              <img src="https://picsum.photos/500/700?random=2-3" alt="" className="w-full h-32 md:h-48 object-cover rounded-lg shadow-md" />
            </motion.div>

            {/* Column 3 */}
            <motion.div style={{ y: parallaxCol3 }} className="flex flex-col gap-3">
              <img src="https://picsum.photos/500/700?random=3-1" alt="" className="w-full h-32 md:h-48 object-cover rounded-lg shadow-md" />
              <img src="https://picsum.photos/500/700?random=3-2" alt="" className="w-full h-32 md:h-48 object-cover rounded-lg shadow-md" />
              <img src="https://picsum.photos/500/700?random=3-3" alt="" className="w-full h-32 md:h-48 object-cover rounded-lg shadow-md" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Additional scrollable section for more animation space */}
      <div className="h-[100vh]"></div>
    </div>
  );
}