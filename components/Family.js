"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";

const families = {
  groom: {
    name: "The Sharma Family",
    members: [
      "Mr. Rajesh Sharma (Father)",
      "Mrs. Sunita Sharma (Mother)",
      "Aman Sharma (Brother)",
      "Neha Sharma (Sister)"
    ],
    gradient: "from-blue-400 to-blue-600",
  },
  bride: {
    name: "The Verma Family",
    members: [
      "Mr. Rakesh Verma (Father)",
      "Mrs. Poonam Verma (Mother)",
      "Rohan Verma (Brother)",
      "Priya Verma (Sister)"
    ],
    gradient: "from-pink-400 to-pink-600",
  },
};

export default function FamilyDetailsList() {
  return (
    <div className="p-8 max-w-6xl !mx-auto !my-20">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Meet the Families
      </h2>
      <div className="flex flex-col gap-12 !mt-12">
        {Object.entries(families).map(([key, family]) => (
          <div
            key={key}
            className={`rounded-2xl p-6 bg-gradient-to-r ${family.gradient} text-white shadow-xl md:!px-8`}
          >
            <motion.h3
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-semibold text-center !my-4"
            >
              {family.name}
            </motion.h3>
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
            >
              {family.members.map((member, index) => (
                <motion.li
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                  className="flex items-center gap-2 !py-2 border-b border-white/30 last:border-b-0"
                >
                  <FaHeart className="text-red-300" />
                  <span className="text-lg">{member}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        ))}
      </div>
    </div>
  );
}