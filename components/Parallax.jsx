import React from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';

export default function ParallaxSection() {
  const { scrollY } = useViewportScroll();

  // Create parallax effects: as you scroll, images move upward into place.
  const y1 = useTransform(scrollY, [0, 300], [50, 0]);
  const y2 = useTransform(scrollY, [0, 300], [100, 0]);
  const y3 = useTransform(scrollY, [0, 300], [150, 0]);

  return (
    <div className="min-h-screen flex items-center px-8">
      {/* Text Section */}
      <div className="w-1/2">
        <h1 className="text-5xl font-bold mb-4">Welcome to Our Wedding</h1>
        <p className="text-xl">
          Join us as we celebrate our love with joy, laughter, and unforgettable memories.
        </p>
      </div>

      {/* Images Section */}
      <div className="w-1/2 relative flex flex-col gap-4">
        <motion.img
          src="/images/image1.jpg"
          alt="Wedding Image 1"
          style={{ y: y1 }}
          className="w-full transform rotate-3 shadow-xl"
        />
        <motion.img
          src="/images/image2.jpg"
          alt="Wedding Image 2"
          style={{ y: y2 }}
          className="w-full transform -rotate-3 shadow-xl"
        />
        <motion.img
          src="/images/image3.jpg"
          alt="Wedding Image 3"
          style={{ y: y3 }}
          className="w-full transform rotate-6 shadow-xl"
        />
      </div>
    </div>
  );
}
