"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  FaMapMarkerAlt,
  FaDirections,
  FaCalendarAlt,
  FaClock,
  FaHeart,
} from "react-icons/fa";

const Address = () => {
  const [isMounted, setIsMounted] = useState(false);
  const sectionRef = useRef(null);
  const mapRef = useRef(null);
  const detailsRef = useRef(null);

  // Mount detection
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Add CSS styles when component mounts on client
  useEffect(() => {
    if (!isMounted) return;

    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      .animate-in {
        opacity: 1 !important;
        transform: translate(0, 0) !important;
      }
      
      .animate-spin-slow {
        animation: spin 15s linear infinite;
      }
      
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      
      .animate-fade-in {
        animation: fadeIn 2s ease-in forwards;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      .animate-slide-up {
        animation: slideUp 1.5s ease-out forwards;
      }
      
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .animate-bounce-slow {
        animation: bounce 3s infinite;
      }
      
      @keyframes bounce {
        0%, 100% { transform: translate(-50%, -50%); }
        50% { transform: translate(-50%, -60%); }
      }
      
      .animate-rotate {
        animation: rotate 6s linear infinite;
      }
      
      @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      
      .animate-scale {
        animation: scaleIn 1s ease-out forwards;
      }
      
      @keyframes scaleIn {
        from { transform: scale(0); }
        to { transform: scale(1); }
      }
      
      .animate-pulse-fast {
        animation: pulse 1.5s infinite;
      }
      
      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.7; }
      }
    `;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, [isMounted]);

  // Coordinates for directions
  const venueCoordinates = "28.52049768916006,77.19903907519881";

  // Venue details
  const venueDetails = {
    name: "Royal Wedding Palace",
    addressLine1: "123 Wedding Garden Road",
    addressLine2: "Ashok Nagar, Delhi",
    city: "New Delhi",
    state: "Delhi",
    postalCode: "110096",
    date: "April 15, 2025",
    time: "7:00 PM Onwards",
  };

  // Open Google Maps directions in a new tab
  const openDirections = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${venueCoordinates}`,
      "_blank"
    );
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    if (!isMounted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    if (mapRef.current) observer.observe(mapRef.current);
    if (detailsRef.current) observer.observe(detailsRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      if (mapRef.current) observer.unobserve(mapRef.current);
      if (detailsRef.current) observer.unobserve(detailsRef.current);
    };
  }, [isMounted]);

  return (
    <div className="overflow-hidden flex justify-center w-full">
      <div
        ref={sectionRef}
        className=" px-4 !py-20 md:my-20 sm:py-16 md:py-20 relative opacity-0 transition-all duration-1000 translate-y-10 w-full max-w-6xl mx-auto"
        style={{ background: "linear-gradient(135deg, #fff9f9, #f0f7f0)" }}
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-24 sm:w-32 h-24 sm:h-32 opacity-20 -translate-x-4 -translate-y-4 sm:-translate-x-6 sm:-translate-y-6">
          <div className="w-full h-full border-t-4 border-l-4 border-pink-300 rounded-tl-3xl animate-spin-slow"></div>
        </div>
        <div className="absolute bottom-0 right-0 w-24 sm:w-32 h-24 sm:h-32 opacity-20 translate-x-4 translate-y-4 sm:translate-x-6 sm:translate-y-6">
          <div className="w-full h-full border-b-4 border-r-4 border-pink-300 rounded-br-3xl animate-spin-slow"></div>
        </div>

        <div className="w-full py-20">
          <div className="flex flex-col items-center mb-8 sm:!mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 text-pink-500 font-serif animate-fade-in">
              Join Us
            </h2>
            <div className="flex items-center space-x-3">
              <span className="inline-block w-8 sm:w-10 h-0.5 bg-pink-300"></span>
              <FaHeart className="text-pink-300 animate-pulse-fast" />
              <span className="inline-block w-8 sm:w-10 h-0.5 bg-pink-300"></span>
            </div>
            <p className="mt-4 text-center max-w-xl text-gray-600 italic animate-slide-up px-4">
              We would be honored to have your presence as we celebrate our
              special day.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-stretch">
            {/* Map Section */}
            <div
              ref={mapRef}
              className="w-full md:w-3/5 rounded-2xl overflow-hidden shadow-2xl opacity-0 transition-all duration-1000 -translate-x-10 relative"
            >
              {/* Map Pin Animation */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 animate-bounce-slow">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <FaMapMarkerAlt className="text-white text-lg sm:text-2xl" />
                </div>
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-pink-500 opacity-30 rounded-full absolute -bottom-4 sm:-bottom-5 left-1/2 transform -translate-x-1/2 blur-sm"></div>
              </div>

              <iframe
                width="100%"
                height="350"
                className="sm:h-[400px] md:h-[450px] grayscale hover:grayscale-0 transition-all duration-500"
                frameBorder="0"
                style={{ border: 0 }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.639311704683!2d77.19903907519881!3d28.52049768916006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce1003f9081ff%3A0x5e30cef23171ead7!2sSaket%20metro%20gate%20no%202!5e0!3m2!1sen!2sin!4v1743445915874!5m2!1sen!2sin"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Wedding Venue Location"
              ></iframe>
            </div>

            {/* Address Details */}
            <div
              ref={detailsRef}
              className="w-full max-w-screen md:w-2/5 bg-white !p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl relative opacity-0 transition-all duration-1000 translate-x-10 overflow-hidden"
            >
              {/* Decorative Corner Embellishments */}
              <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 opacity-20">
                <div className="w-full h-full border-t-4 border-r-4 border-pink-300 rounded-tr-xl animate-rotate"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 opacity-20">
                <div className="w-full h-full border-b-4 border-l-4 border-pink-300 rounded-bl-xl animate-rotate"></div>
              </div>

              <div className="relative z-10 mb-8">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-semibold mb-3 text-gray-700 animate-fade-in">
                  {venueDetails.name}
                </h3>
                <div className="w-12 sm:w-16 h-1 bg-pink-300 !mb-6 animate-scale"></div>

                <div className="flex items-start !mb-2 group">
                  <div className="p-2 sm:p-3 bg-pink-100 rounded-full mr-3 sm:mr-4 group-hover:bg-pink-500 transition-colors duration-300 mt-1">
                    <FaMapMarkerAlt className="text-pink-500 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="animate-slide-up space-y-2">
                    <p className="font-medium text-gray-800 leading-relaxed">
                      {venueDetails.addressLine1}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      {venueDetails.addressLine2}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      {venueDetails.city}, {venueDetails.state}{" "}
                      {venueDetails.postalCode}
                    </p>
                  </div>
                </div>

                <div className="flex items-center !mb-2 group">
                  <div className="p-2 sm:p-3 bg-pink-100 rounded-full mr-3 sm:mr-4 group-hover:bg-pink-500 transition-colors duration-300">
                    <FaCalendarAlt className="text-pink-500 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <p className="text-gray-800 font-medium animate-slide-up leading-relaxed">
                    {venueDetails.date}
                  </p>
                </div>

                <div className="flex items-center !mb-8 group">
                  <div className="p-2 sm:p-3 bg-pink-100 rounded-full mr-3 sm:mr-4 group-hover:bg-pink-500 transition-colors duration-300">
                    <FaClock className="text-pink-500 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <p className="text-gray-800 font-medium animate-slide-up leading-relaxed">
                    {venueDetails.time}
                  </p>
                </div>
              </div>

              <button
                onClick={openDirections}
                className="group flex items-center justify-center w-full bg-pink-500 text-white py-3 sm:py-4 md:py-5 px-4 md:px-6 rounded-xl hover:bg-pink-600 transition-all duration-300 shadow-lg hover:shadow-2xl relative overflow-hidden animate-pulse !mt-4"
              >
                <span className="absolute inset-0 w-full h-full transition-all duration-300 scale-0 group-hover:scale-100 group-hover:bg-pink-400 rounded-xl transform origin-center"></span>
                <FaDirections className="mr-2 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                <span className="relative z-10 text-base md:text-lg font-medium">
                  Get Directions
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;
