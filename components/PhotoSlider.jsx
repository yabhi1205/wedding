"use client";
import React, { useRef } from "react";
import Image from "next/image";

const PhotoSlider = () => {
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

  const containerRef = useRef(null);

  return (
    <div
      ref={containerRef}
      className="relative" 
      style={{ perspective: "500px" }}
    >
      <div className="sticky top-0 z-50 pt-8 pb-6 text-center max-w-screen">
        <h2 className="text-4xl font-bold">Our Journey Together</h2>
      </div>

      {photos.map((photo, index) => {
        const totalPhotos = photos.length;
        const rotationFactor = (index / (totalPhotos - 1) - 0.5);
        const rotation = rotationFactor * 25; // Same as in original SCSS

        return (
          <figure
            key={index}
            className="sticky top-0 flex items-center justify-center w-[90vw] mx-auto overflow-x-hidden h-screen"
          >
            <img 
              src={photo}
              alt={`Wedding photo ${index + 1}`}
              className="rounded-md"
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
